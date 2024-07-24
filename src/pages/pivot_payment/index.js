import filters from './filters'
import formPaymentOutput from './config/form-payment-output.js'

function changeSort(config) {
  let btn = config.panel.buttons.find((x) => x.subtype === 'changeHeads')
  let heading = config.head.find((x) => x.changeable)
  if (btn.typeLabel === 'Объекты') {
    btn.typeLabel = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot_retail-object'
    heading.routeParam = 'object_id'
    // heading.click = {
    //   condition: {
    //     permissions: [12, 22],
    //     type: false,
    //   },
    // }
    heading.click = undefined
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/payment_object_retail'
  } else if (btn.typeLabel === 'ФИО') {
    btn.typeLabel = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)"
    heading.value = 'fio'
    heading.routeName = 'pivot_retail-personal'
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
    search: {},
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/payment_personal_retail',
    title: 'This is an about page1',
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
      {
        label: 'Парсер Х5',
        class: ['v-table-button--custom'],
        url: 'pivot_payment-output',
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
      title: 'ФИО',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)",
      value: 'fio',
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
      click: undefined,
      routeParam: 'personal_id',
      routeName: 'pivot_retail-personal',
    },
    {
      id: 2,
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
      routeName: 'pivot_retail-account',
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
    name: 'Табель розница',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [formPaymentOutput],
    activeTab: null,
  },
  filters,
}

export default config
