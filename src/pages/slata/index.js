import filters from './filters'
import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textBlock,
  dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import FormList from '@/components/Form/list/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import { userKeys } from '@/pages'
import { ref } from 'vue'
import axios from 'axios'

const config = {
  title: 'Персонал',
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      //   function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/slata_report',
    title: 'Новые',
  },
  type: TableDefault,
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
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   // function: consolePanel,
      //   backgroundColor: '#fff',
      // },
      {
        label: 'Приложение 2',
        class: ['v-table-button--custom'],
        type: 'getFilters',
        url: 'slata/report/2',
        backgroundColor: '#fff',
      },
      {
        label: 'Приложение 3',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Приложение 7',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Приложение 8',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Табель X-C',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        backgroundColor: '#fff',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'o.name',
      value: 'object_name',
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
      title: 'Менеджер',
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
      alias: 'sa.name',
      value: 'account_name',
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
      alias: 'pers.name',
      value: 'objecpersonal_namet_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Услуга',
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
      title: 'Дата',
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
      alias: 'p.date_target',
      value: 'date_target',
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
      alias: 'p.hour',
      value: 'hour',
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
      alias: 'p.total',
      value: 'total',
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
    name: 'test',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: 'test',
    activeTab: null,
  },
  filters,
}

console.log(config)
export default config
