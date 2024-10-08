import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import {
  required,
  hasDate,
  hasTime,
  numeric,
  length,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Добавить карту',
  type: 'FormDefault',
  path: 'add',
  alias: 'corp_bank',
  active: false,
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'corp_card',
    url: '/get/form/',
    bootstrapClass: [''],
  },
  lists: [
    {
      alias: 'bank_id_without_nal',
      filter: [],
    },
    {
      alias: 'status_corp_card',
      filter: [],
    },
  ],
  fields: [
    selectField({
      label: 'Статус',
      name: 'status_id',
      alias: 'status_corp_card',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      hideOption: [
        {
          func: (context) => {
            return context.store.state.user.permission_id !== 4
          },
          value: [2],
          type: true,
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Наименование',
      name: 'org',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Кому выдана',
      name: 'account_id',
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
      url: 'get/pagination_list/account_bank_list',
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) => context.environment.mode !== 'edit',
            type: false,
          },
          {
            permissions: [12, 22],
            type: true,
          },
        ],
      },
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Банк',
      name: 'bank_id',
      alias: 'bank_id_without_nal',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'БИК',
      name: 'bik',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      mask: '#########',
      validations: { required, length: length(9), numeric },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'ФИО владельца счета',
      name: 'fio',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Номер карты',
      name: 'num',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      mask: '################',
      validations: { required, length: length(16), numeric },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'CSV',
      name: 'csv',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      mask: '###',
      validations: { required, length: length(3), numeric },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Valid',
      name: 'date_valid',
      placeholder: '',
      value: '',
      class: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      mask: '##/##',
      validations: { required, length: length(5) },
      bootstrapClass: [''],
    }),
    // stringField({
    //   label: 'PIN',
    //   name: 'pin',
    //   placeholder: '',
    //   value: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 2,
    //   },
    //   validations: { required, length: length(4), numeric },
    //   bootstrapClass: [''],
    // }),
    textareaField({
      label: 'Примечание',
      name: 'note',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      color: 'primary',
      module: 'form/create',
      url: 'create/corp_card',
      name: 'createForm',
      action: 'createForm',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            field: 'mode',
            target: 'environment',
            value: ['edit'],
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      url: 'update/corp_card',
      name: 'saveFormId',
      action: 'saveFormId',
      color: 'primary',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            field: 'mode',
            target: 'environment',
            value: ['add'],
            type: true,
          },
        ],
      },
    }),
  ],
}
