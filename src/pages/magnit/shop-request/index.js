import filters from './filters'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  datetimeField,
  dropZoneField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import formAddEditPayment from '../../payment/config/form-add-edit.js'
import _ from 'lodash'
const paymentConfig = _.cloneDeep(formAddEditPayment)
console.log(paymentConfig, paymentConfig.id, 'paymentConfig')
paymentConfig.requestId = 'payment_id'
paymentConfig.routeParam = 'payment_id'
// _.cloneDeep(filters)

console.log(formAddEditPayment)
function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

const tableConsumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        function: consolePanel,
        backgroundColor: '#fff',
      },
      // {
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      // },
    ],
  },
  head: [
    {
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Статус',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'ps.status',
      value: 'status_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'ФИО',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.name',
      value: 'name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Телефон',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'telefon',
      alias: 'p.telefon',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Примечание',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'comment',
      alias: 'p.comment',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Действия',
      type: 'actions',
      align: 'center',
      fixed: {
        value: false,
        position: 'right',
      },
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
        },
      ],
    },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: 20,
    currentPage: 1,
    totalPages: null,
    footer: null,
  },
}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/shop_request_magnit',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        function: consolePanel,
        backgroundColor: '#fff',
        type: 'addItem',
      },
      // {
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      // },
      {
        label: 'Загрузить',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        type: 'changeUrl',
        url: 'shop-request-magnit/upload',
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'Статус',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      alias: 'ssrm.name',
      isShow: true,
      width: '40',
      value: 'status_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Создана',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'srm.date_create',
      value: 'date_create',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'На дату',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'srm.date_request',
      value: 'date_request',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'В работе у',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'account_name',
      alias: 'sa.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Объект',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'object_name',
      alias: 'o.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Линейщик',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'personal_name',
      alias: 'pers.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Должность',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'doljnost_name',
      alias: 'd.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'hour',
      alias: 'srm.hour',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Примечание',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'note',
      alias: 'srm.note',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Действия',
      type: 'actions',
      align: 'center',
      fixed: {
        value: false,
        position: 'right',
      },
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
        },
      ],
    },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: 20,
    currentPage: 1,
    totalPages: null,
    footer: null,
  },
  detail: {
    name: 'Заявка на Магнит',
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '700px',
    method: 'get',
    alias: 'shop_request_magnit',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
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
            name: 'path_act',
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
              toObjectCustom: 'request_data',
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
            to: 'account',
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
                      !context.formData.path_act?.length
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
      },
      {
        path: 'upload',
        id: 2,
        name: 'Загрузить',
        type: 'FormDefault',
        detail: true,
        fields: [
          dateField({
            label: 'Период:',
            name: 'date',
            subtype: 'period',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            alias: 'p.date_status',
          }),
          checkboxField({
            label: 'Табель',
            name: 'tabel',
            placeholder: '',
            readonly: false,
            notSend: true,
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
            value: true,
          }),
          dropZoneField({
            label: 'Тип файла / часы:',
            name: 'file',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            options: {
              withoutSave: false,
              folder: 'parser_magnit',
              name: '`parser_magnit`',
              paramsForEmit: this,
              acceptedFiles: '.xlsx',
            },
            value: [],
          }),
          textBlock({
            label: 'Создал',
            name: 'type',
            placeholder: '',
            readonly: true,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            value: 1,
            //validations: { required },
            //isShow: false,
          }),
        ],
        actions: [
          stringAction({
            text: 'Загрузить',
            type: 'submit',
            module: 'form/create',
            name: 'saveForm',
            action: 'saveForm',
            url: '',
            conditionAction: [
              {
                target: 'url',
                from: 'tabel',
                result: {
                  true: 'parser/magnit_list',
                  false: 'parser/magnit_pivot',
                },
              },
            ],
          }),
        ],
      },
    ],
    activeTab: null,
  },
  filters,
}

export default config
