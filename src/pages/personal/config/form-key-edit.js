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
  path: 'edit',
  id: uuidv4(),
  name: 'Добавить ключ',
  type: 'FormDefault',
  alias: 'user_keys',
  detail: true,
  lists: [
    {
      alias: 'objects_personal',
      filter: [
        {
          field: 'personal_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
  ],
  fields: [
    stringField({
      label: 'Ключ',
      name: 'user_key',
      // alias: 'personal_logistic_x5',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      selectOptionName: '',
      items: [],
      page: 1,
      search: '',
      // TODO: Поменять на другое
      // url: 'get/pagination_list/personal_logistic_x5',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      // dependence: [
      //   {
      //     //fields: ['statement_card', 'cardowner'],
      //     type: 'api',
      //     module: 'personal/getObject',
      //     //url: 'object_id/avatar_with_user_key_id',
      //     field: 'object_id',
      //     url: [
      //       {
      //         source: 'formData',
      //         field: 'this',
      //       },
      //     ],
      //   },
      // ],
    }),
    stringField({
      label: 'ФИО',
      name: 'fio',
      // alias: 'personal_logistic_x5',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      selectOptionName: '',
      items: [],
      page: 1,
      search: '',
      // TODO: Поменять на другое
      // url: 'get/pagination_list/personal_logistic_x5',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      // dependence: [
      //   {
      //     //fields: ['statement_card', 'cardowner'],
      //     type: 'api',
      //     module: 'personal/getObject',
      //     //url: 'object_id/avatar_with_user_key_id',
      //     field: 'object_id',
      //     url: [
      //       {
      //         source: 'formData',
      //         field: 'this',
      //       },
      //     ],
      //   },
      // ],
    }),
    autocompleteField({
      label: 'Сотрудник',
      name: 'personal_id',
      alias: 'personal_logistic_x5',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      selectOptionName: '',
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/personal_logistic_x5',
      position: {
        cols: 12,
        sm: 12,
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'objects_personal',
          filter: [
            {
              field: 'personal_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Объекты',
      name: 'object_id',
      alias: 'objects_personal',
      //subtype: 'multiple',
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
      //readonly: true,
    }),
    checkboxField({
      label: 'Стажерская',
      name: `is_stager`,
      subtype: 'single',
      toNumber: true,
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: '',
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
      module: 'form/update',
      name: 'saveForm',
      url: 'set/data/user_keys',
      action: 'saveForm',
      color: 'primary',
    }),
  ],
}
