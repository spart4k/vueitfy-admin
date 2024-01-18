import filters from './filters'
import TableDefault from '@/components/Table/default/index.vue'
import FormDefault from '@/components/Form/default/index.vue'
import FormList from '@/components/Form/list/index.vue'
import Expenses from '@/components/Form/expenses/index.vue'
import store from '@/store/index.js'

import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  textareaField,
  checkboxField,
  dateField,
  textBlock,
  radioPanel,
  dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'

function consoleText(row) {
  console.log(row, 2)
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

function downloadFile() {
  console.log('download')
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
    url: 'get/pagination/zayavka',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        type: 'refresh',
        function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        type: 'addItem',
        //function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Бухгалтерия excel',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        backgroundColor: '#fff',
        type: 'sendPage',
        requestPage: 'zayavka',
        isShow: {
          condition: [
            {
              permissions: [4, 12],
              type: true,
            },
          ],
        },
      },
      {
        label: 'Загрузить статус',
        class: ['v-table-button--custom'],
        backgroundColor: '#fff',
        type: 'changeUrl',
        url: 'zayavka-load',
        isShow: {
          condition: [
            {
              permissions: [4, 12],
              type: true,
            },
          ],
        },
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
      alias: 'sz.id',
      isShow: true,
      width: '40',
      value: 'status_name',
      backgroundColorKey: 'status_color',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Создал',
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
      alias: 'sac.id',
      isShow: true,
      width: '40',
      value: 'from_fio',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'От',
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
      alias: 'sas.id',
      isShow: true,
      width: '40',
      value: 'status_fio',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата статус',
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
      alias: 'z.date_status',
      isShow: true,
      width: '40',
      value: 'date_status',
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
      alias: 'z.direction_id',
      isShow: true,
      width: '40',
      value: 'direction_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'На кого',
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
      alias: 'z.to_name',
      isShow: true,
      width: '40',
      value: 'to_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Категория',
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
      alias: 'rc.id',
      isShow: true,
      width: '40',
      value: 'category_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Кол-во',
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
      alias: 'z.count',
      isShow: true,
      width: '40',
      value: 'count',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Стоимость',
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
      alias: 'z.price',
      isShow: true,
      width: '40',
      value: 'price',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'ВДС',
      type: 'checkbox',
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
      alias: 'z.is_debit',
      isShow: true,
      width: '40',
      value: 'is_debit',
      search: {
        field: '',
        isShow: false,
      },
    },
    {
      title: 'Файл счета / чек',
      type: 'download',
      actionCondition: false,
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
      alias: 'z.schet',
      isShow: true,
      width: '40',
      value: 'schet',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          type: 'button',
          url: '$IconDownload',
          function: downloadFile,
          label: 'Скачать',
        },
      ],
    },
    {
      title: 'Закрывающие документы',
      type: 'download',
      actionCondition: false,
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
      alias: 'z.close_schet',
      isShow: true,
      width: '40',
      value: 'close_schet',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          type: 'button',
          url: '$IconDownload',
          function: downloadFile,
          label: 'Скачать',
        },
      ],
    },
    {
      title: 'rek1',
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
      alias: 'z.rek1',
      isShow: true,
      width: '40',
      value: 'rek1',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'rek2',
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
      alias: 'z.rek2',
      isShow: true,
      width: '40',
      value: 'rek2',
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
      alias: 'z.bank_name',
      isShow: true,
      width: '40',
      value: 'bank_name',
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
          function: consoleText,
          label: 'Редактировать',
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
    width: '600px',
    method: 'get',
    alias: 'zayavka',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        path: 'add',
        id: 0,
        name: 'Заявка на расход',
        type: Expenses,
        detail: true,
        lists: [
          { alias: 'status_zr', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'category_zr', filter: [] },
          { alias: 'me', filter: [] },
          { alias: 'type_objects', filter: [] },
          { alias: 'type_pay', filter: [] },
        ],
        alias: 'zayavka',
        active: false,
        fields: [
          selectField({
            label: 'Статус',
            name: 'status_zr',
            requestKey: 'status_id',
            placeholder: '',
            class: [''],
            value: 1,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 6,
            },
            disabled: true,
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'От',
            name: 'status_account_id',
            placeholder: '',
            value: '',
            class: [''],
            disabled: true,
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'Дата статус',
            name: 'date_status',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            disabled: true,
            bootstrapClass: [''],
            // mode: 'edit',
          }),
          stringField({
            label: 'Создана',
            name: 'date_create',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            disabled: true,
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'На себя',
            name: 'on_yourself',
            value: false,
            placeholder: '',
            class: [''],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'on_yourself',
                    value: [true],
                  },
                ],
                filter: [
                  {
                    field: 'me',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'on_yourself',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [1],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [2, 3],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [2],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [3],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            position: {
              cols: 12,
              sm: 12,
            },
            dependence: [
              {
                type: 'default',
                action: {
                  type: 'hideOptions',
                  field: 'on_yourself',
                  targetField: 'type_pay',
                  condition: [
                    {
                      value: true,
                      options: [1],
                    },
                  ],
                },
              },
              {
                type: 'default',
                fillField: [
                  {
                    formKey: 'me',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'name',
                  },
                  {
                    formKey: 'personal_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'name',
                  },
                  {
                    formKey: 'object_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'name',
                  },
                  {
                    formKey: 'permission_accounts_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'name',
                  },
                ],
              },
            ],
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Направление',
            name: 'direction_id',
            alias: 'direction_id',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'personal_zr',
                url: 'get/pagination_list/personal_zr',
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_zr',
                url: 'get/pagination_list/object_zr',
              },
            ],
            // update: {
            //   module: 'selects/getList',
            //   fields: ['permissions_zr'],
            // },
            updateList: [
              {
                alias: 'permissions_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            // updateList: [
            //   {
            //     alias: 'req_zr_id',
            //     filter: [
            //       {
            //         field: 'direction_id',
            //         value: '',
            //       },
            //     ],
            //   },
            // ],
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'ФИО',
            name: 'me',
            placeholder: '',
            class: [''],
            notSend: true,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            putFirst: true,
            disabled: true,
            readonly: true,
            isShow: {
              value: false,
              conditions: [{ field: 'on_yourself', value: [true] }],
            },
            bootstrapClass: [''],
          }),

          radioPanel({
            name: 'vector_id',
            alias: 'vector_id',
            class: ['background-upper'],
            bootstrapClass: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            value: 1,
            default: 1,
            items: [
              {
                text: 'Персонал',
                value: 1,
                id: 1,
              },
              {
                text: 'Объект',
                value: 2,
                id: 2,
              },
              {
                text: 'Аккаунт',
                value: 3,
                id: 3,
              },
            ],
            dependence: [
              {
                type: 'default',
                action: {
                  type: 'hideOptions',
                  field: 'vector_id',
                  targetField: 'type_pay',
                  condition: [
                    {
                      value: 2,
                      options: [1],
                    },
                    {
                      value: 3,
                      options: [1],
                    },
                  ],
                },
              },
            ],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            isShow: {
              value: true,
              conditions: [{ field: 'on_yourself', value: [false] }],
            },
          }),

          autocompleteField({
            label: 'Персонаж',
            name: 'personal_zr',
            requestKey: 'personal_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/personal_zr',
            position: {
              cols: 12,
              sm: 12,
            },
            filter: [
              {
                field: 'direction_id',
                value: '',
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name'],
              },
            ],
            updateList: [
              {
                alias: 'personal_object_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'personal_account_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: true,
              conditions: [
                { field: 'vector_id', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'Объект',
            name: 'personal_object_zr',
            requestKey: 'object_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'personal_account_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['regions_id', 'city_id'],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: true,
              conditions: [
                { field: 'vector_id', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'Руководитель',
            name: 'personal_account_zr',
            requestKey: 'account_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-down'],
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
            // filter: [
            //   {
            //     field: 'direction_id',
            //     value: '',
            //   },
            //   {
            //     field: 'personal_zr',
            //     value: '',
            //   },
            //   {
            //     field: 'personal_object_zr',
            //     value: '',
            //   },
            // ],
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            isShow: {
              value: true,
              conditions: [
                { field: 'vector_id', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Тип объекта',
            name: 'type_objects',
            requestKey: 'type_object',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_zr',
                url: 'get/pagination_list/object_zr',
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [
                { field: 'vector_id', value: [2] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          autocompleteField({
            label: 'Объект',
            name: 'object_zr',
            requestKey: 'object_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-down'],
            page: 1,
            search: '',
            url: 'get/pagination_list/object_zr',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            filter: [
              {
                field: 'direction_id',
                value: '',
              },
              {
                field: 'type_objects',
                value: '',
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name', 'regions_id', 'city_id'],
              },
            ],
            isShow: {
              value: false,
              conditions: [
                { field: 'vector_id', value: [2] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Должность',
            name: 'permissions_zr',
            requestKey: 'permission_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'permission_accounts_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'permissions_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [
                { field: 'vector_id', value: [3] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'ФИО',
            name: 'permission_accounts_zr',
            requestKey: 'account_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-down'],
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
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name'],
              },
            ],
            isShow: {
              value: false,
              conditions: [
                { field: 'vector_id', value: [3] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Категория',
            name: 'category_zr',
            requestKey: 'category_id',
            // alias: 'rashod_category_id',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'rashod_vid',
                filter: [
                  {
                    field: 'category_zr',
                    alias: 'rashod_category_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),

          selectField({
            label: 'Наименование',
            name: 'rashod_vid',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Кол-во',
            name: 'count',
            placeholder: '',
            class: [''],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Стоимость',
            name: 'price',
            placeholder: '',
            class: [''],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'ВДС',
            name: 'vds',
            value: false,
            placeholder: '',
            class: [''],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Точное наименование',
            name: 'exact_name',
            placeholder: '',
            class: [''],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          {
            type: 'btn',
            name: 'btn-decrease',
            id: 'btn-decrease',
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            bootstrapClass: [''],
            label: '-',
            color: 'primary',
            increase: false,
          },
          {
            type: 'btn',
            name: 'btn-increase',
            id: 'btn-increase',
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            bootstrapClass: [''],
            label: '+',
            color: 'success',
            increase: true,
          },

          selectField({
            label: 'Тип оплаты',
            name: 'type_pay',
            alias: 'type_pay',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [1],
                  },
                  {
                    key: 'type_pay',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'vector_id',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'on_yourself',
                    value: [true],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    alias: 'account_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'on_yourself',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Реквизит для оплаты',
            name: 'req_zr_id',
            requestKey: 'rek_id',
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            // brigadirs
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'default',
                fillField: ['rek1', 'rek2', 'bank_id'],
              },
            ],
            isShow: {
              value: true,
              conditions: [{ field: 'type_pay', value: [1, 2, 3] }],
            },
          }),
          dropZoneField({
            label: 'Скан-копия/фото',
            name: 'check_docs',
            notPut: true,
            placeholder: '',
            grouping: 'multiple',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
            options: {
              removeble: true,
              withoutSave: false,
              folder: 'schet',
              name: '`zayavka_schet`',
              paramsForEmit: this,
              countFiles: 10,
            },
            isShow: {
              value: false,
              conditions: [{ field: 'type_pay', value: [4] }],
            },
            value: [],
          }),
          textareaField({
            label: 'Ошибка',
            name: 'error_text',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          textareaField({
            label: 'Примечание',
            name: 'note',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),

          checkboxField({
            name: 'is_migr',
            value:
              store?.state?.user.permission_id === 16 ||
              store?.state?.user.permission_id === 19,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            disabled: true,
            isShow: {
              value: true,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'rek1',
            name: 'rek1',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'rek2',
            name: 'rek2',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'name',
            name: 'name',
            requestKey: 'to_name',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'regions_id',
            name: 'regions_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'city_id',
            name: 'city_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'bank_id',
            name: 'bank_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'disabled',
            name: 'closePopup',
            action: 'closePopup',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/create',
            url: 'create/zayavka',
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
        ],
        formData: {},
      },
      {
        path: 'id',
        id: 1,
        name: 'Заявка на расход',
        type: Expenses,
        detail: true,
        lists: [
          { alias: 'status_zr', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'category_zr', filter: [] },
          { alias: 'account_id', filter: [] },
          { alias: 'type_objects', filter: [] },
          { alias: 'type_pay', filter: [] },
          { alias: 'status_account_id', filter: [] },
          {
            alias: 'rashod_vid',
            filter: [
              {
                field: 'category_zr',
                alias: 'rashod_category_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'personal_object_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'personal_account_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'personal_object_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'permissions_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'permission_accounts_zr',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'permissions_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },

          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [1],
              },
              {
                key: 'payment_type',
                value: [1],
              },
            ],
            filter: [
              {
                field: 'personal_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [1],
              },
              {
                key: 'payment_type',
                value: [2, 3],
              },
            ],
            filter: [
              {
                field: 'personal_account_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [2],
              },
            ],
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'object_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'type_zayavka',
                value: [3],
              },
            ],
            filter: [
              {
                field: 'permission_accounts_zr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'type_zayavka',
                alias: 'vector_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'req_zr_id',
            condition: [
              {
                key: 'on_yourself',
                value: [true],
              },
            ],
            filter: [
              {
                field: 'me',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'is_migr',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'payment_type',
                alias: 'type_pay',
                value: '',
                source: 'formData',
                type: 'num',
              },
              {
                field: 'on_yourself',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'me',
            condition: [
              {
                key: 'on_yourself',
                value: [true],
              },
            ],
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
        alias: 'zayavka',
        active: false,
        fields: [
          selectField({
            label: 'Статус',
            name: 'status',
            alias: 'status_zr',
            placeholder: '',
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 6,
            },
            readonly: {
              value: false,
              condition: [
                {
                  funcCondition: (context) =>
                    context.originalData.from_account_id !==
                      context.store.state.user.id &&
                    context.store.state.user.is_personal_vertical &&
                    (context.originalData.status === 1 ||
                      context.originalData.status === 2 ||
                      context.originalData.status === 3),
                  type: false,
                },
              ],
            },
            hiding: {
              conditions: [
                {
                  target: 'formData',
                  field: 'status',
                  value: [1, 2, 3],
                  values: [1, 2, 3],
                },
              ],
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'От',
            name: 'status_account_id',
            placeholder: '',
            value: '',
            class: [''],
            readonly: true,
            disabled: true,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'Дата статус',
            name: 'date_status',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            disabled: true,
            bootstrapClass: [''],
            // mode: 'edit',
          }),
          stringField({
            label: 'Создана',
            name: 'date_create',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            disabled: true,
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'На себя',
            name: 'on_yourself',
            value: false,
            placeholder: '',
            class: [''],
            readonly: {
              value: false,
              condition: [
                {
                  funcCondition: (context) =>
                    context.originalData.account_id !==
                    context.store.state.user.id,
                  type: false,
                },
              ],
            },
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'on_yourself',
                    value: [true],
                  },
                ],
                filter: [
                  {
                    field: 'me',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'on_yourself',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [1],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [2, 3],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [2],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [3],
                  },
                  {
                    key: 'on_yourself',
                    value: [false],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'me',
                condition: [
                  {
                    key: 'on_yourself',
                    value: [true],
                  },
                ],
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
            dependence: [
              {
                type: 'default',
                action: {
                  type: 'hideOptions',
                  field: 'on_yourself',
                  targetField: 'type_pay',
                  condition: [
                    {
                      value: true,
                      options: [1],
                    },
                  ],
                },
              },
              {
                type: 'default',
                fillField: [
                  {
                    formKey: 'account_id',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'to_name',
                  },
                  {
                    formKey: 'personal_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'to_name',
                  },
                  {
                    formKey: 'object_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'to_name',
                  },
                  {
                    formKey: 'permission_accounts_zr',
                    compareKey: 'id',
                    objectKey: 'name',
                    targetKey: 'to_name',
                  },
                ],
              },
            ],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Направление',
            name: 'direction_id',
            placeholder: '',
            class: [''],
            value: '',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'personal_zr',
                url: 'get/pagination_list/personal_zr',
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_zr',
                url: 'get/pagination_list/object_zr',
              },
            ],
            updateList: [
              {
                alias: 'permissions_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'ФИО',
            name: 'account_id',
            alias: 'me',
            requestKey: 'me',
            placeholder: '',
            class: [''],
            notSend: true,
            readonly: true,
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            putFirst: true,
            disabled: true,
            isShow: {
              value: false,
              conditions: [{ field: 'on_yourself', value: [true] }],
            },
            bootstrapClass: [''],
          }),

          radioPanel({
            name: 'type_zayavka',
            alias: 'vector_id',
            requestKey: 'vector_id',
            class: ['background-upper'],
            bootstrapClass: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            value: 1,
            default: 1,
            items: [
              {
                text: 'Персонал',
                value: 1,
                id: 1,
              },
              {
                text: 'Объект',
                value: 2,
                id: 2,
              },
              {
                text: 'Аккаунт',
                value: 3,
                id: 3,
              },
            ],
            dependence: [
              {
                type: 'default',
                action: {
                  type: 'hideOptions',
                  field: 'type_zayavka',
                  targetField: 'payment_type',
                  condition: [
                    {
                      value: 2,
                      options: [1],
                    },
                    {
                      value: 3,
                      options: [1],
                    },
                  ],
                },
              },
            ],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            isShow: {
              value: true,
              conditions: [{ field: 'on_yourself', value: [false] }],
            },
          }),

          autocompleteField({
            label: 'Персонаж',
            name: 'personal_zr',
            requestKey: 'personal_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/personal_zr',
            position: {
              cols: 12,
              sm: 12,
            },
            filter: [
              {
                field: 'direction_id',
                value: '',
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name'],
              },
            ],
            updateList: [
              {
                alias: 'personal_object_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'personal_account_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: true,
              conditions: [
                { field: 'type_zayavka', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'Объект',
            name: 'personal_object_zr',
            requestKey: 'object_id',
            // subtype: 'single',
            subtype: 'single',
            placeholder: '',
            class: ['background-middle'],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'personal_account_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['regions_id', 'city_id'],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: true,
              conditions: [
                { field: 'type_zayavka', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'Руководитель',
            name: 'personal_account_zr',
            requestKey: 'account_id',
            // subtype: 'single',
            subtype: 'single',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            placeholder: '',
            class: ['background-down'],
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
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            isShow: {
              value: true,
              conditions: [
                { field: 'type_zayavka', value: [1] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Тип объекта',
            name: 'type_objects',
            requestKey: 'type_object',
            // subtype: 'single',
            subtype: 'single',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_zr',
                url: 'get/pagination_list/object_zr',
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [
                { field: 'type_zayavka', value: [2] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          autocompleteField({
            label: 'Объект',
            name: 'object_zr',
            requestKey: 'object_id',
            // subtype: 'single',
            subtype: 'single',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            placeholder: '',
            class: ['background-down'],
            page: 1,
            search: '',
            url: 'get/pagination_list/object_zr',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            filter: [
              {
                field: 'direction_id',
                value: '',
              },
              {
                field: 'type_objects',
                value: '',
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name', 'regions_id', 'city_id'],
              },
            ],
            isShow: {
              value: false,
              conditions: [
                { field: 'type_zayavka', value: [2] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Должность',
            name: 'permissions_zr',
            requestKey: 'permission_id',
            // subtype: 'single',
            subtype: 'single',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            placeholder: '',
            class: ['background-middle'],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'permission_accounts_zr',
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'permissions_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [
                { field: 'type_zayavka', value: [3] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),
          selectField({
            label: 'ФИО',
            name: 'permission_accounts_zr',
            requestKey: 'account_id',
            // subtype: 'single',
            subtype: 'single',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            placeholder: '',
            class: ['background-down'],
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
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['name'],
              },
            ],
            isShow: {
              value: false,
              conditions: [
                { field: 'type_zayavka', value: [3] },
                { field: 'on_yourself', value: [false] },
              ],
            },
          }),

          selectField({
            label: 'Категория',
            name: 'rashod_category_id',
            alias: 'category_zr',
            // name: 'rashod_category_id',
            requestKey: 'category_id',
            placeholder: '',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'rashod_vid',
                filter: [
                  {
                    field: 'category_zr',
                    alias: 'rashod_category_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),

          selectField({
            label: 'Наименование',
            name: 'rashod_vid',
            prescription_name: 'rashod_vid_id',
            placeholder: '',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            class: [''],
            value: '',
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            prescription: 'items',
            notSend: true,
            position: {
              cols: 12,
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Кол-во',
            name: 'count',
            prescription_name: 'count',
            placeholder: '',
            class: [''],
            prescription: 'items',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Стоимость',
            name: 'price',
            prescription_name: 'price',
            placeholder: '',
            class: [''],
            prescription: 'items',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'ВДС',
            name: 'vds',
            prescription_name: 'is_debit',
            value: false,
            placeholder: '',
            class: [''],
            prescription: 'items',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            notSend: true,
            position: {
              cols: 12,
              sm: 2,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Точное наименование',
            name: 'exact_name',
            prescription_name: 'name',
            placeholder: '',
            class: [''],
            prescription: 'items',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            notSend: true,
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          {
            type: 'btn',
            name: 'btn-decrease',
            id: 'btn-decrease',
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            bootstrapClass: [''],
            label: '-',
            color: 'primary',
            increase: false,
          },
          {
            type: 'btn',
            name: 'btn-increase',
            id: 'btn-increase',
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            bootstrapClass: [''],
            label: '+',
            color: 'success',
            increase: true,
          },

          selectField({
            label: 'Тип оплаты',
            name: 'payment_type',
            alias: 'type_pay',
            requestKey: 'type_pay',
            placeholder: '',
            class: [''],
            value: '',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1, 6],
                  type: false,
                },
              ],
            },
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 12,
            },
            updateList: [
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [1],
                  },
                ],
                filter: [
                  {
                    field: 'personal_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [1],
                  },
                  {
                    key: 'payment_type',
                    value: [2, 3],
                  },
                ],
                filter: [
                  {
                    field: 'personal_account_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [2],
                  },
                ],
                filter: [
                  {
                    field: 'direction_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'type_zayavka',
                    value: [3],
                  },
                ],
                filter: [
                  {
                    field: 'permission_accounts_zr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'type_zayavka',
                    alias: 'vector_id',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
              {
                alias: 'req_zr_id',
                condition: [
                  {
                    key: 'on_yourself',
                    value: [true],
                  },
                ],
                filter: [
                  {
                    field: 'me',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'is_migr',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'payment_type',
                    alias: 'type_pay',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'on_yourself',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                ],
              },
            ],
            validations: { required },
            bootstrapClass: [''],
          }),
          selectField({
            label: 'Реквизит для оплаты',
            name: 'rek_id',
            alias: 'req_zr_id',
            subtype: 'single',
            placeholder: '',
            class: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1, 6],
                  type: false,
                },
              ],
            },
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            // brigadirs
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'default',
                fillField: ['rek1', 'rek2', 'bank_id'],
              },
            ],
            isShow: {
              value: false,
              conditions: [{ field: 'payment_type', value: [1, 2, 3] }],
            },
          }),
          dropZoneField({
            label: 'Скан-копия/фото',
            name: 'check_docs',
            notPut: true,
            placeholder: '',
            grouping: 'multiple',
            stash: 'schet',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1, 6],
                  type: false,
                },
              ],
            },
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            // validations: { required },
            options: {
              removeble: true,
              withoutSave: false,
              folder: 'schet',
              name: '`zayavka_schet`',
              paramsForEmit: this,
              countFiles: 10,
            },
            isShow: {
              value: false,
              conditions: [{ field: 'payment_type', value: [4] }],
            },
            value: [],
          }),
          {
            type: 'schet',
            name: 'schet',
            id: 'schet',
            disable: false,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 12 },
            notSend: true,
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1, 6],
                  type: false,
                },
              ],
            },
            isShow: {
              value: false,
              conditions: [{ field: 'payment_type', value: [4] }],
            },
            bootstrapClass: [''],
          },
          textareaField({
            label: 'Ошибка',
            name: 'error_text',
            alias: 'pd.note',
            placeholder: '',
            class: [''],
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  permissions: [12],
                  value: [5],
                  type: false,
                },
              ],
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          textareaField({
            label: 'Примечание',
            name: 'note',
            alias: 'pd.note',
            placeholder: '',
            readonly: {
              value: false,
              condition: [
                {
                  target: 'originalData',
                  field: 'status',
                  value: [1],
                  type: false,
                },
              ],
            },
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),

          checkboxField({
            name: 'is_migr',
            value:
              store?.state?.user.permission_id === 16 ||
              store?.state?.user.permission_id === 19,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            disabled: true,
            isShow: {
              value: true,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'rek1',
            name: 'rek1',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'rek2',
            name: 'rek2',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'name',
            name: 'to_name',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'region_id',
            name: 'region_id',
            requestKey: 'regions_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'city_id',
            name: 'city_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'bank_id',
            name: 'bank_id',
            requestType: 'number',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: true,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'disabled',
            name: 'closePopup',
            action: 'closePopup',
            skipValidation: true,
          }),
          stringAction({
            text: 'Исправлено',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'correct/zayavka',
            action: 'saveFormId',
            color: 'primary',
            // isHide: false,
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'status',
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
            color: 'primary',
            module: 'form/putForm',
            url: 'update/zayavka',
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'customFormStore',
            action: 'customFormStore',
          }),
        ],
        formData: {},
      },
      {
        id: 2,
        path: 'load',
        name: 'load',
        type: FormDefault,
        detail: true,
        alias: 'personal',
        active: false,
        fields: [
          dropZoneField({
            label: 'Файл',
            name: 'file_path',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
            options: {
              withoutSave: false,
              folder: 'accounting',
              name: '`accounting_zayavka`',
              paramsForEmit: this,
            },
            value: [],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'zayavka',
            skipValidation: true,
          }),
          stringAction({
            text: 'Загрузить',
            type: 'submit',
            module: 'table/loadStatus',
            url: 'accounting/zayavka/import',
            successMessage: false,
            name: 'saveForm',
            action: 'saveFormStore',
          }),
          //stringAction({
          //  text: 'Сохранить',
          //  type: 'submit',
          //  module: '',
          //  name: 'saveForm',
          //  //action: 'saveForm',
          //  nextForm: true,
          //}),
        ],
      },
    ],
    activeTab: null,
  },
  filters,
}

export default config
