import filters from './filters'

import formDocumentsQuery from './config/form-documents-query.js'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

export const documentTabs = [formDocumentsQuery]

const buttonsMixin = [
  {
    // route: 'query',
    label: 'Запросить документы',
    class: ['v-table-button--custom'],
    type: 'changeUrl',
    function: consolePanel,
    url: 'documents/query',
    backgroundColor: '#fff',
  },
]

const config = {
  title: 'Персонал',
  // activeTab: activeTab,
  bindField: [
    {
      field: 'grajdanstvo_id',
      targetForm: 'query',
    },
  ],
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/documents_new',
        title: 'Новые',
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
        ],
      },
      head: [
        {
          title: 'ФИО',
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
          alias: 'p.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Объект',
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
        //   width: '90',
        //   alias: 'ob.name',
        //   value: 'object_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        {
          title: 'Гражданство',
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
          alias: 'g.name',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          sorts: [],
          isShow: true,
          width: '90',
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт 2',
          type: 'icon',
          icon: '$IconPassport2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.pasport_2',
          value: 'pasport_2',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          conditionValue: 'registration_date_c_docs_in',
          backgroundValue: 'need_reg',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.invoice',
          value: 'invoice',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ИНН',
          type: 'icon',
          icon: '$IconInn',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.inn',
          value: 'inn',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Экзамен РФ',
          type: 'icon',
          icon: '$IconRf',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.exam_rf',
          value: 'exam_rf',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мед. карта',
          type: 'icon',
          icon: '$IconMedicalBook',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.med_card',
          value: 'med_card',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Перевод',
          type: 'icon',
          icon: '$IconPerevod',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.translate',
          value: 'translate',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ДМС',
          type: 'icon',
          icon: '$IconDmc',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.dms',
          value: 'dms',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мед. осмотр',
          type: 'icon',
          icon: '$IconMedOsmotr',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.med_view',
          value: 'med_view',
          conditionValue: 'med_view_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент',
          type: 'icon',
          icon: '$IconPatent',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.patent',
          value: 'patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент 2',
          type: 'icon',
          icon: '$IconPatent2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.patent_2',
          value: 'patent_2',
          backgroundColor: 'need_patent',
          conditionValue: 'patent_date_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент первичный',
          type: 'icon',
          icon: '$IconCheckPoten',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.check_patent',
          value: 'check_patent',
          conditionValue: 'check_patent_date_pay',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент текущий',
          type: 'icon',
          icon: '$IconCheckPoten',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.check_patent_2',
          value: 'check_patent_2',
          conditionValue: 'check_patent_date_pay_now',
          backgroundValue: 'need_check_patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Дактилоскопия',
          type: 'icon',
          icon: '$IconFinger',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.cartdact',
          value: 'cartdact',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Дактилоскопия 2',
          type: 'icon',
          icon: '$IconFinger2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.cartdact_2',
          value: 'cartdact_2',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Действия',
          type: 'actions',
          align: 'center',
          fixed: {
            value: false,
            position: 'right',
          },
          sorts: [],
          isShow: true,
          width: '100',
          value: 'actions',
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 20,
        currentPage: 1,
        totalPages: null,
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'documents',
        url: '/get/form/',
        name: 'Запросить документы',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...documentTabs],
        activeTab: null,
      },
      filters,
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
        url: 'get/pagination/documents_eaes',
        title: 'ЕАЭС',
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
          ...buttonsMixin,
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
        ],
      },
      head: [
        {
          title: 'ФИО',
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
          alias: 'p.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Объект',
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
        //   width: '90',
        //   alias: 'ob.name',
        //   value: 'object_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        {
          title: 'Гражданство',
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
          alias: 'g.name',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          backgroundValue: 'need_red',
          conditionValue: 'registration_date_c_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.invoice',
          value: 'invoice',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'documents',
        url: '/get/form/',
        name: 'Запросить документы',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...documentTabs],
        activeTab: null,
      },
      filters,
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
        url: 'get/pagination/documents_dont_res',
        title: 'Нерезиденты',
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
          ...buttonsMixin,
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
        ],
      },
      head: [
        {
          title: 'ФИО',
          type: 'default',
          align: 'center',
          wrapLink: true,
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
          alias: 'p.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Объект',
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
        //   width: '90',
        //   alias: 'ob.name',
        //   value: 'object_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        {
          title: 'Гражданство',
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
          alias: 'g.name',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          idth: '90',
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          conditionValue: 'registration_date_c_docs_in',
          backgroundValue: 'need_red',
          arch: {
            ield: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.invoice',
          value: 'invoice',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент',
          type: 'icon',
          icon: '$IconPatent',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.patent',
          value: 'patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент 2',
          type: 'icon',
          icon: '$IconPatent2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.patent_2',
          backgroundColor: 'need_patent',
          value: 'patent_2',
          conditionValue: 'patent_date_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент первичный',
          type: 'icon',
          icon: '$IconCheckPoten',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.check_patent',
          value: 'check_patent',
          conditionValue: 'check_patent_date_pay',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент текущий',
          type: 'icon',
          icon: '$IconCheckPoten',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.check_patent_2',
          value: 'check_patent_2',
          conditionValue: 'check_patent_date_pay_now',
          backgroundValue: 'need_check_patent',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'documents',
        url: '/get/form/',
        name: 'Запросить документы',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...documentTabs],
        activeTab: null,
      },
      filters,
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
        url: 'get/pagination/documents_rf',
        title: 'РФ',
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
          ...buttonsMixin,
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
        ],
      },
      head: [
        {
          title: 'ФИО',
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
          alias: 'p.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'status_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Объект',
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
        //   width: '90',
        //   alias: 'ob.name',
        //   value: 'object_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        {
          title: 'Гражданство',
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
          alias: 'g.name',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт 2',
          type: 'icon',
          icon: '$IconPassport2',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.pasport_2',
          value: 'pasport_2',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: 'text',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ИНН',
          type: 'icon',
          icon: '$IconInn',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.inn',
          value: 'inn',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'СНИЛС',
          type: 'icon',
          icon: '$IconSnils',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [],
          // sorts: [
          //   {
          //     type: '',
          //     default: '',
          //     value: '',
          //     isShow: false,
          //   },
          // ],
          isShow: true,
          width: '90',
          alias: 'p.snils',
          value: 'snils',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Запросить документы',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...documentTabs],
        activeTab: null,
      },
      filters,
    },
  ],
}

export default config
