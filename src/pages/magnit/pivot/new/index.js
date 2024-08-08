import filters from './filters'
import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  // autocompleteField,
  dateField,
  checkboxField,
  dropZoneField,
} from '@/utils/fields.js'
import _ from 'lodash'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormOutput from '@/components/Form/output/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'
import { editFields as appointmentsFields } from '@/pages/appointments/index.js'
// import { fieldsBaseDefaultForm as personalFields } from '@/pages/personal/index.js'
// import { defaultForm as personalConfig } from '@/pages/personal/index'
// import { defaultForm as objectConfig } from '@/pages/object/index.js'

// const changeActionTo = (array, oldPath, newPath) => {
//   array.forEach((tab) => {
//     if (tab.path === oldPath) {
//       tab.path = newPath
//     }
//   })
// }

// const personalConfigForms = _.cloneDeep(personalConfig)
// const objectConfigForm = _.cloneDeep(objectConfig)

// changeActionTo(personalConfigForms, 'edit', 'edit-personal')
// changeActionTo(objectConfigForm, 'edit', 'edit-object')

import formMagnitZayavka from './config/form-magnit-zayavka.js'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

export const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/request_magnit_new',
    title: 'Новые',
    // doubleHandlerType: 'cell',
  },
  type: 'TableFixed',
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Парсер заявка',
        class: ['v-table-button--custom'],
        url: 'magnit_pivot-zayavka',
        type: 'changeUrl',
        backgroundColor: '#fff',
        isShow: {
          condition: [
            {
              permissions: [3, 4, 8, 17],
              type: true,
            },
          ],
        },
      },
    ],
    filters: true,
    search: true,
    date: true,
    addedItemsChildrenType: 'object',
  },
  head: [
    {
      id: 1,
      title: 'Объект',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'o.name',
      value: 'object_name',
      fixed: {
        value: true,
        position: 'left',
      },
      search: {
        field: '',
        isShow: true,
      },
      sorts: [
        {
          type: 'string',
          default: '',
          value: '',
          isShow: false,
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
    footer: null,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '800px',
    method: 'get',
    alias: 'personal',
    url: '/get/form/',
    name: 'Выработка X5',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [formMagnitZayavka],
    activeTab: null,
  },
  filters,
}

export default config
