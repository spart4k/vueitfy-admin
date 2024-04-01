import {
  dateField,
  selectField,
  autocompleteField,
  dateRangeField,
  checkboxField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [{ alias: 'status_x5', filter: [] }],
  alias: 'pivotx5',
  active: false,
  fields: [
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
      aliasFilter: 'o.manager_directions',
    }),
    selectField({
      label: 'Статус',
      name: 'status_x5',
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
      aliasFilter: 's.id',
    }),
    checkboxField({
      label: 'Удалённые',
      name: 'phx.is_del',
      placeholder: '',
      subtype: 'single',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      aliasFilter: 'phx.is_del',
      //validations: { required },
      //isShow: false,
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
