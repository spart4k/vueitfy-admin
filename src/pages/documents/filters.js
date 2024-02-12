import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    { alias: 'personal_status_id', filter: [] },
    { alias: 'critical_document', filter: [] },
    { alias: 'grajdanstvo_id', filter: [] },
    {
      alias: 'personal_accounts',
      filter: [
        {
          field: 'custom_key',
          sendEmpty: true,
          value: true,
          type: 'num',
        },
      ],
    },
  ],
  actions: [
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      action: 'saveFilter',
      name: 'saveFilter',
      nextForm: true,
    }),
  ],
  alias: 'documents',
  active: true,
  fields: [
    selectField({
      label: 'Аккаунт',
      name: 'personal_accounts',
      alias: 'p.account_json',
      subtype: 'array',
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
      bootstrapClass: [''],
      aliasFilter: 'p.account_json',
    }),
    autocompleteField({
      label: 'ФИО:',
      name: 'personal_logistic_document',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/personal_logistic_document',
      typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      page: 1,
      bootstrapClass: [''],
      aliasFilter: 'p.personal_logistic_document',
    }),
    autocompleteField({
      label: 'Регион',
      name: 'regions_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      url: 'get/pagination_list/regions_id',
      aliasFilter: 'ob.regions_id',
      typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_logistic',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/object_logistic',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'ob.id',
      typeFilter: 'select',
    }),
    selectField({
      label: 'Статус',
      name: 'personal_status_id',
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
      aliasFilter: 'p.status',
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Гражданство',
      name: 'grajdanstvo_id',
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
      aliasFilter: 'p.grajdanstvo_id',
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Критичность',
      name: 'critical_document',
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
      aliasFilter: 'need_document',
      bootstrapClass: [''],
    }),
  ],
}

export default filters
