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
    url: 'get/pagination/taxi',
    title: 'Новые',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
    ],
    date: true,
  },
  head: [
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
      alias: 'o.name',
      value: 'account_name',
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
      alias: 'o.name',
      value: 'date',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Время с',
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
      value: 'time_from',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Время по',
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
      value: 'time_to',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'o.name',
      value: 'tarif',
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
      alias: 'o.name',
      value: 'price',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Оплата',
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
      value: 'card',
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
    footer: null,
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

export default config
