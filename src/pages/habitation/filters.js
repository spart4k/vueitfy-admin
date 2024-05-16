import {
  dateField,
  selectField,
  autocompleteField,
  dateRangeField,
  checkboxField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'
import { required } from '@/utils/validation.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    {
      alias: 'habitation_type',
      filter: [],
    },
    { alias: 'managers', filter: [] },
    {
      alias: 'object_habitation',
      filter: [],
    },
  ],
  alias: 'habitation',
  active: false,
  fields: [
    selectField({
      label: 'Тип проживания',
      name: 'h.habitation_type_id',
      alias: 'habitation_type',
      aliasFilter: 'h.habitation_type_id',
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
      // validations: { required },
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Регионы',
      name: 'regions_id',
      subtype: 'single',
      typeFilter: 'select',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/regions_id',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'h.region_id',
      updateList: [
        {
          alias: 'city_id',
          filter: [
            {
              field: 'regions_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
    }),
    selectField({
      label: 'Город',
      name: 'city_id',
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
      filter: [
        {
          field: 'regions_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
      aliasFilter: 'h.city_id',
    }),
    selectField({
      label: 'Аккаунт',
      name: 'account_json',
      alias: 'managers',
      subtype: 'num',
      placeholder: '',
      class: [''],
      // updateList: [
      //   {
      //     alias: 'object_habitation',
      //     filter: [
      //       {
      //         field: 'account_json',
      //         value: [],
      //         type: 'num',
      //         source: 'formData',
      //       },
      //     ],
      //   },
      // ],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 12,
      },
      validations: {},
      bootstrapClass: [''],
      aliasFilter: 'h.account_json',
      typeFilter: 'array',
    }),
    selectField({
      label: 'Объект',
      name: 'object_json',
      alias: 'object_habitation',
      subtype: 'num',
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
      validations: {},
      bootstrapClass: [''],
      aliasFilter: 'h.object_json',
      typeFilter: 'array',
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
