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
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'bind',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [
    {
      alias: 'bind_directions',
      filter: [
        {
          field: 'bind_objects',
          alias: 'object_id',
          value: '',
          source: 'formData',
          type: 'array',
        },
      ],
    },
  ],
  // alias: 'personal',
  active: false,
  notReadonly: true,
  fields: [
    stringField({
      label: 'rek1',
      name: 'personal_id',
      placeholder: '',
      class: [''],
      disabled: true,
      isShow: {
        value: true,
      },
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      //subtype: 'multiple',
      name: 'bind_objects',
      requestKey: 'object_id',
      //subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      //readonly: true,
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/bind_objects',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'personal_id',
          value: '',
          // source: '+route.params.id',
          routeKey: 'id',
          type: 'num',
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'bind_directions',
          url: 'get/pagination_list/bind_directions',
          filter: [
            {
              field: 'bind_objects',
              alias: 'object_id',
              value: '',
              type: 'num',
            },
            {
              field: 'personal_id',
              value: '',
              // source: '+route.params.id',
              routeKey: 'id',
              type: 'num',
            },
          ],
        },
      ],
      //isShow: {
      //  value: false,
      //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
      //},
    }),
    autocompleteField({
      label: 'Направления',
      subtype: 'multiple',
      name: 'bind_directions',
      alias: '',
      notSend: true,
      //subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      //readonly: true,
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/bind_directions',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'bind_accounts',
          filter: [
            {
              field: 'bind_objects',
              alias: 'object_id',
              source: 'formData',
              value: '',
              type: 'num',
            },
            {
              field: 'bind_directions',
              alias: 'direction_json',
              source: 'formData',
              value: '',
              type: 'array',
            },
            {
              field: 'personal_id',
              value: 'routeKey',
              // source: '+route.params.id',
              routeKey: 'id',
              type: 'num',
            },
          ],
        },
      ],
      filter: [
        {
          field: 'bind_objects',
          alias: 'object_id',
          value: '',
          type: 'num',
        },
        {
          field: 'bind_directions',
          alias: 'direction_json',
          value: '',
          type: 'array',
        },
        {
          field: 'personal_id',
          value: '',
          // source: '+route.params.id',
          routeKey: 'id',
          type: 'num',
        },
      ],
      //isShow: {
      //  value: false,
      //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
      //},
    }),
    selectField({
      label: 'Сотрудники',
      name: 'account_json',
      alias: 'bind_accounts',
      subtype: 'multiple',
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
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveForm',
      url: 'update/personal/object',
      action: 'saveForm',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Объект привязан',
          color: 'success',
        },
        2: {
          text: 'Сотрудник удален',
          color: 'error',
        },
        3: {
          text: '',
        },
      },
    }),
  ],
}
