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
  lists: [{ alias: 'taxi_tarif', filter: [] }],
  alias: 'pivotx5',
  active: false,
  fields: [
    dateRangeField({
      label: 'Период',
      name: 'date',
      subtype: 'range',
      typeFilter: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 't.date',
      validations: { required },
    }),
    autocompleteField({
      label: 'Менеджер',
      name: 'account_id',
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
      url: 'get/pagination_list/managers_default',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 't.account_id',
    }),
    selectField({
      label: 'Тариф',
      name: 'taxi_tarif',
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
      aliasFilter: 'tt.id',
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
