import filters from './filters'
import { required } from '@/utils/validation.js'
import _ from 'lodash'
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
import Rates from '@/components/Form/rates/default/index.vue'
import { userKeys } from '@/pages'

import formObjectEdit from './config/form-object-edit.js'
import formObjectRates from './config/form-object-rates.js'
import tableObjectUnassigned from './config/table-object-unassigned.js'

import formObjectAdd from './config/form-object-add.js'
import formObjectAppoint from './config/form-object-appoint.js'
import tableObjectPayment from './config/table-object-payment.js'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

export const objectTabs = [
  formObjectEdit,
  formObjectRates,
  tableObjectUnassigned,
]

const config = {
  title: 'Объекты',
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
            backgroundColor: '#fff',
            isShow: {
              condition: [
                {
                  permissions: [4, 3],
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
          alias: 'o.name',
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
          alias: 'o.address',
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
          alias: 'd.name',
          value: 'directions',
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
          alias: 'o.tel_director',
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
          alias: 'o.square',
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
        width: '600px',
        method: 'get',
        alias: 'object_active',
        url: '/get/form/',
        name: 'Объекты - добавления',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [formObjectAdd, ...objectTabs],
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
        url: 'get/pagination/object_unassigned',
        title: 'Неназначенные',
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
                  vertical: true,
                  type: true,
                },
                {
                  permissions: [13],
                  type: false,
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
          alias: 'o.name',
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
          alias: 'o.address',
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
          alias: 'd.name',
          value: 'directions',
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
          alias: 'o.tel_director',
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
          alias: 'o.square',
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
        width: '600px',
        method: 'get',
        alias: 'object',
        url: '/get/form/',
        name: 'Назначить',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [formObjectAppoint, ...objectTabs],
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
        url: 'get/pagination/object_archive',
        title: 'Архив',
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
          alias: 'o.name',
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
          alias: 'o.address',
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
          alias: 'd.name',
          value: 'directions',
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
          alias: 'o.tel_director',
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
          alias: 'o.square',
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
        alias: 'object',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [...objectTabs, tableObjectPayment],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
  ],
}

export default config
