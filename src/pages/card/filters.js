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
    { alias: 'status_cc', filter: [] },
    { alias: 'bank_id_without_nal', filter: [] },
  ],
  alias: 'corp_card',
  active: false,
  fields: [
    autocompleteField({
      label: 'Аккаунт',
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
      url: 'get/pagination_list/corp_card_accounts',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'cc.account_id',
    }),
    selectField({
      label: 'Статус',
      name: 'status_cc',
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
      aliasFilter: 'cc.status_id',
    }),
    selectField({
      label: 'Банк',
      name: 'bank_id_without_nal',
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
      aliasFilter: 'cc.bank_id',
    }),
    checkboxField({
      label: 'Выдано',
      name: 'is_issued',
      placeholder: '',
      subtype: 'single',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      aliasFilter: 'is_issued',
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
