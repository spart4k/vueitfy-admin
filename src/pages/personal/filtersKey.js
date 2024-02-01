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
      name: 'p.personal_accounts',
      alias: 'personal_accounts',
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
      bootstrapClass: [''],
      aliasFilter: 'p.account_id',
    }),
    selectField({
      label: 'Линейщик',
      name: 'direction_id',
      alias: 'direction_id',
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
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'object_id',
          url: 'get/pagination_list/object',
        },
      ],
      aliasFilter: 'p.direction_json',
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      alias: 'p.object_id',
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
          field: 'direction_id',
          value: '',
        },
      ],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.object_id',
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
