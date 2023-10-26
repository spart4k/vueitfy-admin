import { dateField, selectField, autocompleteField } from '@/utils/fields.js'

const filters = {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  active: false,
  fields: [
    selectField({
      label: 'Менеджеры',
      name: 'account_id',
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
        sm: 6,
      },
      bootstrapClass: [''],
      alias: 'p.account_id',
    }),
    selectField({
      label: 'Направления',
      name: 'direction_id',
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
        sm: 6,
      },
      bootstrapClass: [''],
      alias: 'p.direction_id',
    }),
  ],
}

export default filters
