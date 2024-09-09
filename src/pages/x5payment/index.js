import _ from 'lodash'

export const config = {
  title: 'Замены X5',
  selector: '#mainTable',
  type: 'TableDefault',
  options: {
    selecting: true,
    search: {
      //   function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/x5_payment_change',
    title: 'Замены X5',
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
      // {
      //   label: 'Добавить',
      //   class: ['v-table-button--custom'],
      //   type: 'changeUrl',
      //   url: 'mvd/add',
      //   backgroundColor: '#fff',
      // },
    ],
  },
  head: [
    // {
    //   title: 'id',
    //   type: 'default',
    //   align: 'center',
    //   fixed: {
    //     value: false,
    //     position: 'left',
    //   },
    //   sorts: [
    //     {
    //       type: 'text',
    //       default: '',
    //       value: '',
    //       isShow: false,
    //     },
    //   ],
    //   isShow: true,
    //   width: '20',
    //   alias: 'id',
    //   value: 'id',
    //   search: {
    //     field: '',
    //     isShow: true,
    //   },
    // },
    {
      title: 'Аккаунт',
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
      title: 'Старый вид ведомости',
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
      alias: 'vpt.name',
      value: 'old_vid_vedomost',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Новый вид ведомости',
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
      alias: 'vx.name',
      value: 'new_vid_vedomost',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Номер счета',
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
      alias: 'x.invoice',
      value: 'invoice',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата изменения',
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
      alias: 'x.date_change',
      value: 'date_change',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)",
      value: 'personal_name',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'b.name',
      value: 'bank_name',
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
}

export default config
