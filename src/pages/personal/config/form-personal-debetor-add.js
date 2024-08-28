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
  path: 'debt-add',
  name: 'Основные',
  type: 'FormDefault',
  detail: true,
  lists: [
    {
      alias: 'rashod_vid',
      filter: [
        {
          field: 'rashod_category_id',
          value: 4,
          type: 'num',
        },
      ],
    },
  ],
  // alias: 'personal',
  active: false,
  fields: [
    autocompleteField({
      label: 'Объект',
      name: 'job_object_personal',
      alias: '',
      //subtype: 'single',
      requestKey: 'object_id',
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
      url: 'get/pagination_list/job_object_personal',
      // object
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      // updateList: [
      //   {
      //     alias: 'bind_accounts',
      //     filter: [
      //       {
      //         field: 'personal_id',
      //         value: 'routeKey',
      //         // source: '+route.params.id',
      //         routeKey: 'id',
      //         type: 'num',
      //       },
      //     ],
      //   },
      // ],
      filter: [
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
      label: 'Наименование',
      name: 'rashod_vid',
      requestKey: 'rashod_vid_id',
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
      label: 'Сумма',
      name: 'sum',
      placeholder: '',
      class: [''],
      requestType: 'number',
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Сумма',
      name: 'direction_id',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
      value: 2,
      isShow: {
        value: true,
      },
    }),
    stringField({
      label: 'Сумма',
      name: 'direction_id',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      // validations: { required },
      bootstrapClass: [''],
      value: 2,
      isShow: {
        value: true,
      },
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
      module: 'form/create',
      name: 'createForm',
      url: 'create/debit',
      action: 'createForm',
      color: 'primary',
      useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
      handlingResponse: {
        1: {
          text: 'Успешно',
          color: 'success',
        },
        2: {
          text: 'Ошибка сервера',
          color: 'error',
        },
      },
    }),
  ],
}
