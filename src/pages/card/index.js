import filters from './filters'
import _ from 'lodash'

import formCardAddEdit from './config/form-card-add-edit'
import tableCardHistory from './config/table-card-history'
import formCardGive from './config/form-card-give'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

export const config = {
  title: 'Корпоративные карты',
  activeTab: 0,
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/corp_card',
        title: 'Активные',
        contextMenu: {
          actions: [
            {
              icon: 'mdi-plus',
              label: 'Выдать',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 16],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.store.state.user.id ===
                        context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'toRoute',
                url: 'personal',
                routeName: 'corporate-cards/:card_id',
                routeParam: 'id',
                routeTarget: 'card_id',
              },
            },
            {
              icon: 'mdi-minus-thick',
              label: 'Изъять',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 16],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.data.row.account_id !== 0 &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете изъятие карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: 'update/bank/remove_assign',
                      body: { data: { card_id: context.data.row.id } },
                    })
                  },
                },
              },
            },
            {
              icon: 'mdi-cancel',
              label: 'Заблокировать',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 12, 16],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.data.row.status_id !== 2 &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете блокировку карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: `update/corp_card/block/${context.data.row.id}`,
                      body: { data: { is_block: true } },
                    })
                  },
                },
              },
            },
            {
              icon: 'mdi-lock-open',
              label: 'Разблокировать',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 12, 16],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.data.row.status_id === 2 &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете разблокировку карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: `update/corp_card/block/${context.data.row.id}`,
                      body: { data: { is_block: false } },
                    })
                  },
                },
              },
            },
            {
              icon: 'mdi-history',
              label: 'История',
              isShow: true,
              action: {
                type: 'toRoute',
                url: 'personal',
                routeName: 'corporate-cards/:history_id',
                routeParam: 'id',
                routeTarget: 'history_id',
              },
            },
            {
              icon: '$IconDelete',
              label: 'Удалить',
              color: 'error',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 12, 16],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        !context.data.row.is_archive &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете удаление карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: `update/corp_card/archive/${context.data.row.id}`,
                      body: { data: { is_archive: true } },
                    })
                  },
                },
              },
            },
            {
              icon: 'mdi-restore',
              label: 'Восстановить',
              color: 'success',
              isShow: {
                condition: [
                  {
                    permissions: [4],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.data.row.is_archive &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете восстановление карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: `update/corp_card/archive/${context.data.row.id}`,
                      body: { data: { is_archive: false } },
                    })
                  },
                },
              },
            },
          ],
        },
      },
      type: 'TableDefault',
      panel: {
        buttons: [
          {
            // label: 'Сменить компонент',
            class: ['v-table-button--custom'],
            icon: 'mdi-view-grid',
            type: 'changeComp',
            backgroundColor: '#fff',
          },
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
            url: 'corporate-cards/add',
            type: 'changeUrl',
            backgroundColor: '#fff',
          },
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
          width: '90',
          alias: 'cc.id',
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
          alias: 'scc.name',
          width: '40',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Кому выдана',
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
          alias: 'sa.name',
          width: '40',
          value: 'account_name',
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
          alias: 'b.name',
          width: '40',
          value: 'bank_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Организация',
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
          alias: 'cc.org',
          width: '40',
          value: 'org',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Номер карты',
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
          alias: 'cc.num',
          width: '40',
          value: 'num',
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
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          alias: 'sas.name',
          width: '40',
          value: 'from_account_name',
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
          alias: 'cc.note',
          width: '40',
          value: 'note',
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
        classes: [''], // List class
        width: '900px',
        method: 'get',
        alias: 'payment',
        url: '/get/form/',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          _.cloneDeep(formCardAddEdit),
          _.cloneDeep(formCardAddEdit),
          tableCardHistory,
          formCardGive,
        ],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
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
        url: 'get/pagination/corp_card_archive',
        title: 'Архив',
        contextMenu: {
          actions: [
            {
              icon: 'mdi-history',
              label: 'История',
              isShow: true,
              action: {
                type: 'toRoute',
                url: 'personal',
                routeName: 'corporate-cards/:history_id',
                routeParam: 'id',
                routeTarget: 'history_id',
              },
            },
            {
              icon: 'mdi-restore',
              label: 'Восстановить',
              color: 'success',
              isShow: {
                condition: [
                  {
                    permissions: [4],
                    type: true,
                  },
                  {
                    funcCondition: (context) => {
                      return (
                        context.data.row.is_archive &&
                        context.store.state.user.id ===
                          context.data.row.from_account_id
                      )
                    },
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете восстановление карты?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: `update/corp_card/archive/${context.data.row.id}`,
                      body: { data: { is_archive: false } },
                    })
                  },
                },
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
            label: 'Сменить компонент',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            type: 'changeComp',
            backgroundColor: '#fff',
          },
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
          width: '90',
          alias: 'cc.id',
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
          alias: 'scc.name',
          width: '40',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Кому выдана',
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
          alias: 'sa.name',
          width: '40',
          value: 'account_name',
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
          alias: 'b.name',
          width: '40',
          value: 'bank_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Организация',
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
          alias: 'cc.org',
          width: '40',
          value: 'org',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Номер карты',
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
          alias: 'cc.num',
          width: '40',
          value: 'num',
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
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          alias: 'sas.name',
          width: '40',
          value: 'from_account_name',
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
          alias: 'cc.note',
          width: '40',
          value: 'note',
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
        classes: [''], // List class
        width: '900px',
        method: 'get',
        alias: 'payment',
        url: '/get/form/',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [_.cloneDeep(formCardAddEdit), tableCardHistory, formCardGive],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
  ],
}

export default config
