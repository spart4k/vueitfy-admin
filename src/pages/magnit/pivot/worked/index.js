import filters from './filters'

function changeSort(config) {
  let heading = config.head.find((x) => x.changeable)
  if (heading.title === 'Линейщик') {
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot_payment-object'
    heading.routeParam = 'object_id'
    heading.click = undefined
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/request_magnit_object'
  } else if (heading.title === 'Объект') {
    heading.title = 'Линейщик'
    heading.alias = "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)"
    heading.value = 'personal_name'
    heading.routeName = 'pivot_payment-personal'
    heading.routeParam = 'personal_id'
    heading.click = undefined
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/request_magnit_personal'
  }
}

export const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: null,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/request_magnit_personal',
    title: 'Отработанные',
    // doubleHandlerType: 'cell',
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
        label: '',
        class: ['v-table-button--custom'],
        typeLabel: 'Объекты',
        url: '$IconUpdate',
        function: changeSort,
        backgroundColor: '#ffffff',
        type: 'refresh',
        subtype: 'changeHeads',
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
      routeParam: 'account_id',
      routeName: 'pivot_payment-account',
    },
    {
      id: 2,
      title: 'Линейщик',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)",
      value: 'personal_name',
      changeable: true,
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
    tabs: [],
    activeTab: null,
  },
  filters,
}

export default config
