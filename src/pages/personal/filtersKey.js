import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filtersKey = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    // {
    //   alias: 'direction_id',
    //   filter: [],
    // },
    {
      alias: 'personal_accounts',
      filter: [
        {
          field: 'custom_key',
          sendEmpty: true,
          value: false,
          type: 'num',
        },
      ],
    },
  ],
  alias: 'payment',
  active: false,
  fields: [
    selectField({
      label: 'Аккаунты',
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
      label: 'Линейщик',
      name: 'personal_id',
      alias: 'uk.personal_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      typeFilter: 'select',
      page: 1,
      search: '',
      url: 'get/pagination_list/personals',
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
      dependence: [],
      aliasFilter: 'uk.personal_id',
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      alias: 'uk.object_id',
      subtype: 'single',
      placeholder: '',
      typeFilter: 'select',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/object',
      filter: [
        {
          field: 'personal_accounts',
          value: '',
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'uk.object_id',
    }),
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
}

export default filtersKey
