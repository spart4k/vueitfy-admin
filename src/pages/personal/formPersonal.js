import FormDefault from '@/components/form/default/index.vue'
import { stringAction } from '@/utils/actions'
import { required, nameLength } from '@/utils/validation.js'
import TableDefault from '@/components/Table/default/index.vue'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textBlock,
  textareaField,
  dropZoneField,
} from '@/utils/fields.js'

import FormDocuments from '@/components/form/documents/default/index.vue'

const editFormPermissions = {
  // Бригадир(id = 13) - все readonly
  brigadir: {
    permissions: [13],
    type: true,
  },
  //  Менеджер(id = 1) - если направление логистика, то может менять доступ, остальное readonly, если направление розница, то все поля readonly
  manager: [
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [1],
      type: false,
    },
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [2],
      type: true,
    },
  ],
  //  Рук. фил.(id = 15), ЦУП(id = 2), Директор(id = 3) - может менять телефон, доступ, остальное readonly
  rukFIlCUPDirector: {
    access: {
      permissions: [15, 2, 3],
      type: false,
    },
    denied: {
      permissions: [15, 2, 3],
      type: true,
    },
  },
  DBA: {
    access: {
      permissions: [4],
      type: false,
    },
    denied: {
      permissions: [4],
      type: true,
    },
  },
  OBDandOKK: {
    access: {
      permissions: [7, 8],
      type: false,
    },
    denied: {
      permissions: [7, 8],
      type: true,
    },
  },
}

const skanConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    urlDetail: 'personal_id',
    alias: 'pd.personal_id',
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
        url: '$IconSetting',
        function: consolePanel,
        backgroundColor: '#fff',
      },
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
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата назн',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'date_target',
      alias: 'p.date_target',
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'personal_name',
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
      isShow: true,
      width: '150',
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
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
      title: 'Должность',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'd.name',
      value: 'doljnost_name',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.total',
      value: 'total',
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
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
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
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const bankConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_bank',
    urlDetail: 'personal_id',
    alias: 'pb.personal_id',
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
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Приоритет',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'boolean',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'date_target',
      alias: 'p.date_target',
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
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'bank_name',
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'o.name',
      value: 'invoice',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Карта на ФИО',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'fio',
      alias: 'p.hour',
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
        position: undefined,
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
      alias: 'd.name',
      value: 'comment',
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
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
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
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const paymentConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_target_doc',
    urlDetail: 'personal_id',
    alias: 'p.personal_id',
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
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата назн',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'date_target',
      alias: 'p.date_target',
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'personal_name',
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
      isShow: true,
      width: '150',
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
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
      title: 'Должность',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'd.name',
      value: 'doljnost_name',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.total',
      value: 'total',
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
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
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
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const consumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/payment',
    urlDetail: 'personal_id',
    alias: 'p.personal_id',
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
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата назн',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'date_target',
      alias: 'p.date_target',
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'personal_name',
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
      isShow: true,
      width: '150',
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
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
      title: 'Должность',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'd.name',
      value: 'doljnost_name',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.total',
      value: 'total',
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
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
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
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const debetorConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_debit',
    urlDetail: 'personal_id',
    alias: 'd.debtor_id',
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
      title: 'ID',
      type: 'default',
      align: 'center',
      fixed: {
        value: true,
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
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата назн',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'date_target',
      alias: 'p.date_target',
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'personal_name',
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
      isShow: true,
      width: '150',
      alias: 'o.name',
      value: 'object_name',
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
          type: 'number',
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
      title: 'Должность',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
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
      alias: 'd.name',
      value: 'doljnost_name',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.total',
      value: 'total',
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
      isShow: true,
      width: '100',
      value: 'actions',
      actions: [
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
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
  },
  detail: undefined,
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const documentConfigEdit = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    alias: 'personal_id',
    title: 'This is an about page1',
  },
  type: TableDefault,
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
        url: 'personal/:id/new',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
        backgroundColor: '#fff',
      },
    ],
  },
}

function consoleText(row) {
  console.log(row, 2)
  //return 'test'
}

function consoleButton(row) {
  console.log(row, 1)
}

function consolePanel() {
  console.log('panel,button')
}
function searchInputing(field) {
  console.log(field)
}

const formPersonal = [
  {
    id: 0,
    path: 'edit',
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      { alias: 'user_keys', filter: [] },
      { alias: 'habitation_id', filter: [] },
      { alias: 'account_id', filter: [] },
      { alias: 'direction_id', filter: [] },
      { alias: 'grajdanstvo_id', filter: [] },
      // 'user_keys',
      // 'habitation_id',
      // 'account_id',
      // 'direction_id',
      // 'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    fields: [
      stringField({
        label: 'ФИО',
        name: 'name',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      stringField({
        label: 'Телефон',
        name: 'telefon',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.access,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      selectField({
        label: 'Гражданство',
        name: 'status',
        alias: 'grajdanstvo_id',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      stringField({
        label: 'Примечание',
        name: 'comment',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      dateField({
        label: ' Дата рождения',
        name: 'data_rojd',
        subtype: 'date',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: ['changeSelect'],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      selectField({
        label: 'Личный ключ',
        name: 'user_key',
        subtype: 'multiselect',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        //validations: { required },
        bootstrapClass: [''],
        readonly: true,
        //readonly: {
        //  value: false,
        //  condition: [
        //    editFormPermissions.brigadir,
        //    editFormPermissions.manager[1],
        //    editFormPermissions.rukFIlCUPDirector.denied,
        //    editFormPermissions.DBA.access,
        //    editFormPermissions.OBDandOKK.access,
        //  ],
        //},
      }),
      selectField({
        label: 'Направление',
        name: 'direction_json',
        alias: 'direction_id',
        subtype: 'multiselect',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.denied,
          ],
        },
      }),
      selectField({
        label: 'Доступ',
        name: 'account_json',
        alias: 'account_id',
        subtype: 'multiselect',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            ...editFormPermissions.manager,
            editFormPermissions.rukFIlCUPDirector.access,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.denied,
          ],
        },
      }),
      selectField({
        label: 'Проживание',
        name: 'habitation_id',
        alias: 'direction_json',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [],
        position: {
          cols: 12,
          sm: 6,
        },
        defaultItems: [
          {
            id: 11,
            name: '--Самостоятельное--',
            bank_id: 11,
          },
        ],
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.denied,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      checkboxField({
        label: 'Штатный',
        name: 'in_state',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
    ],
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ],
  },
  {
    id: 2,
    path: 'edit',
    name: 'Данные документов',
    type: FormDocuments,
    detail: true,
    lists: [
      'user_keys',
      'habitation_id',
      'account_id',
      'direction_id',
      'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    documents: [
      {
        type: 'passport',
        name: 'Паспорт',
        fields: [
          stringField({
            label: 'Серия',
            name: 'seriya',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
          stringField({
            label: 'Номер',
            name: 'number',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
          stringField({
            label: 'К/П',
            name: 'code',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
          dateField({
            label: 'Дата выдачи',
            name: 'date_issue',
            subtype: 'date',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: ['changeSelect'],
          }),
          stringField({
            label: 'Кем выдан',
            name: 'issued_by',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
        ],
      },
      {
        type: 'Snils',
        name: 'Снилс',
        fields: [
          stringField({
            label: 'Номер',
            name: 'name',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
        ],
      },
      {
        type: 'passport_page_2',
        name: 'Паспорт стр.2',
        fields: [
          stringField({
            label: 'Адрес регистрации',
            name: 'issued_by',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
        ],
      },
      {
        type: 'inn',
        name: 'ИНН',
        fields: [
          stringField({
            label: 'Адрес регистрации',
            name: 'issued_by',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
        ],
      },
    ],
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'disabled',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ],
  },
  {
    path: 'edit',
    id: 3,
    name: 'Сканы',
    type: TableDefault,
    active: false,
    config: documentConfigEdit,
  },
  {
    path: 'edit',
    id: 7,
    name: 'Банковские карты',
    type: TableDefault,
    active: false,
    config: bankConfig,
  },
  {
    path: 'edit',
    id: 4,
    name: 'Начисления и выплаты',
    type: TableDefault,
    active: false,
    config: paymentConfig,
  },
  {
    path: 'edit',
    id: 1,
    name: 'Расход',
    type: TableDefault,
    active: false,
    config: consumptionConfig,
  },
  {
    path: 'edit',
    id: 6,
    name: 'Задолженность',
    type: TableDefault,
    active: false,
    config: debetorConfig,
  },
]

export default formPersonal
