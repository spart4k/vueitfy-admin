import filters from './filters'
import formTaxiEdit from './config/form-taxi-edit.js'
import _ from 'lodash'

const config = {
  title: 'Такси',
  activeTab: 0,
  tabs: [
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableDefault',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/taxi',
        title: 'Таблица',
      },
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            // function: consolePanel,
            backgroundColor: '#ffffff',
          },
        ],
        date: true,
      },
      head: [
        {
          title: 'Менеджер',
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
          alias: 'sy.name',
          value: 'account_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Дата',
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
          alias: 't.date',
          value: 'date',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Время с',
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
          alias: 't.time_from',
          value: 'time_from',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Время по',
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
          alias: 't.time_to',
          value: 'time_to',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Тариф',
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
          alias: 'tt.name',
          value: 'tarif',
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
          alias: 't.price',
          value: 'price',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Оплата',
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
          alias: 't.card',
          value: 'card',
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
        width: '1000px',
        method: 'get',
        alias: 'documents',
        url: '/get/form/',
        name: 'Такси',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [formTaxiEdit],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableFixed',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination_pivot/taxi_target',
        title: 'Табель',
        doubleHandlerType: 'cell',
      },
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            // function: consolePanel,
            backgroundColor: '#ffffff',
          },
        ],
        search: true,
        filters: true,
        date: true,
        addedItemsChildrenType: 'object',
      },
      head: [
        {
          title: 'Менеджер',
          type: 'default',
          align: 'center',
          fixed: {
            value: true,
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
          width: '150',
          alias: 'sy.name',
          value: 'name_telephone',
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
        width: '1000px',
        method: 'get',
        alias: 'documents',
        url: '/get/form/',
        name: 'Такси',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [formTaxiEdit],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
  ],
}

export default config
