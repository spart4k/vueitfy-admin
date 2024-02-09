import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    { alias: 'accounts', filter: [] },
    { alias: 'personal_status_id', filter: [] },
    { alias: 'critical_document', filter: [] },
    { alias: 'grajdanstvo_id', filter: [] },
    {
      alias: 'personal_accounts',
      filter: [
        {
          field: 'custom_key',
          sendEmpty: true,
          value: false,
          type: '',
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
      label: 'Менеджеры',
      name: 'account_id',
      alias: 'accounts',
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
      label: 'Объект',
      name: 'object',
      // subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/object_document',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.object_id',
      typeFilter: 'select',
      subtype: 'array',
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
      label: 'Линейщик',
      name: 'personal_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/personals',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.id',
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
      // subtype: null,
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
      aliasFilter: 'critical_document',
      bootstrapClass: [''],
    }),
  ],
}

export default filters
