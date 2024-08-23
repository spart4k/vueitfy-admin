import filters from './filters'
import buttonArchive from './config/button-archive'

function consoleText(row) {}

function consoleButton(row) {}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {},
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/report_magnit',
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
      buttonArchive,
      {
        label: 'Отчет',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        backgroundColor: '#fff',
        type: 'sendPage',
        requestUrl: 'report/magnit/revise',
      },
    ],
  },
  head: [
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
      alias: 'srm.status',
      isShow: true,
      width: '40',
      value: 'status_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'На дату',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'srm.date_request',
      value: 'date_request',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'В работе у',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
      },
      sorts: [
        {
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'sy.name',
      value: 'account_name',
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
      value: 'personal_name',
      alias: 'pers.name',
      search: {
        field: '',
        isShow: true,
      },
    },
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
      alias: 'f.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Округ',
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
      value: 'district_name',
      alias: 'gd.name',
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
      title: 'Должность',
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
      value: 'doljnost_name',
      alias: 'd.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы(факт)',
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
      alias: 'p.hour_fact',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Часы',
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
      value: 'hour',
      alias: 'p.hour',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Разница часов',
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
      value: 'different_hour',
      alias: 'IF(p.del = 0, (srm.hour - p.hour), srm.hour)',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Файл акта',
      type: 'download',
      align: 'center',
      actionCondition: false,
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
      value: 'path_act',
      alias: 'srm.path_act',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          funcCondition: (context) => {
            return context.row.row.path_act
          },
          type: 'button',
          url: '$IconDownload',
          method: (context) => {
            context.Vue.downloadFile(context.row.row.path_act)
          },
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
  detail: null,
  filters,
}

export default config
