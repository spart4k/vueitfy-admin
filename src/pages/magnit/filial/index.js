import filters from './filters'

function consoleText(row) {}

function consoleButton(row) {}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {},
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/report_filial',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        backgroundColor: '#ffffff',
      },
    ],
    date: true,
  },
  head: [
    {
      title: 'Филиал',
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
      value: 'filial_name',
      alias: 'ofs.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Подтип',
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
      value: 'subtype_name',
      alias: 'os.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы план',
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
      value: 'hour_plan',
      alias: 'IF(r.hour_plan IS NULL, 0, r.hour_plan)',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы факт',
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
      value: 'hour_fact',
      alias: 'IF(r.hour_fact IS NULL, 0, r.hour_fact)',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы после вычета',
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
      value: 'total_hour',
      alias: 'IF(r.hour IS NULL, 0, r.hour)',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'total_sum',
      alias: 'IF(r.total IS NULL, 0, r.total)',
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
  detail: null,
  filters: null,
}

export default config
