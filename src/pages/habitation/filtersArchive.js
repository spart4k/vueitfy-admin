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
    selectField({
      label: 'Тариф',
      name: 'h.is_archive',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      value: 1,
      position: {
        cols: 12,
        sm: 12,
      },
      isShow: {
        value: true,
      },
      bootstrapClass: [''],
      aliasFilter: 'h.is_archive',
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
