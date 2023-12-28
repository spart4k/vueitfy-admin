import filters from './filters'
import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  colorPicker,
  textBlock,
  // dropZoneField,label:"label:"ФИО директора"
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import Rates from '@/components/Form/rates/default/index.vue'
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

const objectUnAssigned = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/object_target',
    urlDetail: 'id',
    alias: 'ot.object_id',
    title: 'This is an about page1',
    styleRow: [
      {
        targetKey: 'is_active',
        result: {
          1: {
            backgroundColor: 'green',
          },
          0: {
            backgroundColor: 'unset',
          },
        },
      },
    ],
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
      //{
      //  label: 'Добавить',
      //  class: ['v-table-button--custom'],
      //  url: '$IconSetting',
      //  function: consolePanel,
      //  backgroundColor: '#fff',
      //},
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
      title: 'Сотрудник',
      type: 'default',
      align: 'center',
      sorts: [],
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'account_name',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
    },
    {
      title: 'Направление',
      type: 'default',
      align: 'center',

      sorts: [],
      alias: 'p.id',
      isShow: true,
      width: '40',
      value: 'direction_name',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
    },
    {
      title: 'Должность',
      type: 'default',
      align: 'center',
      sorts: [],
      isShow: true,
      width: '150',
      value: 'permission_name',
      alias: 'p.date_target',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
    },
    {
      title: 'Д назнач',
      type: 'default',
      align: 'center',
      sorts: [],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'date_target_start',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
    },
    {
      title: 'Д оконч',
      type: 'default',
      align: 'center',
      sorts: [],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'date_target_end',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
    },
    {
      title: 'Назначил',
      type: 'default',
      align: 'center',
      sorts: [],
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'target_name',
      //search: {
      //  field: '',
      //  isShow: true,
      //},
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
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      to: 'object',
      skipValidation: true,
    }),
  ],
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
        url: 'get/pagination/object_active',
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
            type: 'addItem',
            backgroundColor: '#fff',
            isShow: {
              condition: [
                {
                  permissions: [15, 2, 4, 3],
                  type: true,
                },
              ],
            },
          },
        ],
      },
      head: [
        {
          title: 'Название',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            //{
            //  type: 'string',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          alias: 'p.name',
          isShow: true,
          width: '40',
          value: 'name',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Адрес',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '90',
          alias: 'ps.address',
          value: 'address',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Направление',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            //{
            //  type: 'string',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          alias: 'p.direction_json',
          value: 'directions',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        //{
        //  title: 'Менеджер',
        //  type: 'default',
        //  align: 'center',
        //  fixed: {
        //    value: false,
        //    position: undefined,
        //  },
        //  sorts: [
        //    {
        //      type: 'text',
        //      default: '',
        //      value: '',
        //      isShow: false,
        //    },
        //  ],
        //  isShow: true,
        //  width: '150',
        //  value: 'manager_directions',
        //  alias: 'p.manager_directions',
        //  search: {
        //    field: '',
        //    isShow: true,
        //  },
        //},
        {
          title: 'Телефон',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: undefined,
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          value: 'tel_director',
          alias: 'p.tel_director',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Площадь',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: undefined,
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          value: 'square',
          alias: 'p.square',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
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
        width: '600px',
        method: 'get',
        alias: 'object_active',
        url: '/get/form/',
        name: 'Объекты - добавления',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          // {
          //   id: 0,
          //   name: 'Основные',
          //   type: FormDefault,
          //   detail: true,
          //   path: 'add',
          //   lists: [
          //     {
          //       alias: 'direction_object',
          //       filter: [],
          //     },
          //     {
          //       alias: 'type',
          //       filter: [],
          //     },
          //     {
          //       alias: 'object_type',
          //       filter: [],
          //     },
          //     {
          //       alias: 'object_subtype',
          //       filter: [],
          //     },
          //     {
          //       alias: 'filial_id',
          //       filter: [],
          //     },
          //   ],
          //   alias: 'object',
          //   active: false,
          //   fields: [
          //     selectField({
          //       label: 'Направление',
          //       name: 'direction_json',
          //       alias: 'direction_object',
          //       subtype: 'multiple',
          //       placeholder: '',
          //       stringify: true,
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       validations: { required },
          //       updateList: [
          //         {
          //           alias: 'object_type',
          //           filter: [
          //             {
          //               field: 'direction_json',
          //               value: '',
          //               source: 'formData',
          //               type: 'array',
          //             },
          //           ],
          //         },
          //       ],
          //       bootstrapClass: [''],
          //       dependence: [
          //         {
          //           //fields: ['statement_card', 'cardowner'],
          //           type: 'default',
          //           action: {
          //             type: 'hideOptions',
          //             //values: [8],
          //             field: 'direction_json',
          //             condition: [
          //               {
          //                 value: [2],
          //                 options: [1, 6],
          //               },
          //               {
          //                 value: [6],
          //                 options: [2],
          //               },
          //               {
          //                 value: [1],
          //                 options: [2],
          //               },
          //             ],
          //           },
          //           //url: 'object_id/avatar_with_user_key_id',
          //         },
          //       ],
          //     }),
          //     selectField({
          //       label: 'Тип',
          //       name: 'type',
          //       alias: 'object_type',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //       requiredFields: ['direction_json'],
          //       updateList: [
          //         {
          //           alias: 'object_subtype',
          //           filter: [
          //             {
          //               field: 'type',
          //               value: '',
          //               source: 'formData',
          //               type: 'num',
          //             },
          //           ],
          //         },
          //       ],
          //     }),
          //     selectField({
          //       label: 'Подтип',
          //       name: 'subtype',
          //       alias: 'object_subtype',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //       requiredFields: ['type'],
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'subtype',
          //             target: 'items',
          //             value: 'notEmpty',
          //           },
          //           {
          //             field: 'type',
          //             target: 'value',
          //             value: 'notEmpty',
          //           },
          //         ],
          //       },
          //     }),
          //     stringField({
          //       label: 'Название',
          //       name: 'name',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 8,
          //       },
          //       bootstrapClass: [''],
          //     }),
          //     colorPicker({
          //       label: 'Цвет',
          //       name: 'color',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     autocompleteField({
          //       label: 'Регион',
          //       name: 'regions_id',
          //       alias: 'regions_id',
          //       subtype: 'single',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       page: 1,
          //       search: '',
          //       url: 'get/pagination_list/regions_id',
          //       position: {
          //         cols: 12,
          //         sm: 6,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //       updateList: [
          //         {
          //           alias: 'city_id',
          //           filter: [
          //             {
          //               field: 'regions_id',
          //               value: '',
          //               source: 'formData',
          //               type: 'num',
          //             },
          //           ],
          //         },
          //       ],
          //     }),
          //     selectField({
          //       label: 'Город',
          //       name: 'city_id',
          //       //alias: 'city_id',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 6,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //       requiredFields: ['regions_id'],
          //     }),
          //     stringField({
          //       label: 'Адрес',
          //       name: 'address',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       validations: { required },
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'ФИО директора',
          //       name: 'fio_director',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'Телефон',
          //       name: 'tel_director',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     checkboxField({
          //       label: 'Питание',
          //       name: 'with_nutrition',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       validations: { required },
          //       //isShow: false,
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[1], [6], [1, 6]],
          //           },
          //         ],
          //       },
          //     }),
          //     stringField({
          //       label: 'Стоимость питания',
          //       name: 'sum_nutrition',
          //       placeholder: '',
          //       value: 0,
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       isShow: {
          //         value: true,
          //         conditions: [
          //           {
          //             field: 'with_nutrition',
          //             value: [true],
          //           },
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[1], [6], [1, 6]],
          //           },
          //         ],
          //       },
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'Имя печатной формы',
          //       name: 'print_form_name',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[1], [1, 6]],
          //           },
          //           {
          //             field: 'type',
          //             value: [8, 11],
          //           },
          //         ],
          //       },
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'ID X5',
          //       name: 'num_from_x5',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[1], [1, 6], [6], [2]],
          //           },
          //           {
          //             field: 'type',
          //             value: [11, 1],
          //           },
          //         ],
          //       },
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'Площадь М^2',
          //       name: 'square',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       bootstrapClass: [''],
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[6], [1, 6]],
          //           },
          //         ],
          //       },
          //       validations: { required },
          //       //isShow: false,
          //     }),
          //     selectField({
          //       label: 'Филиал',
          //       name: 'filial_id',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 12,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //       isShow: {
          //         value: false,
          //         conditions: [
          //           {
          //             field: 'direction_json',
          //             type: 'array',
          //             value: [[2]],
          //           },
          //           {
          //             field: 'type',
          //             value: [2],
          //           },
          //         ],
          //       },
          //     }),
          //   ],
          //   actions: [
          //     stringAction({
          //       text: 'Закрыть',
          //       type: 'submit',
          //       color: 'textDefault',
          //       name: 'closePopup',
          //       action: 'closePopup',
          //       to: 'object',
          //       skipValidation: true,
          //     }),
          //     stringAction({
          //       text: 'Сохранить',
          //       type: 'submit',
          //       module: 'form/create',
          //       name: 'createForm',
          //       url: 'set/data/object',
          //       action: 'createForm',
          //       color: 'primary',
          //     }),
          //   ],
          // },
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            path: 'add',
            lists: [
              {
                alias: 'direction_object',
                filter: [],
              },
              {
                alias: 'type',
                filter: [],
              },
              {
                alias: 'object_type',
                filter: [
                  {
                    field: 'direction_json',
                    source: 'formData',
                    type: 'array',
                  },
                ],
              },
              {
                alias: 'object_subtype',
                filter: [
                  {
                    field: 'type',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'filial_id',
                filter: [],
              },
              {
                alias: 'city_id',
                filter: [
                  {
                    field: 'regions_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            alias: 'object',
            active: false,
            fields: [
              selectField({
                label: 'Направление',
                name: 'direction_json',
                alias: 'direction_object',
                subtype: 'multiple',
                placeholder: '',
                stringify: true,
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                updateList: [
                  {
                    alias: 'object_type',
                    filter: [
                      {
                        field: 'direction_json',
                        value: '',
                        source: 'formData',
                        type: 'array',
                      },
                    ],
                  },
                ],
                bootstrapClass: [''],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'default',
                    action: {
                      type: 'hideOptions',
                      //values: [8],
                      field: 'direction_json',
                      condition: [
                        {
                          value: [2],
                          options: [1, 6],
                        },
                        {
                          value: [6],
                          options: [2],
                        },
                        {
                          value: [1],
                          options: [2],
                        },
                      ],
                    },
                    //url: 'object_id/avatar_with_user_key_id',
                  },
                ],
              }),
              selectField({
                label: 'Тип',
                name: 'type',
                alias: 'object_type',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['direction_json'],
                updateList: [
                  {
                    alias: 'object_subtype',
                    filter: [
                      {
                        field: 'type',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Подтип',
                name: 'subtype',
                alias: 'object_subtype',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['type'],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'subtype',
                      target: 'items',
                      value: 'notEmpty',
                    },
                    {
                      field: 'type',
                      target: 'value',
                      value: 'notEmpty',
                    },
                  ],
                },
              }),
              stringField({
                label: 'Название',
                name: 'name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 8,
                },
                bootstrapClass: [''],
                required: { required },
              }),
              colorPicker({
                label: 'Цвет',
                name: 'color',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                value: '#000000',
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
              autocompleteField({
                label: 'Регион',
                name: 'regions_id',
                alias: 'regions_id',
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
                url: 'get/pagination_list/regions_id',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                updateList: [
                  {
                    alias: 'city_id',
                    filter: [
                      {
                        field: 'regions_id',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Город',
                name: 'city_id',
                //alias: 'city_id',
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
                requiredFields: ['regions_id'],
              }),
              stringField({
                label: 'Адрес',
                name: 'address',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ФИО директора',
                name: 'fio_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Телефон',
                name: 'tel_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              checkboxField({
                label: 'Питание',
                name: 'with_nutrition',
                placeholder: '',
                value: false,
                readonly: false,
                sendOnlyTrue: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
              }),
              stringField({
                label: 'Стоимость питания',
                name: 'sum_nutrition',
                placeholder: '',
                //value: 0,
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'with_nutrition',
                      value: [true],
                    },
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Имя печатной формы',
                name: 'print_form_name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6]],
                    },
                    {
                      field: 'type',
                      value: [8, 11],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ID X5',
                name: 'num_from_x5',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6], [6], [2]],
                    },
                    {
                      field: 'type',
                      value: [11, 1],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Площадь М^2',
                name: 'square',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              selectField({
                label: 'Филиал',
                name: 'filial_id',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[2]],
                    },
                    {
                      field: 'type',
                      value: [2],
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
                to: 'object',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/create',
                name: 'createForm',
                url: 'set/object',
                action: 'createForm',
                color: 'primary',
                handlingResponse: {
                  1: {
                    text: 'Объект %name% успешно создан',
                    color: 'success',
                  },
                  2: {
                    text: 'Объект с именем %name% уже существует',
                    color: 'error',
                  },
                  3: {
                    text: '',
                  },
                },
              }),
            ],
          },
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            path: 'edit',
            lists: [
              {
                alias: 'direction_object',
                filter: [],
              },
              {
                alias: 'type',
                filter: [],
              },
              {
                alias: 'object_type',
                filter: [
                  {
                    field: 'direction_json',
                    source: 'formData',
                    type: 'array',
                  },
                ],
              },
              {
                alias: 'object_subtype',
                filter: [
                  {
                    field: 'type',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'filial_id',
                filter: [],
              },
              {
                alias: 'city_id',
                filter: [
                  {
                    field: 'regions_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            alias: 'object',
            active: false,
            fields: [
              selectField({
                label: 'Направление',
                name: 'direction_json',
                alias: 'direction_object',
                subtype: 'multiple',
                placeholder: '',
                stringify: true,
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                updateList: [
                  {
                    alias: 'object_type',
                    filter: [
                      {
                        field: 'direction_json',
                        value: '',
                        source: 'formData',
                        type: 'array',
                      },
                    ],
                  },
                ],
                bootstrapClass: [''],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'default',
                    action: {
                      type: 'hideOptions',
                      //values: [8],
                      field: 'direction_json',
                      condition: [
                        {
                          value: [2],
                          options: [1, 6],
                        },
                        {
                          value: [6],
                          options: [2],
                        },
                        {
                          value: [1],
                          options: [2],
                        },
                      ],
                    },
                    //url: 'object_id/avatar_with_user_key_id',
                  },
                ],
              }),
              selectField({
                label: 'Тип',
                name: 'type',
                alias: 'object_type',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['direction_json'],
                updateList: [
                  {
                    alias: 'object_subtype',
                    filter: [
                      {
                        field: 'type',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Подтип',
                name: 'subtype',
                alias: 'object_subtype',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['type'],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'subtype',
                      target: 'items',
                      value: 'notEmpty',
                    },
                    {
                      field: 'type',
                      target: 'value',
                      value: 'notEmpty',
                    },
                  ],
                },
              }),
              stringField({
                label: 'Название',
                name: 'name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 8,
                },
                bootstrapClass: [''],
                required: { required },
              }),
              colorPicker({
                label: 'Цвет',
                name: 'color',
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
              autocompleteField({
                label: 'Регион',
                name: 'regions_id',
                alias: 'regions_id',
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
                url: 'get/pagination_list/regions_id',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                updateList: [
                  {
                    alias: 'city_id',
                    filter: [
                      {
                        field: 'regions_id',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Город',
                name: 'city_id',
                //alias: 'city_id',
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
                requiredFields: ['regions_id'],
              }),
              stringField({
                label: 'Адрес',
                name: 'address',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ФИО директора',
                name: 'fio_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Телефон',
                name: 'tel_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              checkboxField({
                label: 'Питание',
                name: 'with_nutrition',
                placeholder: '',
                value: false,
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
              }),
              stringField({
                label: 'Стоимость питания',
                name: 'sum_nutrition',
                placeholder: '',
                //value: 0,
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'with_nutrition',
                      value: [true],
                    },
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Имя печатной формы',
                name: 'print_form_name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6]],
                    },
                    {
                      field: 'type',
                      value: [8, 11],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ID X5',
                name: 'num_from_x5',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6], [6], [2]],
                    },
                    {
                      field: 'type',
                      value: [11, 1],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Площадь М^2',
                name: 'square',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              selectField({
                label: 'Филиал',
                name: 'filial_id',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[2]],
                    },
                    {
                      field: 'type',
                      value: [2],
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
                to: 'object',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/putForm',
                name: 'saveFormId',
                url: 'set/object',
                action: 'saveFormId',
                color: 'primary',
              }),
            ],
          },
          {
            id: 4,
            path: 'edit',
            name: 'Назначения',
            type: TableDefault,
            active: false,
            config: objectUnAssigned,
          },
          {
            id: 1,
            // path: 'edit',
            name: 'Тарифы',
            type: Rates,
            detail: true,
            alias: 'object',
            active: false,
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
        ],
        activeTab: null,
      },
      //filters,
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
        url: 'get/pagination/object_unassigned',
        title: 'Неназначенные',
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
            label: 'Назначить',
            class: ['v-table-button--custom'],
            url: 'object-appoint',
            type: 'changeUrl',
            // function: addQuery,
            // type: 'nextStage',
            backgroundColor: '#fff',
            isShow: {
              condition: [
                {
                  permissions: [1, 2, 3, 4, 9, 15],
                  direction_id: [1, 6],
                  type: true,
                },
              ],
            },
          },
        ],
      },
      head: [
        {
          title: 'Название',
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
          alias: 'p.name',
          isShow: true,
          width: '40',
          value: 'name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Адрес',
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
          alias: 'ps.address',
          value: 'address',
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
          alias: 'p.direction_json',
          value: 'directions',
          search: {
            field: '',
            isShow: true,
          },
        },
        //{
        //  title: 'Менеджер',
        //  type: 'default',
        //  align: 'center',
        //  fixed: {
        //    value: false,
        //    position: undefined,
        //  },
        //  sorts: [
        //    {
        //      type: 'text',
        //      default: '',
        //      value: '',
        //      isShow: false,
        //    },
        //  ],
        //  isShow: true,
        //  width: '150',
        //  value: 'manager_directions',
        //  alias: 'p.manager_directions',
        //  search: {
        //    field: '',
        //    isShow: true,
        //  },
        //},
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          value: 'tel_director',
          alias: 'p.tel_director',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Площадь',
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
          value: 'square',
          alias: 'p.square',
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
        width: '600px',
        method: 'get',
        alias: 'object',
        url: '/get/form/',
        name: 'Назначить',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          // {
          //   id: 0,
          //   name: 'Основные',
          //   type: FormDefault,
          //   detail: true,
          //   lists: [
          //     'user_keys',
          //     'habitation_id',
          //     'account_id',
          //     'direction_id',
          //     'grajdanstvo_id',
          //   ],
          //   alias: 'object',
          //   active: false,
          //   fields: [
          //     stringField({
          //       label: 'ФИО',
          //       name: 'name',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     stringField({
          //       label: 'Телефон',
          //       name: 'telefon',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     selectField({
          //       label: 'Гражданство',
          //       name: 'status',
          //       alias: 'grajdanstvo_id',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //     }),
          //     stringField({
          //       label: 'Примечание',
          //       name: 'comment',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     dateField({
          //       label: ' Дата рождения',
          //       name: 'data_rojd',
          //       subtype: 'date',
          //       placeholder: '',
          //       classes: [''],
          //       position: {
          //         cols: 12,
          //         sm: 3,
          //       },
          //       validations: { required },
          //       bootstrapClass: ['changeSelect'],
          //     }),
          //     selectField({
          //       label: 'Личный ключ',
          //       name: 'user_key',
          //       subtype: 'multiple',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //     }),
          //     selectField({
          //       label: 'Направление',
          //       name: 'direction_json',
          //       alias: 'direction_id',
          //       subtype: 'multiple',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //     }),
          //     selectField({
          //       label: 'Доступ',
          //       name: 'account_json',
          //       alias: 'account_id',
          //       subtype: 'multiple',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       validations: { required },
          //       bootstrapClass: [''],
          //     }),
          //     checkboxField({
          //       label: 'Штатный',
          //       name: 'in_state',
          //       placeholder: '',
          //       readonly: false,
          //       class: [''],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       bootstrapClass: [''],
          //       //validations: { required },
          //       //isShow: false,
          //     }),
          //     selectField({
          //       label: 'Проживание',
          //       name: 'habitation_id',
          //       alias: 'direction_json',
          //       placeholder: '',
          //       class: [''],
          //       selectOption: {
          //         text: 'name',
          //         value: 'id',
          //       },
          //       items: [],
          //       position: {
          //         cols: 12,
          //         sm: 4,
          //       },
          //       defaultItems: [
          //         {
          //           id: 11,
          //           name: '--Самостоятельное--',
          //           bank_id: 11,
          //         },
          //       ],
          //       validations: { required },
          //       bootstrapClass: [''],
          //     }),
          //     // autocompleteField({
          //     //   label: 'Линейщик',
          //     //   name: 'personal_id',
          //     //   subtype: 'single',
          //     //   placeholder: '',
          //     //   class: [''],
          //     //   selectOption: {
          //     //     text: 'name',
          //     //     value: 'id',
          //     //   },
          //     //   items: [],
          //     //   page: 1,
          //     //   search: '',
          //     //   url: 'process.env.VUE_APP_API_URL/get/pagination_list/personal',
          //     //   position: {
          //     //     cols: 12,
          //     //     sm: 4,
          //     //   },
          //     //   validations: { required },
          //     //   bootstrapClass: [''],
          //     //   filter: [
          //     //     {
          //     //       field: 'object_id',
          //     //       value: '',
          //     //     },
          //     //   ],
          //     // }),
          //   ],
          //   actions: [
          //     stringAction({
          //       text: 'Сохранить',
          //       type: 'submit',
          //       module: '',
          //       name: 'saveForm',
          //       nextForm: true,
          //     }),
          //   ],
          // },
          {
            id: 3,
            path: 'appoint',
            name: 'Назначить',
            type: FormDefault,
            detail: true,
            alias: 'object',
            active: false,
            fields: [
              autocompleteField({
                label: 'Объект',
                name: 'object_id',
                alias: 'assign_objects',
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
                url: 'get/pagination_list/assign_objects',
                // object
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'direction_id',
                    url: 'get/pagination_list/assign_object_directions',
                  },
                ],
              }),
              autocompleteField({
                label: 'Направление',
                name: 'direction_id',
                alias: 'assign_object_directions',
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
                url: 'get/pagination_list/assign_object_directions',
                // object
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'account_id',
                    url: 'get/pagination_list/assign_accounts',
                  },
                ],
                // filter: [
                //   {
                //     field: 'direction_id',
                //     value: '',
                //   },
                // ],
                // dependence: [
                //   {
                //     type: 'api',
                //     module: 'selects/getListUpdate',
                //     field: 'personal_id',
                //     url: 'get/pagination_list/personal',
                //   },
                // ],
                // update: {
                //   module: 'selects/getList',
                //   fields: ['personal_id'],
                // },
              }),
              autocompleteField({
                label: 'Сотрудник',
                name: 'account_id',
                alias: 'assign_accounts',
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
                url: 'get/pagination_list/assign_accounts',
                // object
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                  },
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                dependence: [
                  {
                    type: 'default',
                    fillField: ['permission_id'],
                  },
                ],
                // filter: [
                //   {
                //     field: 'direction_id',
                //     value: '',
                //   },
                // ],
                // dependence: [
                //   {
                //     type: 'api',
                //     module: 'selects/getListUpdate',
                //     field: 'personal_id',
                //     url: 'get/pagination_list/personal',
                //   },
                // ],
                // update: {
                //   module: 'selects/getList',
                //   fields: ['personal_id'],
                // },
              }),
              textBlock({
                label: 'Создал',
                name: 'permission_id',
                placeholder: '',
                readonly: true,
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
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'textDefault',
                name: 'closePopup',
                action: 'closePopup',
                to: 'object',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/create',
                name: 'createForm',
                url: 'create/assign',
                action: 'createForm',
                color: 'primary',
              }),
            ],
          },
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            path: 'edit',
            lists: [
              {
                alias: 'direction_object',
                filter: [],
              },
              {
                alias: 'type',
                filter: [],
              },
              {
                alias: 'object_type',
                filter: [],
              },
              {
                alias: 'object_subtype',
                filter: [
                  {
                    field: 'type',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'filial_id',
                filter: [],
              },
              {
                alias: 'city_id',
                filter: [
                  {
                    field: 'regions_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            alias: 'object',
            active: false,
            fields: [
              selectField({
                label: 'Направление',
                name: 'direction_json',
                alias: 'direction_object',
                subtype: 'multiple',
                placeholder: '',
                stringify: true,
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                updateList: [
                  {
                    alias: 'object_type',
                    filter: [
                      {
                        field: 'direction_json',
                        value: '',
                        source: 'formData',
                        type: 'array',
                      },
                    ],
                  },
                ],
                bootstrapClass: [''],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'default',
                    action: {
                      type: 'hideOptions',
                      //values: [8],
                      field: 'direction_json',
                      condition: [
                        {
                          value: [2],
                          options: [1, 6],
                        },
                        {
                          value: [6],
                          options: [2],
                        },
                        {
                          value: [1],
                          options: [2],
                        },
                      ],
                    },
                    //url: 'object_id/avatar_with_user_key_id',
                  },
                ],
              }),
              selectField({
                label: 'Тип',
                name: 'type',
                alias: 'object_type',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['direction_json'],
                updateList: [
                  {
                    alias: 'object_subtype',
                    filter: [
                      {
                        field: 'type',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Подтип',
                name: 'subtype',
                alias: 'object_subtype',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['type'],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'subtype',
                      target: 'items',
                      value: 'notEmpty',
                    },
                    {
                      field: 'type',
                      target: 'value',
                      value: 'notEmpty',
                    },
                  ],
                },
              }),
              stringField({
                label: 'Название',
                name: 'name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 8,
                },
                bootstrapClass: [''],
                required: { required },
              }),
              colorPicker({
                label: 'Цвет',
                name: 'color',
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
              autocompleteField({
                label: 'Регион',
                name: 'regions_id',
                alias: 'regions_id',
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
                url: 'get/pagination_list/regions_id',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                updateList: [
                  {
                    alias: 'city_id',
                    filter: [
                      {
                        field: 'regions_id',
                        value: '',
                        source: 'formData',
                        type: 'num',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Город',
                name: 'city_id',
                //alias: 'city_id',
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
                requiredFields: ['regions_id'],
              }),
              stringField({
                label: 'Адрес',
                name: 'address',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ФИО директора',
                name: 'fio_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Телефон',
                name: 'tel_director',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                validations: { required },
                //isShow: false,
              }),
              checkboxField({
                label: 'Питание',
                name: 'with_nutrition',
                placeholder: '',
                value: false,
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
              }),
              stringField({
                label: 'Стоимость питания',
                name: 'sum_nutrition',
                placeholder: '',
                //value: 0,
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'with_nutrition',
                      value: [true],
                    },
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Имя печатной формы',
                name: 'print_form_name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6]],
                    },
                    {
                      field: 'type',
                      value: [8, 11],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'ID X5',
                name: 'num_from_x5',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[1], [1, 6], [6], [2]],
                    },
                    {
                      field: 'type',
                      value: [11, 1],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              stringField({
                label: 'Площадь М^2',
                name: 'square',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[6], [1, 6]],
                    },
                  ],
                },
                validations: { required },
                //isShow: false,
              }),
              selectField({
                label: 'Филиал',
                name: 'filial_id',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'direction_json',
                      type: 'array',
                      value: [[2]],
                    },
                    {
                      field: 'type',
                      value: [2],
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
                to: 'object',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/putForm',
                name: 'saveFormId',
                url: 'set/object',
                action: 'saveFormId',
                color: 'primary',
              }),
            ],
          },
          {
            id: 4,
            path: 'edit',
            name: 'Назначения',
            type: TableDefault,
            active: false,
            config: objectUnAssigned,
          },
        ],
        activeTab: null,
      },
      //filters,
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
        url: 'get/pagination/object_archive',
        title: 'Архив',
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
        ],
      },
      head: [
        {
          title: 'Название',
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
          alias: 'p.name',
          isShow: true,
          width: '40',
          value: 'name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Адрес',
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
          alias: 'ps.address',
          value: 'address',
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
          alias: 'p.direction_json',
          value: 'directions',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Менеджер',
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
          value: 'manager_directions',
          alias: 'p.manager_directions',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          value: 'tel_director',
          alias: 'p.tel_director',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Площадь',
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
          value: 'square',
          alias: 'p.square',
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
        alias: 'object',
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
            alias: 'object',
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
                subtype: 'multiple',
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
                subtype: 'multiple',
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
                subtype: 'multiple',
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
              //   filter: [
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
      //filters,
    },
    // {
    //   selector: '#mainTable',
    //   options: {
    //     selecting: true,
    //     search: {
    //       function: searchInputing,
    //     },
    //     headerFixed: true,
    //     //url: 'https://dummyjson.com/users',
    //     url: 'get/pagination/object_price',
    //     title: 'Тарифы',
    //   },
    //   type: TableDefault,
    //   panel: {
    //     buttons: [
    //       {
    //         label: 'Обновить',
    //         class: ['v-table-button--custom'],
    //         url: '$IconEdit',
    //         function: consolePanel,
    //         backgroundColor: '#ffffff',
    //       },
    //       {
    //         label: 'Добавить',
    //         class: ['v-table-button--custom'],
    //         url: '$IconSetting',
    //         function: consolePanel,
    //         backgroundColor: '#fff',
    //       },
    //       {
    //         label: 'Скачать',
    //         class: ['v-table-button--custom'],
    //         function: consolePanel,
    //         backgroundColor: '#fff',
    //       },
    //     ],
    //   },
    //   head: [
    //     {
    //       title: 'id',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: 'left',
    //       },
    //       sorts: [
    //         {
    //           type: 'string',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       alias: 'p.id',
    //       isShow: true,
    //       width: '40',
    //       value: 'id',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Объект',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: 'left',
    //       },
    //       sorts: [
    //         {
    //           type: 'text',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '90',
    //       alias: 'ps.object_name',
    //       value: 'object_name',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Должность',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: 'left',
    //       },
    //       sorts: [
    //         {
    //           type: 'string',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '150',
    //       alias: 'p.doljnost_name',
    //       value: 'doljnost_name',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Тариф',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: undefined,
    //       },
    //       sorts: [
    //         {
    //           type: 'text',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '150',
    //       value: 'price',
    //       alias: 'p.price',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Категория',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: undefined,
    //       },
    //       sorts: [
    //         {
    //           type: 'text',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '150',
    //       value: 'category',
    //       alias: 'p.category',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Активен с',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: undefined,
    //       },
    //       sorts: [
    //         {
    //           type: 'text',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '150',
    //       value: 'date_active_s',
    //       alias: 'p.date_active_s',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Активен до',
    //       type: 'default',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: undefined,
    //       },
    //       sorts: [
    //         {
    //           type: 'text',
    //           default: '',
    //           value: '',
    //           isShow: false,
    //         },
    //       ],
    //       isShow: true,
    //       width: '150',
    //       value: 'date_active_po',
    //       alias: 'p.date_active_po',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'Действия',
    //       type: 'actions',
    //       align: 'center',
    //       fixed: {
    //         value: false,
    //         position: 'right',
    //       },
    //       isShow: true,
    //       width: '100',
    //       value: 'actions',
    //       actions: [
    //         {
    //           type: 'button',
    //           url: '$IconDelete',
    //           function: consoleButton,
    //           label: 'Удалить',
    //         },
    //       ],
    //     },
    //   ],
    //   data: {
    //     rows: [],
    //     totalRows: null,
    //     pageLength: 20,
    //     currentPage: 1,
    //     totalPages: null,
    //   },
    //   detail: {
    //     type: 'popup', // String 'popup' or 'page'
    //     classes: [''], // List class
    //     width: '1000px',
    //     method: 'get',
    //     alias: 'object',
    //     url: '/get/form/',
    //     name: 'Персонал',
    //     bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    //     tabs: [
    //       {
    //         id: 0,
    //         name: 'Основные',
    //         type: FormDefault,
    //         detail: true,
    //         lists: [
    //           'user_keys',
    //           'habitation_id',
    //           'account_id',
    //           'direction_id',
    //           'grajdanstvo_id',
    //         ],
    //         alias: 'object',
    //         active: false,
    //         fields: [
    //           stringField({
    //             label: 'ФИО',
    //             name: 'name',
    //             placeholder: '',
    //             readonly: false,
    //             class: [''],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             bootstrapClass: [''],
    //             //validations: { required },
    //             //isShow: false,
    //           }),
    //           stringField({
    //             label: 'Телефон',
    //             name: 'telefon',
    //             placeholder: '',
    //             readonly: false,
    //             class: [''],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             bootstrapClass: [''],
    //             //validations: { required },
    //             //isShow: false,
    //           }),
    //           selectField({
    //             label: 'Гражданство',
    //             name: 'status',
    //             alias: 'grajdanstvo_id',
    //             placeholder: '',
    //             class: [''],
    //             selectOption: {
    //               text: 'name',
    //               value: 'id',
    //             },
    //             items: [],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             validations: { required },
    //             bootstrapClass: [''],
    //           }),
    //           stringField({
    //             label: 'Примечание',
    //             name: 'comment',
    //             placeholder: '',
    //             readonly: false,
    //             class: [''],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             bootstrapClass: [''],
    //             //validations: { required },
    //             //isShow: false,
    //           }),
    //           dateField({
    //             label: ' Дата рождения',
    //             name: 'data_rojd',
    //             subtype: 'date',
    //             placeholder: '',
    //             classes: [''],
    //             position: {
    //               cols: 12,
    //               sm: 3,
    //             },
    //             validations: { required },
    //             bootstrapClass: ['changeSelect'],
    //           }),
    //           selectField({
    //             label: 'Личный ключ',
    //             name: 'user_key',
    //             subtype: 'multiple',
    //             placeholder: '',
    //             class: [''],
    //             selectOption: {
    //               text: 'name',
    //               value: 'id',
    //             },
    //             items: [],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             validations: { required },
    //             bootstrapClass: [''],
    //           }),
    //           selectField({
    //             label: 'Направление',
    //             name: 'direction_json',
    //             alias: 'direction_id',
    //             subtype: 'multiple',
    //             placeholder: '',
    //             class: [''],
    //             selectOption: {
    //               text: 'name',
    //               value: 'id',
    //             },
    //             items: [],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             validations: { required },
    //             bootstrapClass: [''],
    //           }),
    //           selectField({
    //             label: 'Доступ',
    //             name: 'account_json',
    //             alias: 'account_id',
    //             subtype: 'multiple',
    //             placeholder: '',
    //             class: [''],
    //             selectOption: {
    //               text: 'name',
    //               value: 'id',
    //             },
    //             items: [],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             validations: { required },
    //             bootstrapClass: [''],
    //           }),
    //           checkboxField({
    //             label: 'Штатный',
    //             name: 'in_state',
    //             placeholder: '',
    //             readonly: false,
    //             class: [''],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             bootstrapClass: [''],
    //             //validations: { required },
    //             //isShow: false,
    //           }),
    //           selectField({
    //             label: 'Проживание',
    //             name: 'habitation_id',
    //             alias: 'direction_json',
    //             placeholder: '',
    //             class: [''],
    //             selectOption: {
    //               text: 'name',
    //               value: 'id',
    //             },
    //             items: [],
    //             position: {
    //               cols: 12,
    //               sm: 4,
    //             },
    //             defaultItems: [
    //               {
    //                 id: 11,
    //                 name: '--Самостоятельное--',
    //                 bank_id: 11,
    //               },
    //             ],
    //             validations: { required },
    //             bootstrapClass: [''],
    //           }),
    //           // autocompleteField({
    //           //   label: 'Линейщик',
    //           //   name: 'personal_id',
    //           //   subtype: 'single',
    //           //   placeholder: '',
    //           //   class: [''],
    //           //   selectOption: {
    //           //     text: 'name',
    //           //     value: 'id',
    //           //   },
    //           //   items: [],
    //           //   page: 1,
    //           //   search: '',
    //           //   url: 'process.env.VUE_APP_API_URL/get/pagination_list/personal',
    //           //   position: {
    //           //     cols: 12,
    //           //     sm: 4,
    //           //   },
    //           //   validations: { required },
    //           //   bootstrapClass: [''],
    //           //   filter: [
    //           //     {
    //           //       field: 'object_id',
    //           //       value: '',
    //           //     },
    //           //   ],
    //           // }),
    //         ],
    //         actions: [
    //           stringAction({
    //             text: 'Сохранить',
    //             type: 'submit',
    //             module: '',
    //             name: 'saveForm',
    //             nextForm: true,
    //           }),
    //         ],
    //       },
    //       {
    //         id: 1,
    //         name: 'Расход',
    //         type: TableDefault,
    //         active: false,
    //         config: consumptionConfig,
    //       },
    //     ],
    //     activeTab: null,
    //   },
    //   filters,
    // },
  ],
}

export default config
