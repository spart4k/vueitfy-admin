import filters from './filters'
import filtersTarif from './filtersTarif'
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
import Rates from '@/components/Form/rates/default/index.vue'
import { userKeys } from '@/pages'

import formObjectEdit from './config/form-object-edit.js'
import formObjectRates from './config/form-object-rates.js'
import tableObjectUnassigned from './config/table-object-unassigned.js'
import formObjectTarif from './config/form-object-tarif.js'
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

export const config = {
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
                  permissions: [2, 4, 3, 15],
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
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/object_price',
        title: 'Тарифы',
      },
      type: 'TableDefault',
      isShow: {
        condition: [
          {
            funcComputed: (context) => {
              const directions = JSON.parse(
                context.store.state.user.direction_json
              )
              return directions.includes(2)
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
          {
            label: 'Смена тарифа',
            class: ['v-table-button--custom'],
            url: 'object-tarif',
            type: 'changeUrl',
            backgroundColor: '#ffffff',
          },
          {
            label: 'Выгрузить тариф',
            class: ['v-table-button--custom'],
            url: '$IconSetting',
            backgroundColor: '#fff',
            type: 'sendPage',
            requestUrl: 'report/object_price/xls/list',
          },
          {
            label: 'Загрузить тариф',
            class: ['v-table-button--custom'],
            backgroundColor: '#fff',
            type: 'changeUrl',
            url: 'object-load',
          },
        ],
      },
      head: [
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
          alias: 'o.name',
          isShow: true,
          width: '40',
          value: 'object_name',
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
          alias: 'd.name',
          value: 'doljnost_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Тариф',
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
          alias: 'op.price',
          value: 'price',
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
          value: 'category',
          alias: 'op.category',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Активен с',
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
          value: 'date_active_s',
          alias: 'op.date_active_s',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Активен по',
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
          value: 'date_active_po',
          alias: 'op.date_active_po',
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
        tabs: [formObjectTarif],
        activeTab: null,
      },
      filters: _.cloneDeep(filtersTarif),
    },
  ],
}

export default config
