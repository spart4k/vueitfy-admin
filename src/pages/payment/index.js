import filters from './filters'
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { stringAction } from '@/utils/actions'
import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
} from '@/utils/fields.js'

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

const tableConsumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal',
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
  //head: [
  //  {
  //    title: 'ID',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '40',
  //    value: 'id',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Сотрудник',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '90',
  //    value: 'firstName',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Отдел',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'company.department',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Email',
  //    type: 'default',
  //    align: 'left',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'number',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'email',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Телефон',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'phone',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Образование',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '200',
  //    value: 'university',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Пол',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '100',
  //    value: 'gender',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Мак адрес',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '130',
  //    value: 'macAddress',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Домен',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'domain',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'День рождения',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'birthDate',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Действия',
  //    type: 'actions',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'right',
  //    },
  //    isShow: true,
  //    width: '100',
  //    value: 'actions',
  //    actions: [
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleText,
  //        label: 'Редактировать',
  //      },
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleButton,
  //        label: 'Удалить',
  //      },
  //    ],
  //  },
  //],
  head: [
    {
      title: 'ID',
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
      isShow: true,
      width: '90',
      alias: 'ps.status',
      value: 'status_name',
      search: {
        field: '',
        isShow: true,
      },
    },
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
          type: 'string',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'p.name',
      value: 'name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Телефон',
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
      value: 'telefon',
      alias: 'p.telefon',
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
          type: 'number',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      value: 'comment',
      alias: 'p.comment',
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
}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/payment',
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
        type: 'addItem',
      },
      // {
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      // },
    ],
  },
  //head: [
  //  {
  //    title: 'ID',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '40',
  //    value: 'id',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Сотрудник',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '90',
  //    value: 'firstName',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Отдел',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'company.department',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Email',
  //    type: 'default',
  //    align: 'left',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'number',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'email',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Телефон',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'phone',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Образование',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '200',
  //    value: 'university',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Пол',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '100',
  //    value: 'gender',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Мак адрес',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '130',
  //    value: 'macAddress',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Домен',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'domain',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'День рождения',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'birthDate',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Действия',
  //    type: 'actions',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'right',
  //    },
  //    isShow: true,
  //    width: '100',
  //    value: 'actions',
  //    actions: [
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleText,
  //        label: 'Редактировать',
  //      },
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleButton,
  //        label: 'Удалить',
  //      },
  //    ],
  //  },
  //],
  head: [
    {
      title: 'ID',
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
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '900px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
        name: 'Основные',
        type: 'FormDefault',
        detail: true,
        //lists: [],
        lists: [
          {
            alias: 'vid_vedomost_id',
            filter: [],
          },
          {
            alias: 'status_id',
            filter: [],
          },
          {
            alias: 'direction_id',
            filter: [],
          },
          {
            alias: 'doljnost_id',
            filter: [],
          },
          {
            alias: 'personal_bank_id',
            filter: [
              {
                field: 'personal_id',
                // alias: 'pb.id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'account_id',
            filter: [],
          },
          {
            alias: 'status_account_id',
            filter: [],
          },
        ],
        alias: 'payment',
        active: false,
        path: 'edit',
        fields: [
          selectField({
            label: 'Статус',
            name: 'status_id',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            // readonly: {
            //   value: false,
            //   conditions: [

            //   ]
            // }
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [6],
                  type: true,
                },
              ],
            },
            hiding: {
              conditions: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3],
                  values: [2, 3],
                },
              ],
            },
          }),
          selectField({
            label: 'Статус от',
            name: 'status_account_id',
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
            readonly: true,
          }),
          datetimeField({
            label: 'Смена статуса',
            name: 'date_status',
            value: '',
            type: 'datetime',
            subtype: 'datetime',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { hasDate, hasTime },
            bootstrapClass: [''],
            disable: false,
            readonly: true,
          }),
          dateField({
            label: 'Дата начисл',
            name: 'date_create',
            subtype: 'datetime',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: true,
          }),
          selectField({
            label: 'Менеджер',
            name: 'account_id',
            subtype: 'single',
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
            updateList: [
              {
                alias: 'direction_json',
                filter: [
                  {
                    field: 'account_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          selectField({
            label: 'Направление',
            name: 'direction_id',
            // alias: 'direction_json',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'doljnost_id',
                filter: [
                  {
                    field: 'direction_json',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_id',
                //filter: [
                //  {
                //    field: 'direction_id',
                //    value: '',
                //  },
                //],
                condition: [
                  {
                    field: 'direction_id',
                    value: [2],
                  },
                ],
                url: 'get/pagination_list/object',
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'personal_id',
                //filter: [
                //  {
                //    field: 'direction_id',
                //    value: '',
                //  },
                //],
                condition: [
                  {
                    field: 'direction_id',
                    value: [2],
                  },
                ],
                url: 'get/pagination_list/personal',
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_id',
                //filter: [
                //  {
                //    field: 'direction_id',
                //    value: '',
                //  },
                //],
                condition: [
                  {
                    field: 'direction_id',
                    value: [1],
                  },
                ],
                url: 'get/pagination_list/object',
              },
            ],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          autocompleteField({
            label: 'Объект',
            name: 'object_id',
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/payment_object_id',
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            filter: [
              {
                field: 'account_id',
                source: 'formData',
                type: 'array',
                value: '',
              },
              {
                field: 'direction_id',
                source: 'formData',
                type: 'array',
                value: '',
              },
            ],
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'personal_id',
                // filter: [
                //   {
                //     field: 'direction_id',
                //     value: '',
                //   },
                // ],
                url: 'get/pagination_list/payment_personal_id',
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_id',
                filter: [
                  {
                    field: 'object_json',
                    type: 'array',
                    value: '',
                  },
                ],
                condition: [
                  {
                    field: 'direction_id',
                    value: [1],
                  },
                ],
                url: 'get/pagination_list/object',
              },
            ],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          autocompleteField({
            label: 'Линейщик',
            name: 'personal_id',
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/payment_personal_id',
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            filter: [
              {
                field: 'account_id',
                source: 'formData',
                type: 'array',
                value: '',
              },
              {
                field: 'direction_id',
                source: 'formData',
                type: 'array',
                value: '',
              },
              {
                field: 'object_id',
                source: 'formData',
                type: 'array',
                value: '',
              },
            ],
            dependence: [
              {
                //fields: ['statement_card', 'cardowner'],
                fillField: ['fio', 'invoice'],
                type: 'api',
                module: 'personal/getCard',
                field: 'personal_bank_id',
              },
            ],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          selectField({
            label: 'Должность',
            name: 'doljnost_id',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          selectField({
            label: 'Вид ведомости',
            name: 'vid_vedomost_id',
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
            hiding: {
              conditions: [
                {
                  target: 'mode',
                  value: 'edit',
                  values: [1],
                },
                {
                  target: 'mode',
                  value: 'add',
                  values: [1],
                },
              ],
            },
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          //selectField({
          //  label: 'Статья расхода',
          //  name: 'st_rashod_id',
          //  placeholder: '',
          //  class: [''],
          //  selectOption: {
          //    text: 'name',
          //    value: 'id',
          //  },
          //  items: [
          //    {
          //      id: 0,
          //      label: 'Продавец',
          //      value: 'Абдуллина Ирина',
          //    },
          //    {
          //      id: 1,
          //      label: 'Приемщик',
          //      value: 'Адылова Ильмира',
          //    },
          //    {
          //      id: 2,
          //      label: 'Погрузчик',
          //      value: 'Азаров Михаил',
          //    },
          //  ],
          //  position: {
          //    cols: 12,
          //    sm: 6,
          //  },
          //  validations: { required },
          //  bootstrapClass: [''],
          //}),
          // stringField({
          //   label: 'Часы (план)',
          //   name: 'hour_plan',
          //   placeholder: '',
          //   readonly: true,
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 2,
          //   },
          //   bootstrapClass: [''],
          //   //validations: { required },
          //   //isShow: false,
          // }),
          // stringField({
          //   label: 'Часы(факт)',
          //   name: 'hour_fact',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 2,
          //   },
          //   bootstrapClass: [''],
          //   //validations: { required },
          //   //isShow: false,
          // }),
          // stringField({
          //   label: 'Часы',
          //   name: 'hour',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 2,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // stringField({
          //   label: 'Тариф',
          //   name: 'price',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 2,
          //   },
          //   bootstrapClass: [''],
          // }),
          // stringField({
          //   label: 'Удержано',
          //   name: 'debit_percent',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 3,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          //   isShow: true,
          // }),
          dateField({
            label: 'Назначение на дату',
            name: 'date_target',
            // subtype: 'multiple',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          stringField({
            label: 'Сумма',
            name: 'sum',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            // validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          // stringField({
          //   label: '% удержания',
          //   name: 'debit_percent',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 3,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          //   isShow: true,
          // }),
          stringField({
            label: 'Итог',
            name: 'total',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          //stringField({
          //  label: 'Минус нал',
          //  name: 'minus_nal',
          //  placeholder: '',
          //  class: [''],
          //  position: {
          //    cols: 12,
          //    sm: 2,
          //  },
          //  validations: { required },
          //  bootstrapClass: [''],
          //  isShow: false,
          //}),
          selectField({
            label: 'Банки.карта/нал',
            name: 'personal_bank_id',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 5,
            },
            defaultItems: [
              {
                id: 11,
                name: '--Наличные--',
                bank_id: 11,
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'update',
                fields: ['fio', 'invoice'],
              },
            ],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3],
                  type: true,
                },
              ],
            },
          }),
          stringField({
            label: 'Р/С',
            name: 'invoice',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 3,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: true,
          }),
          stringField({
            label: 'Карта на имя',
            name: 'fio',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            readonly: true,
          }),
          textareaField({
            label: 'Текст ошибки',
            name: 'error_text',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            //validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  permissions: [12],
                  type: false,
                },
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
              ],
            },
          }),
          textareaField({
            label: 'Комментарий ОКК',
            name: 'comment_okk',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            //validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
                {
                  permissions: [8],
                  // field: 'status_id',
                  // value: [8],
                  type: false,
                },
              ],
            },
          }),
          textareaField({
            label: 'Примечание',
            name: 'comment',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            //validations: { required },
            bootstrapClass: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'formData',
                  field: 'status_id',
                  value: [2, 3, 6],
                  type: true,
                },
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
            to: 'payment',
            skipValidation: true,
          }),
          stringAction({
            text: 'Исправлено',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'correct/payment',
            action: 'saveFormId',
            color: 'primary',
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'status_id',
                  target: 'formData',
                  value: [6],
                  type: false,
                },
              ],
            },
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'update/payment',
            action: 'saveFormId',
            color: 'primary',
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'status_id',
                  target: 'formData',
                  value: [6],
                  type: true,
                },
                {
                  field: 'status_id',
                  target: 'formData',
                  value: [2, 3],
                  type: false,
                },
              ],
            },
          }),
        ],
      },
      {
        id: 1,
        name: 'Расход',
        type: 'TableDefault',
        active: false,
        config: tableConsumptionConfig,
      },
    ],
    activeTab: null,
  },
  filters,
}

export default config
