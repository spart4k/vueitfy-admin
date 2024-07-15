import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  textBlock,
  colorPicker,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import {
  required,
  hasDate,
  hasTime,
  nameLength,
  minLength,
  numeric,
  number,
  maxLength,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [
    { alias: 'permissions_account', filter: [] },
    { alias: 'chief_id', filter: [] },
    { alias: 'direction_json', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'grajdanstvo_id', filter: [] },
    {
      alias: 'object_type',
      filter: [
        {
          field: 'direction_json',
          value: '',
          source: 'formData',
          type: 'array',
        },
      ],
    },
    {
      alias: 'account_objects',
      filter: [{ source: 'formData', type: 'num', value: 'id', field: 'id' }],
    },
  ],
  alias: 'account',
  active: false,
  fields: [
    textBlock({
      label: 'Создал',
      name: 'id',
      placeholder: '',
      notSend: true,
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ФИО',
      name: 'fio',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Краткое имя',
      name: 'name',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Телефон',
      name: 'telefon',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Email',
      name: 'email',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Стац',
      name: 'landline_phone',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      validations: { number, maxLength: maxLength(4), required },
    }),
    stringField({
      label: 'Логин',
      name: 'username',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Пароль',
      name: 'password',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
    }),
    dateField({
      label: 'Дата рождения',
      name: 'birthday',
      subtype: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      alias: 'p.date_status',
    }),
    selectField({
      label: 'Направления',
      name: 'direction_json',
      subtype: 'multiple',
      // requestKey: 'direction_json',
      stringify: true,
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'object_type',
          filter: [
            {
              field: 'direction_json',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'chief_id',
          url: 'get/pagination_list/chief_id',
          filter: [
            {
              field: 'permission_id',
              type: 'num',
              value: '',
            },
            {
              field: 'direction_json',
              type: 'array',
              value: '',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Тип',
      name: 'object_type',
      subtype: 'multiple',
      stringify: true,
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      requiredFields: ['direction_json'],
    }),
    selectField({
      label: 'Роль',
      name: 'permission_id',
      alias: 'permissions_account',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'chief_id',
          url: 'get/pagination_list/chief_id',
          filter: [
            {
              field: 'permission_id',
              type: 'num',
              value: '',
            },
            {
              field: 'direction_json',
              type: 'array',
              value: '',
            },
          ],
        },
      ],
    }),
    autocompleteField({
      label: 'Руководитель',
      name: 'chief_id',
      alias: 'permission_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/chief_id',
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'permission_id',
          type: 'num',
          source: 'formData',
          value: '',
        },
        {
          field: 'direction_json',
          type: 'array',
          source: 'formData',
          value: '',
        },
      ],
      requiredFields: ['direction_json', 'permission_id'],
    }),
    colorPicker({
      label: 'Цвет',
      name: 'color',
      //value: '#ffffff',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'Руководитель',
      name: 'is_chief',
      placeholder: '',
      // readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    selectField({
      label: 'Объекты',
      name: 'object_json',
      alias: 'account_objects',
      subtype: 'multiple',
      readonly: true,
      // requestKey: 'direction_json',
      stringify: true,
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: {},
      bootstrapClass: [''],
      // updateList: [
      //   {
      //     alias: 'account_id',
      //     filter: [
      //       {
      //         field: 'direction_json',
      //         value: '',
      //         source: 'formData',
      //         type: 'num',
      //       },
      //     ],
      //   },
      // ],
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      to: 'account',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'set/account',
      action: 'saveFormId',
      color: 'primary',
    }),
  ],
}
