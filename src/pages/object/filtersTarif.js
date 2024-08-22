import {
  selectField,
  dateField,
  autocompleteField,
  checkboxField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

export default {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    {
      alias: 'object_type',
      filter: [
        {
          alias: 'direction_json',
          sendEmpty: true,
          value: [2],
          type: 'array',
        },
      ],
    },
    {
      alias: 'object_subtype',
      filter: [],
    },
    {
      alias: 'category_change_rate',
      filter: [],
    },
  ],
  alias: 'tarif',
  active: false,
  fields: [
    autocompleteField({
      label: 'Объект',
      name: 'doljnost',
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
      url: 'get/pagination_list/object_retail',
      position: {
        cols: 12,
        sm: 12,
      },
      aliasFilter: 'op.object_id',
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Тип объекта',
      name: 'object_type',
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
      updateList: [
        {
          alias: 'object_subtype',
          filter: [
            {
              field: 'object_type',
              alias: 'type',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
        {
          alias: 'category_change_rate',
          filter: [
            {
              field: 'object_type',
              alias: 'type',
              value: '',
              source: 'formData',
              type: 'array',
            },
          ],
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'doljnost',
          url: 'get/pagination_list/object_change_rate_position',
        },
      ],
      bootstrapClass: [''],
      aliasFilter: 'o.type',
    }),
    selectField({
      label: 'Подтип объекта',
      name: 'object_subtype',
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
      bootstrapClass: [''],
      aliasFilter: 'o.subtype',
    }),
    autocompleteField({
      label: 'Должности',
      name: 'doljnost',
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
      url: 'get/pagination_list/object_change_rate_position',
      position: {
        cols: 12,
        sm: 12,
      },
      filter: [
        {
          field: 'object_type',
          alias: 'type',
          value: '',
        },
      ],
      aliasFilter: 'op.doljnost_id',
      bootstrapClass: [''],
    }),
    selectField({
      label: 'Категории',
      name: 'category_change_rate',
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
      aliasFilter: 'op.category',
      bootstrapClass: [''],
    }),
    checkboxField({
      label: 'Активный',
      name: 'vds',
      value: false,
      subtype: 'single',
      placeholder: '',
      class: [''],
      notSend: true,
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'is_active',
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
