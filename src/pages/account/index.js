import filters from './filters'
import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  // dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/form/default/index.vue'
import FormDocuments from '@/components/form/documents/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import { userKeys } from '@/pages'

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
  filters,
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
  filters,
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
  filters,
}

const config = {
  title: 'Персонал',
  activeTab: 2,
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/account_active',
        title: 'Активные',
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
          alias: 'p.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'p.telefon',
          value: 'telefon',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Стац.',
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
          alias: 'p.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Направление',
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
          value: 'direction_json',
          alias: 'p.direction_json',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Роль',
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
          value: 'permission_name',
          alias: 'p.permission_name',
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
              type: 'text',
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
              url: '$IconEdit',
              function: consoleButton,
              label: 'Удалить',
            },
            {
              type: 'button',
              url: '$IconDelete',
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
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
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
            fields: [
              stringField({
                label: 'ФИО',
                name: 'name',
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
                label: 'Телефон',
                name: 'telefon',
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Примечание',
                name: 'comment',
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
                label: ' Дата рождения',
                name: 'data_rojd',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 3,
                },
                validations: { required },
                bootstrapClass: ['changeSelect'],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
              checkboxField({
                label: 'Штатный',
                name: 'in_state',
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
                  sm: 4,
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
              }),
              // autocompleteField({
              //   label: 'Линейщик',
              //   name: 'personal_id',
              //   subtype: 'single',
              //   placeholder: '',
              //   class: [''],
              //   selectOption: {
              //     text: 'name',
              //     value: 'id',
              //   },
              //   items: [],
              //   page: 1,
              //   search: '',
              //   url: 'process.env.VUE_APP_API_URL/get/pagination_list/personal',
              //   position: {
              //     cols: 12,
              //     sm: 4,
              //   },
              //   validations: { required },
              //   bootstrapClass: [''],
              //   filters: [
              //     {
              //       field: 'object_id',
              //       value: '',
              //     },
              //   ],
              // }),
            ],
            actions: [
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
            id: 1,
            name: 'Расход',
            type: TableDefault,
            active: false,
            config: consumptionConfig,
          },
          {
            id: 2,
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
            //fields: [
            //  stringField({
            //    label: 'ФИО',
            //    name: 'name',
            //    placeholder: '',
            //    readonly: false,
            //    class: [''],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    bootstrapClass: [''],
            //    //validations: { required },
            //    //isShow: false,
            //  }),
            //  stringField({
            //    label: 'Телефон',
            //    name: 'telefon',
            //    placeholder: '',
            //    readonly: false,
            //    class: [''],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    bootstrapClass: [''],
            //    //validations: { required },
            //    //isShow: false,
            //  }),
            //  selectField({
            //    label: 'Гражданство',
            //    name: 'status',
            //    alias: 'grajdanstvo_id',
            //    placeholder: '',
            //    class: [''],
            //    selectOption: {
            //      text: 'name',
            //      value: 'id',
            //    },
            //    items: [],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    validations: { required },
            //    bootstrapClass: [''],
            //  }),
            //  stringField({
            //    label: 'Примечание',
            //    name: 'comment',
            //    placeholder: '',
            //    readonly: false,
            //    class: [''],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    bootstrapClass: [''],
            //    //validations: { required },
            //    //isShow: false,
            //  }),
            //  dateField({
            //    label: ' Дата рождения',
            //    name: 'data_rojd',
            //    subtype: 'date',
            //    placeholder: '',
            //    classes: [''],
            //    position: {
            //      cols: 12,
            //      sm: 3,
            //    },
            //    validations: { required },
            //    bootstrapClass: ['changeSelect'],
            //  }),
            //  selectField({
            //    label: 'Личный ключ',
            //    name: 'user_key',
            //    subtype: 'multiselect',
            //    placeholder: '',
            //    class: [''],
            //    selectOption: {
            //      text: 'name',
            //      value: 'id',
            //    },
            //    items: [],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    validations: { required },
            //    bootstrapClass: [''],
            //  }),
            //  selectField({
            //    label: 'Направление',
            //    name: 'direction_json',
            //    alias: 'direction_id',
            //    subtype: 'multiselect',
            //    placeholder: '',
            //    class: [''],
            //    selectOption: {
            //      text: 'name',
            //      value: 'id',
            //    },
            //    items: [],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    validations: { required },
            //    bootstrapClass: [''],
            //  }),
            //  selectField({
            //    label: 'Доступ',
            //    name: 'account_json',
            //    alias: 'account_id',
            //    subtype: 'multiselect',
            //    placeholder: '',
            //    class: [''],
            //    selectOption: {
            //      text: 'name',
            //      value: 'id',
            //    },
            //    items: [],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    validations: { required },
            //    bootstrapClass: [''],
            //  }),
            //  checkboxField({
            //    label: 'Штатный',
            //    name: 'in_state',
            //    placeholder: '',
            //    readonly: false,
            //    class: [''],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    bootstrapClass: [''],
            //    //validations: { required },
            //    //isShow: false,
            //  }),
            //  selectField({
            //    label: 'Проживание',
            //    name: 'habitation_id',
            //    alias: 'direction_json',
            //    placeholder: '',
            //    class: [''],
            //    selectOption: {
            //      text: 'name',
            //      value: 'id',
            //    },
            //    items: [],
            //    position: {
            //      cols: 12,
            //      sm: 4,
            //    },
            //    defaultItems: [
            //      {
            //        id: 11,
            //        name: '--Самостоятельное--',
            //        bank_id: 11,
            //      },
            //    ],
            //    validations: { required },
            //    bootstrapClass: [''],
            //  }),
            //  // autocompleteField({
            //  //   label: 'Линейщик',
            //  //   name: 'personal_id',
            //  //   subtype: 'single',
            //  //   placeholder: '',
            //  //   class: [''],
            //  //   selectOption: {
            //  //     text: 'name',
            //  //     value: 'id',
            //  //   },
            //  //   items: [],
            //  //   page: 1,
            //  //   search: '',
            //  //   url: 'process.env.VUE_APP_API_URL/get/pagination_list/personal',
            //  //   position: {
            //  //     cols: 12,
            //  //     sm: 4,
            //  //   },
            //  //   validations: { required },
            //  //   bootstrapClass: [''],
            //  //   filters: [
            //  //     {
            //  //       field: 'object_id',
            //  //       value: '',
            //  //     },
            //  //   ],
            //  // }),
            //],
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
                text: 'Сохранить',
                type: 'submit',
                module: '',
                name: 'saveForm',
                nextForm: true,
              }),
            ],
          },
          {
            id: 3,
            name: 'Сканы',
            type: TableDefault,
            active: false,
            config: skanConfig,
          },
          {
            id: 4,
            name: 'Начисления и выплаты',
            type: TableDefault,
            active: false,
            config: paymentConfig,
          },
        ],
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
        url: 'get/pagination/account_archive',
        title: 'Заблокированные',
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
          alias: 'p.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'p.telefon',
          value: 'telefon',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Стац.',
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
          alias: 'p.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Направление',
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
          value: 'direction_json',
          alias: 'p.direction_json',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Роль',
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
          value: 'permission_name',
          alias: 'p.permission_name',
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
              type: 'text',
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
              url: '$IconEdit',
              function: consoleButton,
              label: 'Удалить',
            },
            {
              type: 'button',
              url: '$IconDelete',
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
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
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
            fields: [
              stringField({
                label: 'ФИО',
                name: 'name',
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
                label: 'Телефон',
                name: 'telefon',
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Примечание',
                name: 'comment',
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
                label: ' Дата рождения',
                name: 'data_rojd',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 3,
                },
                validations: { required },
                bootstrapClass: ['changeSelect'],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
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
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
              }),
              checkboxField({
                label: 'Штатный',
                name: 'in_state',
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
                  sm: 4,
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
              }),
              // autocompleteField({
              //   label: 'Линейщик',
              //   name: 'personal_id',
              //   subtype: 'single',
              //   placeholder: '',
              //   class: [''],
              //   selectOption: {
              //     text: 'name',
              //     value: 'id',
              //   },
              //   items: [],
              //   page: 1,
              //   search: '',
              //   url: 'process.env.VUE_APP_API_URL/get/pagination_list/personal',
              //   position: {
              //     cols: 12,
              //     sm: 4,
              //   },
              //   validations: { required },
              //   bootstrapClass: [''],
              //   filters: [
              //     {
              //       field: 'object_id',
              //       value: '',
              //     },
              //   ],
              // }),
            ],
            actions: [
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
            id: 1,
            name: 'Расход',
            type: TableDefault,
            active: false,
            config: consumptionConfig,
          },
        ],
        activeTab: null,
      },
      filters,
    },
  ],
}

export default config
