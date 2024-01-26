import {
  dateField,
  selectField,
  autocompleteField,
  dateRangeField,
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
    { alias: 'status_zr', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'category_zr', filter: [] },
    { alias: 'type_pay', filter: [] },
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
  alias: 'zayavka',
  active: false,
  fields: [
    selectField({
      label: 'Статус',
      name: 'z.status',
      alias: 'status_zr',
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
      aliasFilter: 'z.status',
    }),
    selectField({
      label: 'Направление',
      name: 'z.direction_id',
      alias: 'direction_id',
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
      aliasFilter: 'z.direction_id',
    }),
    autocompleteField({
      label: 'Создал',
      name: 'z.from_account_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      search: '',
      url: 'get/pagination_list/from_account_id',
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
      aliasFilter: 'z.from_account_id',
    }),
    autocompleteField({
      label: 'Линейщик',
      name: 'z.personal_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_zayavka_personal',
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
      aliasFilter: 'z.personal_id',
    }),
    autocompleteField({
      label: 'Объект',
      name: 'z.object_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_zayavka_object',
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
      aliasFilter: 'z.object_id',
    }),
    autocompleteField({
      label: 'Аккаунт',
      name: 'z.account_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      page: 1,
      search: '',
      url: 'get/pagination_list/filter_zayavka_account',
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
      aliasFilter: 'z.account_id',
    }),
    selectField({
      label: 'Категория',
      name: 'z.rashod_category_id',
      alias: 'category_zr',
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
      aliasFilter: 'z.rashod_category_id',
    }),
    selectField({
      label: 'Тип оплаты',
      name: 'z.payment_type',
      alias: 'type_pay',
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
      aliasFilter: 'z.payment_type',
    }),
    checkboxField({
      label: 'ВДС',
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
      aliasFilter: 'vds',
    }),
    checkboxField({
      label: 'Сгруппировать',
      name: 'is_group',
      subtype: 'single',
      value: false,
      placeholder: '',
      class: [''],
      notSend: true,
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'is_group',
    }),
  ],
}
