import filters from './filters'
import formMagnitZayavka from './config/form-magnit-zayavka.js'

function changeSort(config) {
  let btn = config.panel.buttons.find((x) => x.subtype === 'changeHeads')
  let heading = config.head.find((x) => x.changeable)
  if (btn.typeLabel === 'Объекты') {
    btn.typeLabel = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot_payment-object'
    heading.routeParam = 'object_id'
    heading.click = undefined
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/payment_object_retail'
  } else if (btn.typeLabel === 'ФИО') {
    btn.typeLabel = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)"
    heading.value = 'fio'
    heading.routeName = 'pivot_payment-personal'
    heading.routeParam = 'personal_id'
    heading.click = undefined
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/payment_personal_retail'
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
    url: 'get/pagination_pivot/request_magnit_new',
    title: 'Новые',
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
      routeParam: 'account_id',
      routeName: 'pivot_payment-account',
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
