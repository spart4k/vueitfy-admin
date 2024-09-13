import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'appoint',
  name: 'Назначить',
  type: 'FormDefault',
  detail: true,
  alias: 'object',
  active: false,
  lists: [
    {
      alias: 'direction_id',
      filter: [],
    },
  ],
  fields: [
    selectField({
      label: 'Направление',
      name: 'direction_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'object_id',
          url: 'get/pagination_list/assign_objects',
        },
      ],
      validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      alias: 'assign_objects',
      subtype: 'multiple',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/assign_objects',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          required: true,
          field: 'direction_id',
          value: '',
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'account_id',
          url: 'get/pagination_list/assign_accounts',
        },
      ],
    }),
    autocompleteField({
      label: 'Сотрудник',
      name: 'account_id',
      alias: 'assign_accounts',
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
      url: 'get/pagination_list/assign_accounts',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'direction_id',
          value: '',
        },
        {
          field: 'object_id',
          value: '',
        },
      ],
      dependence: [
        {
          type: 'default',
          fillField: ['permission_id'],
        },
        {
          type: 'computed',
          funcComputed: (context) => {
            if (context.formData.permission_id !== 9) {
              context.formData.with_target = false
            }
          },
        },
      ],
    }),
    textBlock({
      label: 'Создал',
      name: 'permission_id',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    checkboxField({
      label: 'С назначением',
      name: 'with_target',
      value: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      isShow: {
        value: false,
        conditions: [{ field: 'permission_id', value: [9] }],
      },
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
      to: 'object',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/create',
      name: 'createForm',
      url: 'create/assign',
      action: 'createForm',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Объект успешно назначен',
          color: 'success',
        },
        2: {
          text: 'Ошибка сервера',
          color: 'error',
        },
        3: {
          text: 'Объект уже назначен',
          color: 'error',
        },
      },
    }),
  ],
}
