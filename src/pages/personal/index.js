/* eslint-disable */

import filters from './filters'
import filtersKey from './filtersKey'
import {
  required,
  nameLength,
  minLength,
  numeric,
  validDate,
} from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textBlock,
  textareaField,
  dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
// import FormList from '@/components/Form/list/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'

const paymentConfig = _.cloneDeep(paymentConfigOrig)
const zayavkaConfig = _.cloneDeep(zayavkaConfigOrig)
const LIST_HEAD_PAYMENTS = [
  'status_name',
  'account_name',
  'date_add',
  'bank_fio',
  'total',
]
const LIST_PANEL_PAYMENTS = ['Обновить']
const LIST_HEAD_ZAYAVKA = [
  'status_name',
  'category_name',
  'schet',
  'date_create',
  'total',
  'price',
]

paymentConfig.options = {
  ...paymentConfig.options,
  urlDetail: 'personal_id',
  alias: 'pb.personal_id',
}
zayavkaConfig.options = {
  ...zayavkaConfig.options,
  urlDetail: 'personal_id',
  alias: 'z.personal_id',
}
const headDateCreate = {
  title: 'Создано',
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
  alias: 'z.date_create',
  isShow: true,
  width: '40',
  value: 'date_create',
  search: {
    field: '',
    isShow: true,
  },
}
const actions = [
  stringAction({
    text: 'Закрыть',
    type: 'submit',
    color: 'textDefault',
    name: 'closePopup',
    action: 'closePopup',
    to: 'personal',
    skipValidation: true,
  }),
]
zayavkaConfig.head.push(headDateCreate)
const converConfig = (config, listHead, listPanel) => {
  const spliceHeads = (list) => {
    config.head = config.head.flatMap((head) => {
      const { value } = head
      if (list.includes(value)) {
        return head
      } else {
        return []
      }
    })
  }
  const splicePanel = (list) => {
    config.panel.buttons = config.panel.buttons.flatMap((button) => {
      const { label } = button
      if (list.includes(label)) {
        return button
      } else {
        return []
      }
    })
  }
  if (config.filter) {
    config.filter = undefined
  }
  config.actions = actions
  spliceHeads(listHead)
  splicePanel(listPanel)
}

// Convert payment view
converConfig(paymentConfig, LIST_HEAD_PAYMENTS, LIST_PANEL_PAYMENTS)
converConfig(zayavkaConfig, LIST_HEAD_ZAYAVKA, LIST_PANEL_PAYMENTS)
paymentConfig.detail.popupIndex = 2
paymentConfig.detail.requestId = 'payment'
paymentConfig.detail.tabs[0].path = 'edit-payment'
paymentConfig.detail.tabs[0].routeParam = 'payment'
paymentConfig.detail.tabs[0].id = 15
console.log(zayavkaConfig)

// Convert zayavka view
zayavkaConfig.detail.popupIndex = 2
zayavkaConfig.detail.requestId = 'zayavka'
const editTabZayavka = zayavkaConfig.detail.tabs.find((el) => el.path === 'id')
console.log(editTabZayavka)
editTabZayavka.path = 'edit-zayavka'
editTabZayavka.routeParam = 'edit-zayavka'

const changeActionTo = (array, key) => {
  console.log('changeActionTo')
  array.forEach((tab) => {
    if (tab.actions) {
      tab.actions.forEach((el) => {
        if (el.action === 'closePopup') {
          el.to = key
        }
      })
    }
  })
}

console.log(paymentConfig)

changeActionTo(paymentConfig.detail.tabs, 'personal/:id')
// import useNavigation from '@/compositions/useNavigation'
// import { payment, userKeys } from '@/pages'

// const { addOrUpdateURLParam } = useNavigation({})

function consoleText(row) {
  console.log(row, 2)
  //return 'test'
}

function consoleButton(row) {
  console.log(row, 1)
}

function consolePanel() {
  console.log('panel,button')
}

function downloadFile(val) {
  const link = document.createElement('a')
  link.download = val
  link.href = process.env.VUE_APP_STORE + val
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function searchInputing(field) {
  console.log(field)
}

const consumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/zayavka',
    urlDetail: 'personal_id',
    alias: 'z.personal_id',
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
        value: true,
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
      title: 'Дата назн',
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
      value: 'date_target',
      alias: 'p.date_target',
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
      alias: 'pers.name',
      value: 'personal_name',
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
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'hour',
      alias: 'p.hour',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'd.name',
      value: 'doljnost_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Сумма',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'p.total',
      value: 'total',
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
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

function changeSort() {
  let btn = config.panel.buttons.find((x) => x.function === changeSort)
  let heading = config.head.find((x) => x.changeable)
  if (btn.label === 'Объекты') {
    btn.label = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot-edit-object'
    heading.routeParam = 'object_id'
    heading.type = 'download'
    config.options.url = 'get/pagination_pivot/personal_target_object'
  } else if (btn.label === 'ФИО') {
    btn.label = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = 'p.name'
    heading.value = 'personal_name'
    heading.routeName = 'pivot-edit-personal'
    heading.routeParam = 'personal_id'
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/personal_target_personal'
  }
}

const debetorConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_debit',
    urlDetail: 'personal_id',
    alias: 'd.debtor_id',
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
        label: 'Переплата',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        isSwitch: true,
        type: 'switch',
        function: consolePanel,
        backgroundColor: '#ffffff',
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
      title: 'Направление',
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
      alias: 'dir.name',
      isShow: true,
      width: '40',
      value: 'direction_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Руководитель',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      value: 'account_name',
      alias: 'sa.fio',
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
          type: 'string',
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
      alias: 'pers.name',
      value: 'personal_name',
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
      alias: 'o.name',
      value: 'object_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Остаток',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      value: 'remainder',
      alias: 'd.remainder',
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
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const holdPayments = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/hold_payments',
    urlDetail: 'personal_id',
    alias: 'hp.personal_id',
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
      title: 'id',
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
      alias: 'hp.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'В/В',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      value: 'vid_vedomost',
      alias: 'vv.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Остаток',
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
      alias: 'hp.remainder',
      value: 'remainder',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Сумма',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      value: 'sum',
      alias: 'hp.sum',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата назн',
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
      alias: 'hp.date_target',
      value: 'date_target',
      search: {
        field: '',
        isShow: true,
      },
    },
    // {
    //   title: 'Действия',
    //   type: 'actions',
    //   align: 'center',
    //   fixed: {
    //     value: false,
    //     position: 'right',
    //   },
    //   isShow: true,
    //   width: '100',
    //   value: 'actions',
    //   actions: [
    //     {
    //       type: 'button',
    //       url: '$IconSetting',
    //       function: consoleText,
    //       label: 'Редактировать',
    //     },
    //     {
    //       type: 'button',
    //       url: '$IconSetting',
    //       function: consoleButton,
    //       label: 'Удалить',
    //     },
    //   ],
    // },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: 20,
    currentPage: 1,
    totalPages: null,
    footer: null,
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

export const headDocumentConfigEdit = [
  {
    title: 'Тип документа',
    type: 'default',
    align: 'center',
    fixed: {
      value: true,
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
    alias: 'pds.name',
    isShow: true,
    width: '40',
    value: 'doc_name',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'Скан-копия/фото',
    type: 'download',
    align: 'center',
    fixed: {
      value: false,
      position: undefined,
    },
    sorts: undefined,
    isShow: true,
    width: '150',
    value: 'path_doc',
    alias: 'pd.path_doc',
    search: {
      field: '',
      isShow: true,
    },
    actions: [
      {
        type: 'button',
        url: '$IconDownload',
        function: downloadFile,
        label: 'Скачать',
      },
    ],
  },

  {
    title: 'Примечание',
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
    alias: 'pd.note',
    value: 'comment',
    search: {
      field: '',
      isShow: true,
    },
  },
]

export const fieldsBaseDocumentConfigEdit = [
  selectField({
    label: 'Тип документа',
    name: 'doc_id',
    alias: 'documents',
    placeholder: '',
    class: [''],
    selectOption: {
      text: 'name',
      value: 'id',
    },
    position: {
      cols: 12,
      sm: 12,
    },
    validations: { required },
    bootstrapClass: [''],
  }),
  dropZoneField({
    label: 'Скан-копия/фото:',
    name: 'path_doc',
    notPut: true,
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
      removeble: true,
      withoutSave: false,
      folder: 'personal_doc',
      name: '`personal_doc`',
      paramsForEmit: this,
    },
    value: [],
  }),
  textareaField({
    label: 'Примечание:',
    name: 'note',
    alias: 'pd.note',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
]

export const fieldsTypeDocsDocumentConfigEdit = [
  selectField({
    label: 'Тип документа',
    name: 'doc_id',
    alias: 'documents',
    placeholder: '',
    class: [''],
    selectOption: {
      text: 'name',
      value: 'id',
    },
    position: {
      cols: 12,
      sm: 12,
    },
    validations: { required },
    bootstrapClass: [''],
  }),
  dropZoneField({
    label: 'Скан-копия/фото:',
    name: 'path_doc',
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
      removeble: true,
      withoutSave: false,
      folder: 'personal_doc',
      name: '`personal_doc`',
      paramsForEmit: this,
    },
    value: [],
  }),
  textareaField({
    label: 'Примечание:',
    name: 'note',
    alias: 'pd.note',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
]

const documentConfigEdit = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    alias: 'personal_id',
    title: 'This is an about page1',
    contextMenu: {
      actions: [
        {
          icon: 'mdi-delete',
          label: 'Удалить документ',
          action: {
            type: 'delete',
            alias: 'personal_doc',
          },
        },
      ],
    },
  },
  type: TableDefault,
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
        url: 'personal/:id/new',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
        backgroundColor: '#fff',
      },
    ],
  },
  head: headDocumentConfigEdit,
  data: {
    rows: [],
    totalRows: null,
    pageLength: 20,
    currentPage: 1,
    totalPages: null,
    footer: null,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'personal_doc',
    url: '/get/form/',
    requestId: 'object_id',
    name: 'Персонал',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'object_id',
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
            notPut: true,
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc`',
              paramsForEmit: this,
            },
            value: [],
          }),
          textareaField({
            label: 'Примечание:',
            name: 'note',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/update',
            url: 'set/data/personal_doc',
            useRouteKey: [
              { requestKey: 'personal_id', storageKey: 'id' },
              { requestKey: 'id', storageKey: 'object_id' },
            ],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'updateFormStore',
            action: 'updateFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal/:id',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
      {
        path: 'new',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: fieldsTypeDocsDocumentConfigEdit,
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'personal/createForm',
            url: 'set/data/personal_doc',
            useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal/:id',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
    ],
  },
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
  filters,
}

const documentConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    alias: 'personal_id',
    title: 'This is an about page1',
  },
  type: TableDefault,
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
        url: 'personal-add-new',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'Тип документа',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'pds.name',
      isShow: true,
      width: '40',
      value: 'doc_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Скан-копия/фото',
      type: 'download',
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
      value: 'path_doc',
      alias: 'pd.path_doc',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          type: 'button',
          url: '$IconDownload',
          function: downloadFile,
          label: 'Скачать',
        },
      ],
    },
    {
      title: 'Примечание',
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
      alias: 'pd.note',
      value: 'comment',
      search: {
        field: '',
        isShow: true,
      },
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
    type: 'popup', // String 'popup' or 'page'
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'personal_doc',
    url: '/get/form/',
    name: 'Персонал',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'id',
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
            placeholder: '',
            notPut: true,
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
            options: {
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc`',
              paramsForEmit: this,
            },
            value: [],
          }),
          textareaField({
            label: 'Примечание:',
            name: 'note',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/update',
            url: 'set/data/personal_doc',
            useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'updateFormStore',
            action: 'updateFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal-add',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
      {
        path: 'new',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc`',
              paramsForEmit: this,
            },
            value: [],
          }),
          checkboxField({
            label: '',
            name: 'from_document_prishel',
            value: true,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            isShow: {
              value: true,
            },
            bootstrapClass: [''],
          }),
          textareaField({
            label: 'Примечание:',
            name: 'note',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'personal/createForm',
            url: 'set/data/personal_doc',
            useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal-add',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
    ],
  },
  filters,
}

const skanConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    urlDetail: 'personal_id',
    alias: 'pd.personal_id',
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
        value: true,
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
      title: 'Дата назн',
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
      value: 'date_target',
      alias: 'p.date_target',
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
      alias: 'pers.name',
      value: 'personal_name',
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
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'hour',
      alias: 'p.hour',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'd.name',
      value: 'doljnost_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Сумма',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'p.total',
      value: 'total',
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
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const bankConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_bank',
    urlDetail: 'personal_id',
    alias: 'pb.personal_id',
    title: 'This is an about page1',
    contextMenu: {
      actions: [
        {
          icon: 'mdi-delete',
          label: 'Удалить карту',
          action: {
            type: 'delete',
            alias: 'personal_bank',
          },
        },
      ],
    },
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
      alias: 'pb.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Приоритет',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'boolean',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'priority',
      alias: 'pb.priority',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Банк',
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
      alias: 'b.name',
      value: 'bank_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Номер счета',
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
      alias: 'pb.invoice',
      value: 'invoice',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Карта на ФИО',
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
      value: 'fio',
      alias: 'pb.fio',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'pb.comment',
      value: 'comment',
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
    type: 'popup', // String 'popup' or 'page'
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'personal_bank',
    url: '/get/form/',
    requestId: 'card_id',
    name: 'Банковская карта',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'new_card',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'bank_id_without_nal', filter: [] }],
        alias: 'personal_bank',
        active: false,
        routeParam: 'card_id',
        fields: [
          selectField({
            label: 'Банк',
            name: 'bank_id',
            alias: 'bank_id_without_nal',
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
            value: '',
            disable: true,
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'ФИО',
            name: 'fio',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
          }),
          stringField({
            label: 'БИК',
            name: 'bik',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { minLength: minLength(8), numeric, required },
          }),
          stringField({
            label: 'Номер счета',
            name: 'invoice',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { minLength: minLength(20), numeric, required },
          }),
          stringField({
            label: 'Примечание',
            name: 'comment',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'Приоритет',
            name: `priority`,
            value: false,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          // textBlock({
          //   label: 'Создал',
          //   name: 'id',
          //   placeholder: '',
          //   notSend: true,
          //   readonly: true,
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   bootstrapClass: [''],
          // }),
        ],
        actions: [
          // stringAction({
          //   text: 'Сохранить',
          //   type: 'submit',
          //   color: 'primary',
          //   module: 'form/create',
          //   url: 'set/data/personal_bank',
          //   useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
          //   // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
          //   useRouteParam: 'card_id',
          //   name: 'saveForm',
          //   action: 'saveForm',
          //   isHide: {
          //     value: false,
          //     type: 'every',
          //     condition: [
          //       {
          //         field: 'mode',
          //         target: 'environment',
          //         value: ['edit'],
          //         type: true,
          //       },
          //     ],
          //   },
          // }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/update',
            url: 'set/data/personal_bank',
            useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveForm',
            useRouteParam: 'card_id',
            action: 'saveForm',
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'mode',
                  target: 'environment',
                  value: ['add'],
                  type: true,
                },
                {
                  field: 'readonlyAll',
                  target: 'environment',
                  value: [1],
                  type: true,
                },
              ],
            },
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal/:id',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
    ],
  },
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

// const paymentConfig = {
//   selector: '#mainTable',
//   options: {
//     selecting: true,
//     search: {
//       function: searchInputing,
//     },
//     headerFixed: true,
//     //url: 'https://dummyjson.com/users',
//     url: 'get/pagination/payment',
//     urlDetail: 'personal_id',
//     alias: 'p.personal_id',
//     title: 'This is an about page1',
//   },
//   panel: {
//     buttons: [
//       {
//         label: 'Обновить',
//         class: ['v-table-button--custom'],
//         url: '$IconEdit',
//         function: consolePanel,
//         backgroundColor: '#ffffff',
//       },
//       // {
//       //   label: 'Скачать',
//       //   class: ['v-table-button--custom'],
//       //   function: consolePanel,
//       //   backgroundColor: '#fff',
//       // },
//     ],
//   },
//   head: [
//     {
//       title: 'ID',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: true,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       alias: 'p.id',
//       isShow: true,
//       width: '40',
//       value: 'id',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Дата назн',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'number',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       value: 'date_target',
//       alias: 'p.date_target',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Линейщик',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '90',
//       alias: 'pers.name',
//       value: 'personal_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Объект',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'o.name',
//       value: 'object_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Часы',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'number',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       value: 'hour',
//       alias: 'p.hour',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Должность',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'date',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'd.name',
//       value: 'doljnost_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Сумма',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'date',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'p.total',
//       value: 'total',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Действия',
//       type: 'actions',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'right',
//       },
//       isShow: true,
//       width: '100',
//       value: 'actions',
//       actions: [
//         {
//           type: 'button',
//           url: '$IconSetting',
//           function: consoleText,
//           label: 'Редактировать',
//         },
//         {
//           type: 'button',
//           url: '$IconSetting',
//           function: consoleButton,
//           label: 'Удалить',
//         },
//       ],
//     },
//   ],
//   data: {
//     rows: [],
//     totalRows: null,
//     pageLength: 20,
//     currentPage: 1,
//     totalPages: null,
//   },
//   detail: undefined,
//   actions: [
//     stringAction({
//       text: 'Закрыть',
//       type: 'submit',
//       color: 'textDefault',
//       name: 'closePopup',
//       action: 'closePopup',
//       to: 'personal',
//       skipValidation: true,
//     }),
//   ],
// }

const editFormPermissions = {
  // Бригадир(id = 13) - все readonly
  brigadir: {
    permissions: [13],
    type: true,
  },
  //  Менеджер(id = 1) - если направление логистика, то может менять доступ, остальное readonly, если направление розница, то все поля readonly
  manager: [
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [1],
      type: false,
    },
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [2],
      type: true,
    },
  ],
  //  Рук. фил.(id = 15), ЦУП(id = 2), Директор(id = 3) - может менять телефон, доступ, остальное readonly
  rukFIlCUPDirector: {
    access: {
      permissions: [15, 2, 3],
      type: false,
    },
    denied: {
      permissions: [15, 2, 3],
      type: true,
    },
  },
  DBA: {
    access: {
      permissions: [4],
      type: false,
    },
    denied: {
      permissions: [4],
      type: true,
    },
  },
  OBDandOKK: {
    access: {
      permissions: [7, 8],
      type: false,
    },
    denied: {
      permissions: [7, 8],
      type: true,
    },
  },
  // Убрать ОКК
}

export const fieldsBaseDefaulrForm = [
  stringField({
    label: 'ФИО',
    name: 'name',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 6,
    },
    bootstrapClass: [''],
    //validations: { required },
    //isShow: false,
    readonly: {
      value: false,
      condition: [
        // editFormPermissions.brigadir,
        // editFormPermissions.manager[1],
        // editFormPermissions.rukFIlCUPDirector.denied,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  stringField({
    label: 'Телефон',
    name: 'telefon',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 6,
    },
    bootstrapClass: [''],
    //validations: { required },
    //isShow: false,
    readonly: {
      value: false,
      condition: [
        // editFormPermissions.brigadir,
        // editFormPermissions.manager[1],
        // editFormPermissions.rukFIlCUPDirector.access,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  selectField({
    label: 'Гражданство',
    name: 'grajdanstvo_id',
    alias: 'grajdanstvo_id',
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
    readonly: {
      value: false,
      condition: [
        editFormPermissions.brigadir,
        editFormPermissions.manager[1],
        editFormPermissions.rukFIlCUPDirector.denied,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  stringField({
    label: 'Примечание',
    name: 'comment',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 6,
    },
    bootstrapClass: [''],
    //validations: { required },
    //isShow: false,
    readonly: {
      value: false,
      condition: [
        editFormPermissions.brigadir,
        editFormPermissions.manager[1],
        editFormPermissions.rukFIlCUPDirector.denied,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  dateField({
    label: ' Дата рождения',
    name: 'data_rojd',
    subtype: 'date',
    placeholder: '',
    classes: [''],
    position: {
      cols: 12,
      sm: 6,
    },
    validations: { required },
    bootstrapClass: ['changeSelect'],
    readonly: {
      value: false,
      condition: [
        editFormPermissions.brigadir,
        editFormPermissions.manager[1],
        editFormPermissions.rukFIlCUPDirector.denied,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  selectField({
    label: 'Личный ключ',
    name: 'user_key',
    subtype: 'multiple',
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
    //validations: { required },
    bootstrapClass: [''],
    readonly: true,
    //readonly: {
    //  value: false,
    //  condition: [
    //    editFormPermissions.brigadir,
    //    editFormPermissions.manager[1],
    //    editFormPermissions.rukFIlCUPDirector.denied,
    //    editFormPermissions.DBA.access,
    //    editFormPermissions.OBDandOKK.access,
    //  ],
    //},
  }),
  selectField({
    label: 'Направление',
    name: 'direction_json',
    alias: 'direction_id',
    subtype: 'miltiple',
    subtype: 'multiple',
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
    // readonly: {
    //   value: false,
    //   condition: [
    //     editFormPermissions.brigadir,
    //     editFormPermissions.manager[1],
    //     editFormPermissions.rukFIlCUPDirector.denied,
    //     // editFormPermissions.DBA.access,
    //     editFormPermissions.OBDandOKK.denied,
    //   ],
    // },
  }),
  selectField({
    label: 'Доступ',
    name: 'account_json',
    alias: 'account_id',
    subtype: 'multiple',
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
    readonly: {
      value: false,
      condition: [
        editFormPermissions.brigadir,
        ...editFormPermissions.manager,
        editFormPermissions.rukFIlCUPDirector.access,
        editFormPermissions.DBA.access,
        editFormPermissions.OBDandOKK.denied,
      ],
    },
  }),
  selectField({
    label: 'Проживание',
    name: 'habitation_id',
    alias: 'direction_json',
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
    defaultItems: [
      {
        id: 11,
        name: '--Самостоятельное--',
        bank_id: 11,
      },
    ],
    //validations: { required },
    bootstrapClass: [''],
    readonly: {
      value: false,
      condition: [
        editFormPermissions.brigadir,
        editFormPermissions.manager[1],
        editFormPermissions.rukFIlCUPDirector.denied,
        editFormPermissions.DBA.denied,
        editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  checkboxField({
    label: 'Штатный',
    name: 'in_state',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 6,
    },
    bootstrapClass: [''],
    readonly: {
      value: false,
      condition: [
        // editFormPermissions.brigadir,
        // editFormPermissions.manager[1],
        // editFormPermissions.rukFIlCUPDirector.denied,
        // editFormPermissions.DBA.access,
        // editFormPermissions.OBDandOKK.access,
      ],
    },
  }),
  selectField({
    label: 'Объекты',
    name: 'object_id',
    alias: 'objects_personal',
    subtype: 'multiple',
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
]

export const fieldsDocumentDefaultForm = [
  {
    type: 'passport',
    name: 'Паспорт',
    fields: [],
  },
  {
    type: 'Snils',
    name: 'Снилс',
    fields: [
      stringField({
        label: 'Номер',
        name: 'name',
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
    ],
  },
  {
    type: 'passport_page_2',
    name: 'Паспорт стр.2',
    fields: [
      stringField({
        label: 'Адрес регистрации',
        name: 'issued_by',
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
    ],
  },
  {
    type: 'inn',
    name: 'ИНН',
    fields: [
      stringField({
        label: 'Адрес регистрации',
        name: 'issued_by',
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
    ],
  },
]

export const defaultForm = [
  {
    id: 0,
    path: 'edit',
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      { alias: 'user_keys', filter: [] },
      { alias: 'habitation_id', filter: [] },
      { alias: 'account_id', filter: [] },
      { alias: 'direction_id', filter: [] },
      { alias: 'grajdanstvo_id', filter: [] },
      {
        alias: 'objects_personal',
        filter: [
          {
            field: 'object_id',
            alias: 'personal_id',
            value: '',
            source: '+route.params.id',
            type: 'num',
          },
        ],
      },
    ],
    alias: 'personal',
    active: false,
    fields: fieldsBaseDefaulrForm,
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/putForm',
        name: 'saveFormId',
        url: 'update/personal',
        action: 'saveFormId',
        color: 'primary',
      }),
    ],
  },
  {
    id: 0,
    path: 'bind',
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      {
        alias: 'bind_directions',
        filter: [
          {
            field: 'bind_objects',
            alias: 'object_id',
            value: '',
            source: 'formData',
            type: 'array',
          },
        ],
      },
      // 'user_keys',
      // 'habitation_id',
      // 'account_id',
      // 'direction_id',
      // 'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    fields: [
      autocompleteField({
        label: 'Объект',
        //subtype: 'multiple',
        name: 'bind_objects',
        requestKey: 'object_id',
        //subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        //readonly: true,
        items: [],
        page: 1,
        search: '',
        url: 'get/pagination_list/bind_objects',
        // object
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
        filter: [
          {
            field: 'personal_id',
            value: '',
            source: '+route.params.id',
          },
        ],
        dependence: [
          {
            type: 'api',
            module: 'selects/getListUpdate',
            field: 'bind_directions',
            url: 'get/pagination_list/bind_directions',
            filter: [
              {
                field: 'bind_objects',
                alias: 'object_id',
                value: '',
                type: 'num',
              },
              {
                field: 'personal_id',
                value: '',
                source: '+route.params.id',
                type: 'num',
              },
            ],
          },
        ],
        //isShow: {
        //  value: false,
        //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
        //},
      }),
      autocompleteField({
        label: 'Направления',
        subtype: 'multiple',
        name: 'bind_directions',
        alias: '',
        notSend: true,
        //subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        //readonly: true,
        items: [],
        page: 1,
        search: '',
        url: 'get/pagination_list/bind_objects',
        // object
        position: {
          cols: 12,
          sm: 12,
        },
        validations: { required },
        bootstrapClass: [''],
        updateList: [
          {
            alias: 'bind_accounts',
            filter: [
              {
                field: 'bind_objects',
                alias: 'object_id',
                source: 'formData',
                value: '',
                type: 'num',
              },
              {
                field: 'bind_directions',
                alias: 'direction_json',
                source: 'formData',
                value: '',
                type: 'array',
              },
              {
                field: 'personal_id',
                value: '',
                source: '+route.params.id',
                type: 'num',
              },
            ],
          },
        ],
        filter: [
          {
            field: 'bind_objects',
            alias: 'object_id',
            value: '',
            type: 'num',
          },
          {
            field: 'bind_directions',
            alias: 'direction_json',
            value: '',
            type: 'array',
          },
          {
            field: 'personal_id',
            value: '',
            source: '+route.params.id',
            type: 'num',
          },
        ],
        //isShow: {
        //  value: false,
        //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
        //},
      }),
      selectField({
        label: 'Сотрудники',
        name: 'account_json',
        alias: 'bind_accounts',
        subtype: 'multiple',
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
        validations: { required },
        bootstrapClass: [''],
      }),
    ],
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/putForm',
        name: 'saveForm',
        url: 'update/personal/object',
        action: 'saveForm',
        color: 'primary',
        handlingResponse: {
          1: {
            text: 'Объект привязан',
            color: 'success',
          },
          2: {
            text: 'Сотрудник удален',
            color: 'error',
          },
          3: {
            text: '',
          },
        },
      }),
    ],
  },
  {
    id: 2,
    path: 'edit',
    name: 'Данные документов',
    type: FormDocuments,
    detail: true,
    lists: [
      'user_keys',
      'habitation_id',
      'account_id',
      'direction_id',
      'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    documents: fieldsDocumentDefaultForm,
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'disabled',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ],
  },
  {
    path: 'edit',
    id: 3,
    name: 'Сканы',
    type: TableDefault,
    active: false,
    config: documentConfigEdit,
  },
  {
    path: 'edit',
    id: 7,
    name: 'Банковские карты',
    type: TableDefault,
    active: false,
    config: bankConfig,
  },
  {
    path: 'edit',
    id: 4,
    name: 'Начисления и выплаты',
    type: TableDefault,
    active: false,
    config: paymentConfig,
  },
  {
    path: 'edit',
    id: 1,
    name: 'Расход',
    type: TableDefault,
    active: false,
    config: zayavkaConfig,
  },
  {
    path: 'edit',
    id: 6,
    name: 'Задолженность',
    type: TableDefault,
    active: false,
    config: debetorConfig,
  },
  {
    path: 'edit',
    id: 9,
    name: 'Переплаты',
    type: TableDefault,
    active: false,
    config: holdPayments,
  },
  {
    path: 'edit',
    id: 9,
    name: 'Переплаты',
    type: TableDefault,
    active: false,
    config: holdPayments,
  },
  {
    id: 7,
    path: 'load',
    name: 'load',
    type: FormDefault,
    detail: true,
    alias: 'personal',
    active: false,
    fields: [
      dropZoneField({
        label: 'Файл',
        name: 'photo_path',
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
          folder: 'user_keys',
          name: '`Заявка_ФИО_${form.fields.find((el) => el.name === "personal_id").selectOptionName}_${formData["object_id"]}`',
          paramsForEmit: this,
        },
        value: [],
      }),
    ],
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      //stringAction({
      //  text: 'Сохранить',
      //  type: 'submit',
      //  module: '',
      //  name: 'saveForm',
      //  //action: 'saveForm',
      //  nextForm: true,
      //}),
    ],
  },
  {
    path: 'add',
    id: 5,
    name: 'Заявка на персонал',
    type: 'FormStage',
    detail: true,
    setRoute: 'personal-add',
    stages: [
      {
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [
          // 'vid_vedomost_id',
          // 'status_pt',
          { alias: 'direction_id_logistic', filter: [] },
          { alias: 'grajdanstvo_id', filter: [] },
          {
            alias: 'brigadirs',
            filter: [
              {
                field: 'object_id',
                //alias: 'object_json',
                value: '',
                source: 'formData',
                type: 'array',
              },
              {
                field: 'direction_id',
                //alias: 'direction_json',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
          {
            alias: 'city_id',
            filter: [
              {
                field: 'regions_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          // { alias: 'brigadirs', filter: [] },
          // 'shifts',
          // 'nutritions',
        ],
        alias: 'personal_target',
        active: false,
        fields: [
          stringField({
            label: 'ФИО',
            name: 'fio',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'Дата рождения',
            name: 'date_rojd',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
            //mode: 'edit',
          }),
          selectField({
            label: 'Направления',
            subtype: 'multiple',
            name: 'direction_id',
            alias: 'direction_id_logistic',
            requestKey: 'direction_json',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_id',
                url: 'get/pagination_list/object_logistic',
                alias: 'object_id',
              },
            ],
            updateList: [
              {
                alias: 'brigadirs',
                filter: [
                  {
                    field: 'object_id',
                    value: '',
                    source: 'formData',
                    type: 'array',
                  },
                  {
                    field: 'direction_id',
                    //alias: 'direction_json',
                    value: '',
                    source: 'formData',
                    type: 'array',
                  },
                ],
              },
            ],
          }),
          autocompleteField({
            label: 'Объект',
            subtype: 'multiple',
            name: 'object_id',
            alias: 'object_json',
            requestKey: 'object_json',
            //subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/object_logistic',
            // object
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            putValueInItems: 'object_transfer_id',
            filter: [
              {
                field: 'direction_id',
                value: '',
              },
            ],
            // dependence: [
            //   {
            //     type: 'default',
            //     fillField: ['city_id', 'regions_id'],
            //   },
            //   //{
            //   //  type: 'api',
            //   //  module: 'selects/getListUpdate',
            //   //  field: 'personal_id',
            //   //  url: 'get/pagination_list/brigadirs',
            //   //},
            // ],
            updateList: [
              {
                alias: 'brigadirs',
                filter: [
                  {
                    field: 'object_id',
                    value: '',
                    source: 'formData',
                    type: 'array',
                  },
                  {
                    field: 'direction_id',
                    //alias: 'direction_json',
                    value: '',
                    source: 'formData',
                    type: 'array',
                  },
                ],
              },
            ],
            update: {
              module: 'selects/getList',
              fields: ['personal_id'],
            },
            isShow: {
              value: false,
              conditions: [
                { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
              ],
            },
          }),
          // stringField({
          //   label: '',
          //   name: 'city_id',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   isShow: {
          //     value: true,
          //   },
          //   bootstrapClass: [''],
          // }),
          // stringField({
          //   label: '',
          //   name: 'regions_id',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   isShow: {
          //     value: true,
          //     // hide: true,
          //   },
          //   bootstrapClass: [''],
          // }),
          //autocompleteField({
          //  label: 'Бригадир',
          //  name: 'personal_id',
          //  requestKey: 'account_json',
          //  // subtype: 'single',
          //  subtype: 'multiple',
          //  stringify: true,
          //  placeholder: '',
          //  class: [''],
          //  selectOption: {
          //    text: 'name',
          //    value: 'id',
          //  },
          //  items: [],
          //  page: 1,
          //  search: '',
          //  url: 'get/pagination_list/brigadirs',
          //  // brigadirs
          //  position: {
          //    cols: 12,
          //    sm: 12,
          //  },
          //  validations: { required },
          //  bootstrapClass: [''],
          //  filter: [
          //    {
          //      field: 'object_id',
          //      alias: 'object_json',
          //      value: '',
          //      type: 'array'
          //    },
          //    {
          //      field: 'direction_id',
          //      alias: 'direction_json',
          //      value: '',
          //      type: 'array'
          //    },
          //  ],
          //  isShow: {
          //    value: false,
          //    conditions: [{ field: 'direction_id', value: [1, 6] }],
          //  },
          //}),
          selectField({
            label: 'Бригадир',
            name: 'personal_id',
            alias: 'brigadirs',
            requestKey: 'account_json',
            subtype: 'multiple',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            update: {
              module: 'selects/getList',
              fields: ['object_id'],
            },
            isShow: {
              value: false,
              conditions: [
                { field: 'direction_id', value: [[1], [6], [1, 6], [6, 1]] },
              ],
            },
          }),
          selectField({
            label: 'Гражданство',
            name: 'grajdanstvo_id',
            alias: 'grajdanstvo_id',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            update: {
              module: 'selects/getList',
              fields: ['object_id'],
            },
          }),
          checkboxField({
            label: 'Трансфер',
            name: 'transfer',
            value: false,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Адрес А',
            name: 'start_point',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required, nameLength },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
          }),
          selectField({
            label: 'Объект',
            subtype: 'single',
            name: 'object_transfer_id',
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            // object
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'default',
                fillField: [
                  'city_id',
                  'regions_id',
                  'region_name',
                  'city_name',
                ],
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'regions_id',
                url: 'get/pagination_list/regions_id',
              },
            ],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
          }),
          autocompleteField({
            label: 'Регион',
            name: 'regions_id',
            alias: 'regions_id',
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
            url: 'get/pagination_list/regions_id',
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'city_id',
                filter: [
                  {
                    field: 'regions_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['region_name'],
              },
            ],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
          }),
          selectField({
            label: 'Населённый пункт',
            name: 'city_id',
            //alias: 'city_id',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 3,
            },
            dependence: [
              {
                type: 'default',
                fillField: ['city_name'],
              },
            ],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
            validations: { required },
            bootstrapClass: [''],
            // requiredFields: ['regions_id'],
          }),
          stringField({
            label: 'Адрес Б',
            name: 'end_point',
            placeholder: 'ул., д.',
            class: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required, nameLength },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
          }),
          stringField({
            label: 'Имя региона',
            name: 'region_name',
            placeholder: '',
            notSend: true,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            isShow: {
              value: true,
            },
            // validations: { required, nameLength },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Имя города',
            name: 'city_name',
            placeholder: '',
            notSend: true,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            isShow: {
              value: true,
            },
            // validations: { required, nameLength },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            // action: 'nextStage',
            module: 'form/create',
            url: 'create/unfinished_personal',
            name: 'nextStage',
            action: 'nextStage',
            conditionCode: {
              key: 'code',
              results: [
                {
                  value: 1,
                  type: 'success',
                  toStorage: ['id'],
                },
                {
                  value: 2,
                  type: 'error',
                  text: 'На объект не назначен менеджер',
                },
                {
                  value: 3,
                  type: 'error',
                  text: 'Сотрудник уже есть в системе',
                },
              ],
            },
          }),
        ],
        formData: {},
      },
      {
        id: 1,
        name: 'Документы',
        type: TableDefault,
        active: false,
        config: documentConfig,
        actions: [
          stringAction({
            text: 'Оставить заявку',
            type: 'submit',
            color: 'primary',
            module: 'form/create',
            url: 'query/personal',
            to: 'personal',
            name: 'createForm',
            action: 'createForm',
            skipValidation: true,
            requestBody: {
              store: [
                { requestKey: 'manager_id', storageKey: 'user.user.id' },
                { requestKey: 'personal_id', storageKey: 'formStorage.id' },
              ],
              static: { type_parent_action: 3, parent_action: 1 },
              formData: [
                { requestKey: 'direction_json', formKey: 'direction_id' },
                { requestKey: 'object_json', formKey: 'object_id' },
                'grajdanstvo_id',
                'transfer',
                'start_point',
                'end_point',
                'city_id',
                'regions_id',
                'object_transfer_id',
                'region_name',
                'city_name',
              ],
            },
            conditionCode: {
              key: 'code',
              results: [
                {
                  value: 1,
                  type: 'success',
                  emit: 'closePopup',
                  to: 'personal',
                },
                {
                  value: 2,
                  type: 'error',
                  text: 'Необходимо приложить паспорт',
                },
              ],
            },
            // nextForm: true,
          }),
          stringAction({
            text: 'Вернуться',
            type: 'submit',
            color: 'disabled',
            module: 'form/del',
            url: 'delete/unfinished_personal',
            name: 'prevStage',
            action: 'prevStage',
            // conditionCode: {
            //   key: 'code',
            //   results: [
            //     {
            //       value: 1,
            //       type: 'success',
            //       fromStorage: ['id'],
            //     },
            //   ],
            // },
          }),
        ],
      },
    ],
  },
  {
    id: 11,
    path: 'direction',
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      {
        alias: 'directions_free_personal',
        filter: [
          {
            field: 'personal_id',
            value: '',
            source: '+route.params.id',
            type: 'num',
          },
        ],
        emptyWarning: {
          text: 'Все доступные направления добавлены',
        },
      },
      // 'user_keys',
      // 'habitation_id',
      // 'account_id',
      // 'direction_id',
      // 'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    fields: [
      selectField({
        label: 'Направление',
        name: 'direction_json',
        alias: 'directions_free_personal',
        subtype: 'multiple',
        // subtype: 'multiple',
        placeholder: '',
        notPut: true,
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
        validations: { required },
        bootstrapClass: [''],
        // readonly: true,
        // readonly: {
        //   value: false,
        //   condition: [
        //     editFormPermissions.brigadir,
        //     editFormPermissions.manager[1],
        //     editFormPermissions.rukFIlCUPDirector.denied,
        //     // editFormPermissions.DBA.access,
        //     editFormPermissions.OBDandOKK.denied,
        //   ],
        // },
      }),
    ],
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/putForm',
        name: 'saveForm',
        url: 'update/personal/direction',
        action: 'saveForm',
        color: 'primary',
        // handlingResponse: {
        //   1: {
        //     text: 'Объект привязан',
        //     color: 'success',
        //   },
        //   2: {
        //     text: 'Сотрудник удален',
        //     color: 'error',
        //   },
        //   3: {
        //     text: '',
        //   },
        // },
      }),
    ],
  },
]

export const config = {
  title: 'Персонал',
  activeTab: 2,
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/personal_active',
        title: 'Основные',
        contextMenu: {
          actions: [
            {
              icon: 'mdi-plus',
              label: 'Привязать объект',
              isShow: {
                condition: [
                  {
                    direction_id: [1, 6],
                    type: true,
                  },
                ],
              },
              readonly: {
                value: true,
                condition: [
                  {
                    is_personal_vertical: [true],
                    type: true,
                  },
                  {
                    permission_id: [4],
                    type: false,
                  },
                ],
              },
              action: {
                type: 'changeUrl',
                target: 'id',
                url: 'personal/bind',
              },
            },
            {
              icon: 'mdi-plus',
              label: 'Добавить направ-ие',
              // isShow: {
              //   condition: [
              //     {
              //       direction_id: [1, 6],
              //       type: true,
              //     },
              //   ],
              // },
              readonly: {
                value: false,
                condition: [
                  {
                    is_personal_vertical: [true],
                    type: true,
                  },
                  {
                    permission_id: [13],
                    type: true,
                  },
                ],
              },
              action: {
                type: 'changeUrl',
                target: 'id',
                url: 'personal/direction',
              },
            },
          ],
        },
      },
      type: TableDefault,
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
            label: 'Добавить персонал',
            class: ['v-table-button--custom'],
            type: 'changeUrl',
            url: 'personal-add',
            backgroundColor: '#fff',
            isShow: {
              condition: [
                {
                  permissions: [1],
                  type: true,
                },
              ],
            },
          },
        ],
      },
      head: [
        {
          title: 'id',
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
              type: 'text',
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
              type: 'text',
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
              type: 'text',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
        clearStore: true,
        activeTab: null,
        formData: {},
      },
      filters,
    },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/personal_passive',
        title: 'Пассив',
        contextMenu: {
          actions: [
            {
              icon: 'mdi-plus',
              label: 'Привязать объект',
              isShow: {
                condition: [
                  {
                    direction_id: [1, 6],
                    type: true,
                  },
                ],
              },
              readonly: {
                value: true,
                condition: [
                  {
                    is_personal_vertical: [true],
                    type: true,
                  },
                  {
                    permission_id: [4],
                    type: false,
                  },
                ],
              },
              action: {
                type: 'changeUrl',
                target: 'id',
                url: 'personal/bind',
              },
            },
            {
              icon: 'mdi-plus',
              label: 'Добавить направ-ие',
              // isShow: {
              //   condition: [
              //     {
              //       direction_id: [1, 6],
              //       type: true,
              //     },
              //   ],
              // },
              readonly: {
                value: false,
                condition: [
                  {
                    is_personal_vertical: [true],
                    type: true,
                  },
                  {
                    permission_id: [13],
                    type: true,
                  },
                ],
              },
              action: {
                type: 'changeUrl',
                target: 'id',
                url: 'personal/direction',
              },
            },
          ],
        },
      },
      type: TableDefault,
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            function: consolePanel,
            backgroundColor: '#ffffff',
          },
          // {
          //   label: 'Добавить',
          //   class: ['v-table-button--custom'],
          //   url: '$IconSetting',
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          //{
          //  label: 'Добавить персонал',
          //  class: ['v-table-button--custom'],
          //  function: consolePanel,
          //  backgroundColor: '#fff',
          //},
          //{
          //  label: 'Добавить персонал',
          //  class: ['v-table-button--custom'],
          //  type: 'changeUrl',
          //  url: 'personal-add',
          //  backgroundColor: '#fff',
          //  isShow: {
          //    condition: [
          //      {
          //        permissions: [1],
          //        type: true,
          //      },
          //    ]
          //  }
          //},
        ],
      },
      head: [
        {
          title: 'id',
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
              type: 'text',
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
              type: 'text',
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
              type: 'text',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
        activeTab: null,
      },
      filters,
    },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/personal_archive',
        title: 'Архив',
      },
      type: TableDefault,
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            function: consolePanel,
            backgroundColor: '#ffffff',
          },
        ],
      },
      head: [
        {
          title: 'id',
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
              type: 'text',
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
              type: 'text',
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
              type: 'text',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
        activeTab: null,
      },
      filters,
    },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/personal_on_add',
        title: 'На добавлении',
        noTableAction: true,
      },
      type: TableDefault,
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            function: consolePanel,
            backgroundColor: '#ffffff',
          },
          // {
          //   label: 'Добавить',
          //   class: ['v-table-button--custom'],
          //   url: '$IconSetting',
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
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
          title: 'id',
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
          title: 'Сотрудник',
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
          value: 'personal_name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'personal_status',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Этап',
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
          value: 'task_type_name',
          alias: 'tt.name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'От кого',
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
          value: 'from_account_name',
          alias: 'saf.name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'У кого',
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
          value: 'to_account_name',
          alias: 'sat.name',
          search: {
            field: '',
            isShow: true,
          },
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 20,
        currentPage: 1,
        totalPages: null,
      },
      detail: false,
    },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/user_keys',
        title: 'Личные ключи',
      },
      type: TableDefault,
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
            type: 'changeUrl',
            url: 'personal-add-key',
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
          title: 'Ключ',
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
          alias: 'uk.user_key',
          isShow: true,
          width: '40',
          value: 'user_key',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'uk.fio',
          value: 'fio',
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
          value: 'personal_name',
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
          title: 'Тип',
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
          value: 'is_stager',
          alias: 'uk.is_stager',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '550px',
        method: 'get',
        alias: 'user_keys',
        url: '/get/form/',
        name: 'Личные ключи',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            path: 'add-key',
            id: 8,
            name: 'Добавить ключ',
            type: 'FormDefault',
            detail: true,
            lists: [{ alias: 'objects_personal', filter: [] }],
            fields: [
              autocompleteField({
                label: 'Сотрудник',
                name: 'personal_id',
                alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                updateList: [
                  {
                    alias: 'objects_personal',
                    filter: [
                      {
                        field: 'personal_id',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Объекты',
                name: 'object_id',
                alias: 'objects_personal',
                //subtype: 'multiple',
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
                validations: { required },
                bootstrapClass: [''],
                //readonly: true,
              }),
              dropZoneField({
                label: 'Файл акта',
                name: 'photo_path',
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
                  folder: 'user_keys',
                  name: '`Заявка_ФИО_${form.fields.find((el) => el.name === "personal_id").selectOptionName}_${formData["object_id"]}`',
                  paramsForEmit: this,
                },
                value: [],
              }),
            ],
            actions: [
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/create',
                url: 'query/user_key',
                name: 'saveForm',
                action: 'saveFormStore',
              }),
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'textDefault',
                name: 'closePopup',
                action: 'closePopup',
                to: 'personal',
                skipValidation: true,
              }),
            ],
          },
          {
            path: 'edit',
            id: 9,
            name: 'Добавить ключ',
            type: 'FormDefault',
            alias: 'user_keys',
            detail: true,
            lists: [
              {
                alias: 'objects_personal',
                filter: [
                  {
                    field: 'personal_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            fields: [
              stringField({
                label: 'Ключ',
                name: 'user_key',
                // alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                // TODO: Поменять на другое
                // url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                // dependence: [
                //   {
                //     //fields: ['statement_card', 'cardowner'],
                //     type: 'api',
                //     module: 'personal/getObject',
                //     //url: 'object_id/avatar_with_user_key_id',
                //     field: 'object_id',
                //     url: [
                //       {
                //         source: 'formData',
                //         field: 'this',
                //       },
                //     ],
                //   },
                // ],
              }),
              stringField({
                label: 'ФИО',
                name: 'fio',
                // alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                // TODO: Поменять на другое
                // url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                // dependence: [
                //   {
                //     //fields: ['statement_card', 'cardowner'],
                //     type: 'api',
                //     module: 'personal/getObject',
                //     //url: 'object_id/avatar_with_user_key_id',
                //     field: 'object_id',
                //     url: [
                //       {
                //         source: 'formData',
                //         field: 'this',
                //       },
                //     ],
                //   },
                // ],
              }),
              autocompleteField({
                label: 'Сотрудник',
                name: 'personal_id',
                alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                updateList: [
                  {
                    alias: 'objects_personal',
                    filter: [
                      {
                        field: 'personal_id',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Объекты',
                name: 'object_id',
                alias: 'objects_personal',
                //subtype: 'multiple',
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
                validations: { required },
                bootstrapClass: [''],
                //readonly: true,
              }),
              checkboxField({
                label: 'Стажерская',
                name: `is_stager`,
                subtype: 'single',
                toNumber: true,
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                aliasFilter: '',
              }),
            ],
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'textDefault',
                name: 'closePopup',
                action: 'closePopup',
                to: 'personal',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/update',
                name: 'saveForm',
                url: 'set/data/user_keys',
                action: 'saveForm',
                color: 'primary',
              }),
            ],
          },
        ],
        activeTab: null,
      },
      filters: filtersKey,
    },
  ],
}

// export default { config, defaultForm }
