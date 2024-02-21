import {
  dateField,
  selectField,
  autocompleteField,
  dateRangeField,
  checkboxField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions.js'
import { required } from '@/utils/validation.js'

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
    { alias: 'st_rashod_id', filter: [] },
    { alias: 'managers', filter: [] },
    { alias: 'bank_id', filter: [] },
    { alias: 'bank_id', filter: [] },
    { alias: 'doljnost_id', filter: [] },
  ],
  actions: [
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      action: 'saveFilter',
      name: 'saveFilter',
      // nextForm: true,
    }),
  ],
  alias: 'payment',
  active: false,
  fields: [
    dateRangeField({
      label: 'Дата начисления:',
      name: 'date_add',
      subtype: 'range',
      typeFilter: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.date_add',
      validations: { required },
    }),
    // dateRangeField({
    //   label: 'Дата обновления статуса:',
    //   name: 'date_status',
    //   subtype: 'range',
    //   placeholder: '',
    //   classes: [''],
    //   position: {
    //     cols: 12,
    //     sm: 12,
    //   },
    //   bootstrapClass: [''],
    //   aliasFilter: 'p.date_status',
    // }),
    dateRangeField({
      label: 'Дата назначения:',
      name: 'date_target',
      subtype: 'range',
      typeFilter: 'date',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.date_target',
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
      aliasFilter: 'p.status_id',
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
      aliasFilter: 'p.vid_vedomost_id',
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
      aliasFilter: 'p.bank_id',
    }),
    selectField({
      label: 'Менеджеры',
      name: 'account_id',
      alias: 'managers',
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
      aliasFilter: 'p.account_id',
      // dependence: [
      //   // {
      //   //   type: 'api',
      //   //   module: 'selects/getListUpdate',
      //   //   field: 'object_id',
      //   //   url: 'get/pagination_list/object',
      //   // },
      //   // {
      //   //   type: 'api',
      //   //   module: 'selects/getListUpdate',
      //   //   field: 'object_id',
      //   //   //filter: [
      //   //   //  {
      //   //   //    field: 'direction_id',
      //   //   //    value: '',
      //   //   //  },
      //   //   //],
      //   //   condition: [
      //   //     {
      //   //       field: 'direction_id',
      //   //       value: [1],
      //   //     },
      //   //   ],
      //   //   url: 'get/pagination_list/object',
      //   // },
      // ],
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
      aliasFilter: 'p.direction_id',
      // dependence: [
      //   {
      //     type: 'api',
      //     module: 'selects/getListUpdate',
      //     field: 'object_id',
      //     filter: [
      //       {
      //         field: 'direction_id',
      //         value: '',
      //       },
      //       {
      //         field: 'account_id',
      //         value: '',
      //       },
      //     ],
      //     url: 'get/pagination_list/object',
      //   },
      // ],
    }),
    autocompleteField({
      label: 'Объект',
      name: 'object_id',
      typeFilter: 'select',
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
      aliasFilter: 'p.object_id',
      // filter: [
      //   {
      //     field: 'account_id',
      //     // source: 'formData',
      //     type: 'array',
      //     value: '',
      //   },
      //   {
      //     field: 'direction_id',
      //     // source: 'formData',
      //     type: 'array',
      //     value: '',
      //   },
      // ],
      // dependence: [
      //   {
      //     type: 'api',
      //     module: 'selects/getListUpdate',
      //     field: 'personal_id',
      //     filter: [
      //       {
      //         field: 'direction_id',
      //         value: '',
      //       },
      //       {
      //         field: 'account_id',
      //         value: '',
      //       },
      //       {
      //         field: 'object_id',
      //         value: '',
      //       },
      //     ],
      //     url: 'get/pagination_list/payment_personal_id',
      //   },
      //   // {
      //   //   type: 'api',
      //   //   module: 'selects/getListUpdate',
      //   //   field: 'object_id',
      //   //   //filter: [
      //   //   //  {
      //   //   //    field: 'direction_id',
      //   //   //    value: '',
      //   //   //  },
      //   //   //],
      //   //   condition: [
      //   //     {
      //   //       field: 'direction_id',
      //   //       value: [1],
      //   //     },
      //   //   ],
      //   //   url: 'get/pagination_list/object',
      //   // },
      // ],
    }),
    autocompleteField({
      label: 'Персонал',
      name: 'personal_id',
      typeFilter: 'select',
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
      // filter: [
      //   {
      //     field: 'account_id',
      //     // source: 'formData',
      //     type: 'array',
      //     value: '',
      //   },
      //   {
      //     field: 'direction_id',
      //     // source: 'formData',
      //     type: 'array',
      //     value: '',
      //   },
      //   {
      //     field: 'object_id',
      //     // source: 'formData',
      //     type: 'array',
      //     value: '',
      //   },
      // ],
      url: 'get/pagination_list/personals',
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      aliasFilter: 'p.personal_id',
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
      aliasFilter: 'p.doljnost_id',
    }),
    checkboxField({
      label: 'Группировка по ФИО',
      name: 'is_group_personal',
      placeholder: '',
      subtype: 'single',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      aliasFilter: 'is_group_personal',
      //validations: { required },
      //isShow: false,
    }),
    checkboxField({
      label: 'Группировка по счету',
      name: 'is_group_rek',
      placeholder: '',
      subtype: 'single',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      bootstrapClass: [''],
      aliasFilter: 'is_group_rek',
      //validations: { required },
      //isShow: false,
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
