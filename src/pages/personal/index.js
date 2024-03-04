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
// import FormDocuments from '@/components/Form/documents/default/index.vue'
// import FormList from '@/components/Form/list/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import _ from 'lodash'

import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'

import formPersonalAdd from './config/form-personal-add.js'
import formLoad from './config/form-load.js'
import tablePersonalOverpayments from './config/table-personal-overpayments.js'
import tablePersonalDebt from './config/table-personal-debt.js'
import tablePersonalBank from './config/table-personal-bank.js'
import tablePersonalScan from './config/table-personal-scan.js'
import formPersonalDocs from './config/form-personal-docs.js'
import formBind from './config/form-bind.js'
import formPersonalEdit from './config/form-personal-edit.js'

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
zayavkaConfig.head.push(headDateCreate)

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

// Convert zayavka view
zayavkaConfig.detail.popupIndex = 2
zayavkaConfig.detail.requestId = 'zayavka'
const editTabZayavka = zayavkaConfig.detail.tabs.find((el) => el.path === 'id')
editTabZayavka.path = 'edit-zayavka'
editTabZayavka.routeParam = 'edit-zayavka'

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
function searchInputing(field) {
  console.log(field)
}

export const defaultForm = [
  formLoad,
  formBind,
  formPersonalEdit,
  formPersonalDocs,
  tablePersonalScan,
  tablePersonalBank,
  {
    path: 'edit',
    id: 4,
    name: 'Начисления и выплаты',
    type: TableDefault,
    active: false,
    config: paymentConfig,
    isShow: {
      value: true,
      condition: [
        {
          permissions: [16, 19],
          type: false,
        },
      ],
    },
  },
  {
    path: 'edit',
    id: 1,
    name: 'Расход',
    type: TableDefault,
    active: false,
    config: zayavkaConfig,
  },
  tablePersonalDebt,
  tablePersonalOverpayments,
  formPersonalAdd,
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
              isShow: {
                value: true,
                condition: [
                  {
                    permissions: [16, 19],
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
          ],
          isShow: {
            value: true,
            condition: [
              {
                permissions: [16, 19],
                type: false,
              },
            ],
          },
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
      isShow: {
        value: true,
        condition: [
          {
            permissions: [16, 19],
            type: false,
          },
        ],
      },
      filters: filtersKey,
    },
  ],
}

// export default { config, defaultForm }
