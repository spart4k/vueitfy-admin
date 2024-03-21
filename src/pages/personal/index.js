import filters from './filters'
import filtersKey from './filtersKey'

import { stringAction } from '@/utils/actions'
import _ from 'lodash'

import tablePersonalOverpayments from './config/table-personal-overpayments.js'
import tablePersonalDebt from './config/table-personal-debt.js'
import tablePersonalBank from './config/table-personal-bank.js'
import tablePersonalScan from './config/table-personal-scan.js'
import formPersonalDocs from './config/form-personal-docs.js'
import formPersonalEdit from './config/form-personal-edit.js'
import formPersonalAdd from './config/form-personal-add.js'

import formKeyAdd from './config/form-key-add.js'
import formKeyEdit from './config/form-key-edit.js'

import formBind from './config/form-bind.js'
import formLoad from './config/form-load.js'

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

const nonExportTabs = [formLoad, formBind, formPersonalAdd]

export const personalTabs = [
  formPersonalEdit,
  formPersonalDocs,
  tablePersonalScan,
  tablePersonalBank,
  tablePersonalDebt,
  tablePersonalOverpayments,
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
      type: 'TableDefault',
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
        tabs: [...personalTabs, ...nonExportTabs],
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
      type: 'TableDefault',
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
        tabs: [...personalTabs, ...nonExportTabs],
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
      type: 'TableDefault',
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
        tabs: [...personalTabs, ...nonExportTabs],
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
      type: 'TableDefault',
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
      type: 'TableDefault',
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
        tabs: [formKeyAdd, formKeyEdit],
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
