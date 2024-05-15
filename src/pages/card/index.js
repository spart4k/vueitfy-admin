import filters from './filters'

import formCardAddEdit from './config/form-card-add-edit'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

export const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/corp_card',
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
        url: 'corporate-cards/add',
        type: 'changeUrl',
        backgroundColor: '#fff',
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
      alias: 'pers.name',
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
      alias: 'sac.name',
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
      alias: 'sac.name',
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
      alias: 'sac.name',
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
      alias: 'sac.name',
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
      alias: 'sac.name',
      width: '40',
      value: 'num',
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
      alias: 'sac.name',
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
    tabs: [formCardAddEdit, Object.assign({}, formCardAddEdit)],
    activeTab: null,
  },
  filters,
}

export default config
