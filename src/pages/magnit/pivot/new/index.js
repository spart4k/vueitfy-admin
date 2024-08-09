import filters from './filters'
import formMagnitZayavka from './config/form-magnit-zayavka.js'

export const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: null,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/request_magnit_new',
    title: 'Новые',
    doubleHandlerType: 'cell',
  },
  type: 'TableFixed',
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Парсер заявка',
        class: ['v-table-button--custom'],
        url: 'magnit_pivot-zayavka',
        type: 'changeUrl',
        backgroundColor: '#fff',
        isShow: {
          condition: [
            {
              permissions: [3, 4, 8, 17],
              type: true,
            },
          ],
        },
      },
    ],
    filters: true,
    search: true,
    date: true,
    addedItemsChildrenType: 'object',
  },
  head: [
    {
      id: 1,
      title: 'Менеджер',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'sam.name',
      value: 'manager',
      fixed: {
        value: true,
        position: 'left',
      },
      search: {
        field: '',
        isShow: true,
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      click: undefined,
      routeParam: 'account_id',
      routeName: 'magnit_pivot-account',
    },
    {
      id: 2,
      title: 'Объект',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'o.name',
      value: 'object_name',
      fixed: {
        value: true,
        position: 'left',
      },
      search: {
        field: '',
        isShow: true,
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      click: undefined,
      routeParam: 'object_id',
      routeName: 'magnit_pivot-object',
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
    width: '800px',
    method: 'get',
    alias: 'personal',
    url: '/get/form/',
    name: 'Выработка X5',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [formMagnitZayavka],
    activeTab: null,
  },
  filters,
}

export default config
