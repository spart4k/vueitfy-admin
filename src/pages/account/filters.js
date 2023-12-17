import { dateField, selectField, autocompleteField } from '@/utils/fields.js'

export default {
  id: 0,
  name: 'Основные',
  type: 'FormDefault',
  detail: false,
  isFilter: true,
  lists: [
    { alias: 'vid_vedomost_id', filter: [] },
    { alias: 'status_id', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'doljnost_id', filter: [] },
    { alias: 'st_rashod_id', filter: [] },
    { alias: 'account_id', filter: [] },
  ],
  alias: 'payment',
  active: false,
  fields: [
    dateField({
      label: 'Дата начисления:',
      name: 'date_add',
      subtype: 'range',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.date_add',
    }),
    dateField({
      label: 'Дата обновления статуса:',
      name: 'date_status',
      subtype: 'range',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.date_status',
    }),
    dateField({
      label: 'Дата назначения:',
      name: 'date_target',
      subtype: 'range',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.date_target',
    }),
    selectField({
      label: 'Статус',
      name: 'status_id',
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
      alias: 'p.status_id',
    }),
    selectField({
      label: 'Вид ведомости:',
      name: 'vid_vedomost_id',
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
      alias: 'p.vid_vedomost_id',
    }),
    selectField({
      label: 'Статья расхода:',
      name: 'st_rashod_id',
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
      alias: 'p.st_rashod_id',
    }),
    selectField({
      label: 'Вид оплаты',
      name: 'bank_id',
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
      alias: 'p.bank_id',
    }),
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
        sm: 12,
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
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.direction_id',
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/object',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      alias: 'p.object_id',
    }),
    selectField({
      label: 'Должность:',
      name: 'doljnost_id',
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
      alias: 'p.doljnost_id',
    }),
    //selectField({
    //  id: 0,
    //  name: 'object_name',
    //  value: '',
    //  type: 'select',
    //  subtype: 'multiple',
    //  items: [],
    //  url: 'get/pagination_list/object',
    //  bind: '',
    //  label: 'name',
    //  alias: 'p.object_id',
    //  page: 1,
    //}),
    ////{
    ////  id: 2,
    ////  name: 'device',
    ////  value: '',
    ////  type: 'select',
    ////  endpoint: '',
    ////  bind: '',
    ////  label: '',
    ////},
    ////{
    ////  id: 3,
    ////  name: 'checkbox',
    ////  value: '',
    ////  type: 'checkbox',
    ////  endpoint: '',
    ////  bind: '',
    ////  label: 'Имеет бригадира',
    ////},
    //{
    //  id: 4,
    //  name: 'Date_range',
    //  value: '',
    //  type: 'date',
    //  subtype: 'range',
    //  endpoint: '',
    //  bind: '',
    //  label: 'Range',
    //  menu: false,
    //  alias: 'p.date_target',
    //},
    //{
    //  id: 5,
    //  name: 'date_target',
    //  value: '',
    //  type: 'date',
    //  subsubtype: 'single',
    //  endpoint: '',
    //  bind: '',
    //  label: 'Одиночная дата',
    //  menu: false,
    //  alias: 'p.date_target',
    //},
    //{
    //  id: 5,
    //  name: 'date_target',
    //  value: '',
    //  type: 'date',
    //  subtype: 'period',
    //  endpoint: '',
    //  bind: '',
    //  label: 'Одиночная дата',
    //  menu: false,
    //  alias: 'p.date_target',
    //},
    ////{
    ////  id: 6,
    ////  name: 'Period',
    ////  value: '',
    ////  type: 'Date',
    ////  subtype: 'period',
    ////  period: 'month',
    ////  endpoint: '',
    ////  bind: '',
    ////  label: 'Период ( Месяц )',
    ////  menu: false,
    ////},
  ],
}
