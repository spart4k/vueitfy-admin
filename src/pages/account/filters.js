import { selectField, checkboxField } from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    {
      alias: 'directions',
      filter: [],
    },
    {
      alias: 'permission_name',
      filter: [],
    },
  ],
  alias: 'payment',
  active: false,
  fields: [
    selectField({
      label: 'Направление',
      name: 'direction_id',
      alias: 'directions',
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
      aliasFilter: 'sa.direction_json',
    }),
    selectField({
      label: 'Роль',
      name: 'permission_name',
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
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'object_id',
          url: 'get/pagination_list/object',
        },
      ],
      aliasFilter: 'sp.id',
    }),
    checkboxField({
      label: 'Приоритет',
      name: `is_chief`,
      value: false,
      subtype: 'single',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'sa.is_chief',
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
