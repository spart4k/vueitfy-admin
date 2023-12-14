import { dateField, selectField, autocompleteField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    {
      alias: 'direction_id',
      filter: [],
    },
  ],
  alias: 'payment',
  active: false,
  fields: [
    selectField({
      label: 'Направления',
      name: 'direction_id',
      alias: 'direction_id',
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
      //update: {
      //  module: 'selects/getList',
      //  fields: ['object_id'],
      //},
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'object_id',
          url: 'get/pagination_list/object',
        },
      ],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
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
      url: 'get/pagination_list/object',
      filters: [
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
      alias: 'p.object_id',
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

export default filters
