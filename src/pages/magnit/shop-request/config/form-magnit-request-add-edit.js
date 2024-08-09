import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  checkboxField,
  dropZoneField,
  carouselField,
  docListField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'
import formAddEditPayment from '../../../payment/config/form-add-edit.js'
import _ from 'lodash'
const paymentConfig = _.cloneDeep(formAddEditPayment)
paymentConfig.requestId = 'payment_id'
paymentConfig.routeParam = 'payment_id'

export default {
  id: uuidv4(),
  name: 'Основные',
  type: 'FormDefault',
  path: 'add-or-edit',
  // detail: true,
  lists: [
    { alias: 'status_srm', filter: [] },
    // { alias: 'account_id', filter: [] },
    { alias: 'status_account_id', filter: [] },
    // { alias: 'doljnost_magnit_id', filter: [] },
  ],
  alias: 'shop_request_magnit',
  active: false,
  fields: [
    selectField({
      label: 'Статус',
      name: 'status',
      alias: 'status_srm',
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
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    datetimeField({
      label: 'Дата статуса',
      name: 'date_status',
      value: '',
      type: 'datetime',
      subtype: 'datetime',
      readonly: true,
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { hasDate, hasTime },
      bootstrapClass: [''],
      disable: false,
    }),
    selectField({
      label: 'Статус от',
      name: 'status_account_id',
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
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    datetimeField({
      label: 'Дата создания',
      name: 'date_create',
      value: '',
      type: 'datetime',
      subtype: 'datetime',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { hasDate, hasTime },
      bootstrapClass: [''],
      readonly: true,
    }),
    autocompleteField({
      label: 'В работе у',
      name: 'account_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      search: '',
      url: 'get/pagination_list/manager_magnit_id',
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      // dependence: {
      //   //fields: ['statement_card', 'cardowner'],
      //   fillField: ['fio', 'invoice'],
      //   type: 'api',
      //   module: 'personal/getCard',
      //   field: 'personal_bank_id',
      // },
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) => context.mode === 'edit',
            // asdasd
            type: true,
          },
        ],
      },
      dependence: [
        {
          type: 'default',
          fillField: ['surname'],
        },
      ],
    }),
    datetimeField({
      label: 'На дату',
      name: 'date_request',
      value: '',
      type: 'datetime',
      subtype: 'datetime',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { hasDate, hasTime },
      bootstrapClass: [''],
      disable: false,
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) => context.mode === 'edit',
            // asdasd
            type: true,
          },
        ],
      },
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
      search: '',
      url: 'get/pagination_list/object_magnit_id',
      position: {
        cols: 12,
        sm: 9,
      },
      filter: [
        {
          field: 'account_id',
          // source: 'formData',
          type: 'array',
          value: '',
        },
        {
          field: 'date_target',
          // source: 'formData',
          type: 'date',
          value: '',
        },
      ],
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    stringField({
      label: 'Часы',
      name: 'hour',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
      readonly: true,
    }),
    autocompleteField({
      label: 'Линейщик',
      name: 'personal_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      url: 'get/pagination_list/personal_magnit_id',
      position: {
        cols: 12,
        sm: 6,
      },
      page: 1,
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'account_id',
          // source: 'formData',
          type: 'array',
          value: '',
        },
      ],
      // dependence: {
      //   //fields: ['statement_card', 'cardowner'],
      //   fillField: ['fio', 'invoice'],
      //   type: 'api',
      //   module: 'personal/getCard',
      //   field: 'personal_bank_id',
      // },
      dependence: [
        {
          type: 'default',
          fillField: ['name_without_space'],
        },
      ],
    }),
    autocompleteField({
      label: 'Должность',
      name: 'doljnost_id',
      alias: 'doljnost_magnit_id',
      subtype: 'single',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      url: 'get/pagination_list/doljnost_magnit_id',
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    dropZoneField({
      label: 'Файл',
      name: 'file_path',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      validations: { required },
      options: {
        withoutSave: false,
        folder: 'magnit_path_act',
        name: '`accounting_zayavka`',
        paramsForEmit: this,
        customName: (formData) => {
          return `${formData.surname}_${formData.type}_${
            formData.date_target
          }_${formData.name_without_space}_${new Date().getTime()}`
        },
      },
      value: [],
    }),
    stringField({
      label: 'Примечание',
      name: 'note',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    textBlock({
      label: 'payment',
      name: 'payment_id',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    textBlock({
      label: 'date_target',
      name: 'date_target',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    textBlock({
      label: 'name_without_space',
      name: 'name_without_space',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    textBlock({
      label: 'surname',
      name: 'surname',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    textBlock({
      label: 'type',
      name: 'type',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      value: 2,
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
  ],
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      skipValidation: true,
    }),
    stringAction({
      text: 'Начислить',
      type: 'submit',
      action: 'openForm',
      target: {
        route: 'shop-request-magnit/:id/payment',
        requestKey: 'payment_id',
      },
      color: 'primary',
      skipValidation: true,
      handlingResponse: {
        1: {
          text: 'Аккаунт создан',
          color: 'success',
        },
        2: {
          text: 'Такой аккаунт уже существует',
          color: 'error',
        },
        3: {
          text: '',
        },
      },
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              console.log(this)
              console.log(
                context.formData.personal_id && context.mode === 'edit'
              )
              return (
                context.mode === 'add' ||
                !context.formData.personal_id ||
                !context.formData.file_path.length
              )
            },
            type: true,
          },
          // {
          //   funcCondition: function () {
          //     console.log(this)
          //   },
          // },
        ],
      },
    }),

    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'account/createData',
      url: 'create/request/magnit',
      color: 'primary',
      handlingResponse: {
        1: {
          text: 'Аккаунт создан',
          color: 'success',
        },
        2: {
          text: 'Такой аккаунт уже существует',
          color: 'error',
        },
        3: {
          text: '',
        },
      },
      name: 'saveFormStore',
      action: 'saveFormStore',
    }),
  ],
  sharedFields: {
    fields: [
      {
        name: 'date_target',
        readonly: true,
      },
      {
        name: 'personal_id',
        readonly: true,
      },
      {
        name: 'object_id',
        readonly: true,
      },
      {
        name: 'doljnost_id',
        readonly: true,
      },
      {
        name: 'account_id',
        readonly: true,
      },
      {
        name: 'hour',
        alias: ['hour_plan', 'hour_fact'],
        readonly: true,
      },
      {
        name: 'direction_id',
        value: 2,
        readonly: true,
      },
    ],
    target: paymentConfig,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    name: 'Редактировать проживание',
    alias: 'payment',
    requestId: 'payment_id',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [Object.assign({}, paymentConfig)],
  },
}
