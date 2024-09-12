import filters from './filters'
import {
  required,
  numeric,
  number,
  minLength,
  maxLength,
} from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textareaField,
  colorPicker,
  textBlock,
  // dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import _ from 'lodash'

import tableAccountBank from './config/table-account-bank.js'
import formAccountEdit from './config/form-account-edit.js'
import formAccountAdd from './config/form-account-add.js'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

const consumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    // headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/payment',
    urlDetail: 'account_id',
    alias: 'p.account_id',
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
      alias: 'p.id',
      value: 'id',
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
  detail: undefined,
  filters: _.cloneDeep(filters),
}

const config = {
  title: 'Добавление аккаунта',
  activeTab: 2,
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        // headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/account_active',
        title: 'Активные',
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
          {
            label: 'Добавить',
            class: ['v-table-button--custom'],
            url: '$IconSetting',
            type: 'addItem',
            //function: consolePanel,
            backgroundColor: '#fff',
            isShow: {
              condition: [
                // {
                //   // permissions: [1],
                //   vertical: true,
                //   type: true,
                // },
                {
                  funcCondition: (ctx) => {
                    return !(
                      ctx.store.state.user.permission_id === 1 &&
                      !!_.intersection([2], ctx.directions.value).length
                    )
                  },
                  type: true,
                },
              ],
            },
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
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          alias: 'sa.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'sp.name',
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
          alias: 'sa.telefon',
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
          alias: 'sa.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
        },
        //{
        //  title: 'Направление',
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
        //  value: 'direction_json',
        //  alias: 'p.direction_json',
        //  search: {
        //    field: '',
        //    isShow: true,
        //  },
        //},
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
        // {
        //   title: 'Действия',
        //   type: 'actions',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'right',
        //   },
        // },
        // {
        //   title: 'Действия',
        //   type: 'actions',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'right',
        //   },
        //   isShow: true,
        //   width: '100',
        //   value: 'actions',
        //   actions: [
        //     {
        //       type: 'button',
        //       url: '$IconEdit',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //     {
        //       type: 'button',
        //       url: '$IconDelete',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //   ],
        // },
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
        alias: 'account',
        url: '/get/form/',
        name: 'Добавление аккаунта',
        getOnClose: true,
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...[formAccountEdit, formAccountAdd], tableAccountBank],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
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
          //{
          //  label: 'Добавить',
          //  class: ['v-table-button--custom'],
          //  url: '$IconSetting',
          //  function: consolePanel,
          //  backgroundColor: '#fff',
          //},
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
          alias: 'sa.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'sp.name',
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
          alias: 'sa.telefon',
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
          alias: 'sa.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Направление',
        //   type: 'default',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: undefined,
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
        //   width: '150',
        //   value: 'direction_json',
        //   alias: 'p.direction_json',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        // {
        //   title: 'Роль',
        //   type: 'default',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: undefined,
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
        //   width: '150',
        //   value: 'permission_name',
        //   alias: 'p.permission_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
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
          alias: 'sa.comment',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Действия',
        //   type: 'actions',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'right',
        //   },
        //   isShow: true,
        //   width: '100',
        //   value: 'actions',
        //   actions: [
        //     {
        //       type: 'button',
        //       url: '$IconEdit',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //     {
        //       type: 'button',
        //       url: '$IconDelete',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //   ],
        // },
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
        alias: 'account3',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          ...[formAccountEdit],
          {
            id: 1,
            name: 'Расход',
            type: 'TableDefault',
            active: false,
            config: consumptionConfig,
          },
        ],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
  ],
}

export default config
