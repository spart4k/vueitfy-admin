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
    { alias: 'object_subtype', filter: [] },
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
  alias: 'slata',
  active: true,
  fields: [
    dateField({
      label: 'Дата назначения:',
      name: '',
      subtype: 'range',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      //   url: 'get/pagination_list/personal_logistic_document',
      aliasFilter: 'p.id',
      typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      filterAlias: 'p.personal_logistic_document',
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_slata',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/object_slata',
      aliasFilter: 'o.id',
      typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      filterAlias: 'p.personal_logistic_document',
    }),

    autocompleteField({
      label: 'Услуги',
      name: 'doljnost',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/doljnost',
      //   filterAlias: 'ob.regions_id',
      //   typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      filters: [
        {
          field: 'type_json',
          type: 'array',
          source: undefined,
          value: 3,
        },
      ],
      bootstrapClass: [''],
    }),
    autocompleteField({
      label: 'Подтип',
      name: 'object_subtype',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      url: 'get/pagination_list/object_subtype',
      //   aliasFilter: 'o.subtype',
      //   typeFilter: 'select',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      filterAlias: 'o.subtype',
    }),
    selectField({
      label: 'Менеджер',
      name: 'manager_slata',
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
      filterAlias: 'p.status',
      bootstrapClass: [''],
    }),
  ],
}

export default filters