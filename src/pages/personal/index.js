/* eslint-disable */

import filters from './filters'
import { required, nameLength } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textBlock,
  textareaField,
  dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/form/default/index.vue'
import FormDocuments from '@/components/form/documents/default/index.vue'
import FormList from '@/components/form/list/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
// import useNavigation from '@/compositions/useNavigation'
import { userKeys } from '@/pages'

// const { addOrUpdateURLParam } = useNavigation({})

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

// function addQuery() {
//   // addOrUpdateURLParam('target_id', 'add')
// }

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
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ]
}

const debetorConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_debit',
    urlDetail: 'personal_id',
    alias: 'd.debtor_id',
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
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ]
}

const documentConfigEdit = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    alias: 'personal_id',
    title: 'This is an about page1',
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
        url: 'personal/:id/new',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'Тип документа',
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
      alias: 'pds.name',
      isShow: true,
      width: '40',
      value: 'doc_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Скан-копия/фото',
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
      value: 'path_doc',
      alias: 'pd.path_doc',
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
      alias: 'pd.note',
      value: 'comment',
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
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'personal_doc',
    url: '/get/form/',
    requstId: 'object_id',
    name: 'Персонал',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'object_id',
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc_25`',
              paramsForEmit: this,
            },
            value: '',
          }),
          textareaField({
            label: 'Примечание:',
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
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/update',
            url: 'set/data/personal_doc',
            useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }, { requestKey: 'id', storageKey: 'object_id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'updateFormStore',
            action: 'updateFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal/:id',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
      {
        path: 'new',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc_25`',
              paramsForEmit: this,
            },
            value: '',
          }),
          textareaField({
            label: 'Примечание:',
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
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'personal/createForm',
            url: 'set/data/personal_doc',
            useRouteKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal/:id',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
    ],
  },
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'text',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
  filters,
}

const documentConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_doc',
    alias: 'personal_id',
    title: 'This is an about page1',
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
        url: 'personal-add-new',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'Тип документа',
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
      alias: 'pds.name',
      isShow: true,
      width: '40',
      value: 'doc_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Скан-копия/фото',
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
      value: 'path_doc',
      alias: 'pd.path_doc',
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
      alias: 'pd.note',
      value: 'comment',
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
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'personal_doc',
    url: '/get/form/',
    name: 'Персонал',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'id',
        id: 0,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc_25`',
              paramsForEmit: this,
            },
            value: '',
          }),
          textareaField({
            label: 'Примечание:',
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
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/update',
            url: 'set/data/personal_doc',
            useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'updateFormStore',
            action: 'updateFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal-add',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
      {
        path: 'new',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'documents', filter: [] }],
        alias: 'personal_doc',
        active: false,
        fields: [
          selectField({
            label: 'Тип документа',
            name: 'doc_id',
            alias: 'documents',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Скан-копия/фото:',
            name: 'path_doc',
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
              removeble: true,
              withoutSave: false,
              folder: 'personal_doc',
              name: '`personal_doc_25`',
              paramsForEmit: this,
            },
            value: '',
          }),
          checkboxField({
            label: '',
            name: 'from_document_prishel',
            value: true,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            isShow: {
              value: true,
            },
            bootstrapClass: [''],
          }),
          textareaField({
            label: 'Примечание:',
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
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'personal/createForm',
            url: 'set/data/personal_doc',
            useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormStore',
            action: 'saveFormStore',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal-add',
            skipValidation: true,
          }),
        ],
        formData: {},
      },
    ],
  },
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
    alias: 'pd.personal_id',
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
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ]
}

const bankConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_bank',
    urlDetail: 'personal_id',
    alias: 'pb.personal_id',
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
      title: 'Приоритет',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: undefined,
      },
      sorts: [
        {
          type: 'boolean',
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
      isShow: true,
      width: '90',
      alias: 'pers.name',
      value: 'bank_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Номер счета',
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
      value: 'invoice',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Карта на ФИО',
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
      value: 'fio',
      alias: 'p.hour',
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
          type: 'date',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '150',
      alias: 'd.name',
      value: 'comment',
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
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ]
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
  actions: [
    stringAction({
      text: 'Закрыть',
      type: 'submit',
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'personal',
      skipValidation: true,
    }),
  ],
}

const editFormPermissions = {
  // Бригадир(id = 13) - все readonly
  brigadir: {
    permissions: [13],
    type: true,
  },
  //  Менеджер(id = 1) - если направление логистика, то может менять доступ, остальное readonly, если направление розница, то все поля readonly
  manager: [
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [1],
      type: false,
    },
    {
      permissions: [1],
      field: 'direction_json',
      target: 'formData',
      array: true,
      value: [2],
      type: true,
    },
  ],
  //  Рук. фил.(id = 15), ЦУП(id = 2), Директор(id = 3) - может менять телефон, доступ, остальное readonly
  rukFIlCUPDirector: {
    access: {
      permissions: [15, 2, 3],
      type: false,
    },
    denied: {
      permissions: [15, 2, 3],
      type: true,
    },
  },
  DBA: {
    access: {
      permissions: [4],
      type: false,
    },
    denied: {
      permissions: [4],
      type: true,
    }
  },
  OBDandOKK: {
    access: {
      permissions: [7, 8],
      type: false,
    },
    denied: {
      permissions: [7, 8],
      type: true,
    }
  }
}

const defaultForm = [
  {
    id: 0,
    path: 'edit',
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      { alias: 'user_keys', filter: [] },
      { alias: 'habitation_id', filter: [] },
      { alias: 'account_id', filter: [] },
      { alias: 'direction_id', filter: [] },
      { alias: 'grajdanstvo_id', filter: [] },
      // 'user_keys',
      // 'habitation_id',
      // 'account_id',
      // 'direction_id',
      // 'grajdanstvo_id',
    ],
    alias: 'personal',
    active: false,
    fields: [
      stringField({
        label: 'ФИО',
        name: 'name',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      stringField({
        label: 'Телефон',
        name: 'telefon',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.access,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
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
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      stringField({
        label: 'Примечание',
        name: 'comment',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      dateField({
        label: ' Дата рождения',
        name: 'data_rojd',
        subtype: 'date',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        validations: { required },
        bootstrapClass: ['changeSelect'],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
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
          sm: 6,
        },
        //validations: { required },
        bootstrapClass: [''],
        readonly: true,
        //readonly: {
        //  value: false,
        //  condition: [
        //    editFormPermissions.brigadir,
        //    editFormPermissions.manager[1],
        //    editFormPermissions.rukFIlCUPDirector.denied,
        //    editFormPermissions.DBA.access,
        //    editFormPermissions.OBDandOKK.access,
        //  ],
        //},
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
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.denied,
          ],
        },
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
          sm: 6,
        },
        validations: { required },
        bootstrapClass: [''],
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            ...editFormPermissions.manager,
            editFormPermissions.rukFIlCUPDirector.access,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.denied,
          ],
        },
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
          sm: 6,
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
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.denied,
            editFormPermissions.OBDandOKK.access,
          ],
        },
      }),
      checkboxField({
        label: 'Штатный',
        name: 'in_state',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
        readonly: {
          value: false,
          condition: [
            editFormPermissions.brigadir,
            editFormPermissions.manager[1],
            editFormPermissions.rukFIlCUPDirector.denied,
            editFormPermissions.DBA.access,
            editFormPermissions.OBDandOKK.access,
          ],
        },
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
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
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
    id: 2,
    path: 'edit',
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
        text: 'Закрыть',
        type: 'submit',
        color: 'disabled',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
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
    path: 'edit',
    id: 3,
    name: 'Сканы',
    type: TableDefault,
    active: false,
    config: documentConfigEdit,
  },
  {
    path: 'edit',
    id: 7,
    name: 'Банковские карты',
    type: TableDefault,
    active: false,
    config: bankConfig,
  },
  {
    path: 'edit',
    id: 4,
    name: 'Начисления и выплаты',
    type: TableDefault,
    active: false,
    config: paymentConfig,
  },
  {
    path: 'edit',
    id: 1,
    name: 'Расход',
    type: TableDefault,
    active: false,
    config: consumptionConfig,
  },
  {
    path: 'edit',
    id: 6,
    name: 'Задолженность',
    type: TableDefault,
    active: false,
    config: debetorConfig,
  },
  {
    path: 'add',
    id: 5,
    name: 'Заявка на персонал',
    type: 'FormStage',
    detail: true,
    setRoute: 'personal-add',
    stages: [
      {
        id: 0,
        name: 'Основные0',
        type: FormDefault,
        detail: true,
        lists: [
          // 'vid_vedomost_id',
          // 'status_pt',
          { alias: 'direction_id_logistic', filter: [] },
          { alias: 'grajdanstvo_id', filter: [] },
          // { alias: 'brigadirs', filter: [] },
          // 'shifts',
          // 'nutritions',
        ],
        alias: 'personal_target',
        active: false,
        fields: [
          stringField({
            label: 'ФИО',
            name: 'fio',
            placeholder: '',
            value: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dateField({
            label: 'Дата рождения',
            name: 'date_rojd',
            type: 'date',
            value: '',
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
            //mode: 'edit',
          }),
          selectField({
            label: 'Направления',
            name: 'direction_id',
            alias: 'direction_id_logistic',
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
            validations: { required },
            bootstrapClass: [''],
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'object_id',
                url: 'get/pagination_list/object_logistic',
                alias: 'object_id'
              },
            ],
          }),
          autocompleteField({
            label: 'Объект',
            name: 'object_id',
            alias: 'object_json',
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
            url: 'get/pagination_list/object_logistic',
            // object
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            filters: [
              {
                field: 'direction_id',
                value: '',
              },
            ],
            dependence: [
              {
                type: 'default',
                fillField: ['city_id', 'regions_id'],
              },
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'personal_id',
                url: 'get/pagination_list/brigadirs',
              },
            ],
            // updateList: [
            //   {
            //     alias: 'brigadirs',
            //     filter: [
            //       {
            //         field: 'object_id',
            //         value: '',
            //         source: 'formData',
            //         type: 'array',
            //       },
            //     ],
            //   },
            // ],
            update: {
              module: 'selects/getList',
              fields: ['personal_id'],
            },
            isShow: {
              value: false,
              conditions: [{ field: 'direction_id', value: [1, 6] }],
            },
          }),
          stringField({
            label: '',
            name: 'city_id',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            isShow: {
              value: true,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: '',
            name: 'regions_id',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            isShow: {
              value: true,
              // hide: true,
            },
            bootstrapClass: [''],
          }),
          autocompleteField({
            label: 'Бригадир',
            name: 'personal_id',
            requestKey: 'account_json',
            // subtype: 'single',
            subtype: 'multiple',
            stringify: true,
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/brigadirs',
            // brigadirs
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            filters: [
              {
                field: 'object_id',
                alias: 'object_json',
                value: '',
                type: 'array'
              },
              {
                field: 'direction_id',
                alias: 'direction_json',
                value: '',
                type: 'array'
              },
            ],
            isShow: {
              value: false,
              conditions: [{ field: 'direction_id', value: [1, 6] }],
            },
          }),
          selectField({
            label: 'Гражданство',
            name: 'grajdanstvo_id',
            alias: 'grajdanstvo_id',
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
            validations: { required },
            bootstrapClass: [''],
            update: {
              module: 'selects/getList',
              fields: ['object_id'],
            },
          }),
          checkboxField({
            label: 'Трансфер',
            name: 'transfer',
            value: false,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Адрес А',
            name: 'start_point',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required, nameLength },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
            },
          }),
          stringField({
            label: 'Адрес Б',
            name: 'end_point',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required, nameLength },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [{ field: 'transfer', value: [true] }],
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
            to: 'personal',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            // action: 'nextStage',
            module: 'form/create',
            url: 'create/unfinished_personal',
            name: 'nextStage',
            action: 'nextStage',
            conditionCode: {
              key: 'code',
              results: [
                {
                  value: 1,
                  type: 'success',
                  toStorage: ['id'],
                },
                {
                  value: 2,
                  type: 'error',
                  text: 'Error: value 2',
                },
                {
                  value: 3,
                  type: 'error',
                  text: 'Error: value 3',
                },
              ],
            },
          }),
        ],
        formData: {},
      },
      {
        id: 1,
        name: 'Документы',
        type: TableDefault,
        active: false,
        config: documentConfig,
        actions: [
          stringAction({
            text: 'Оставить заявку',
            type: 'submit',
            color: 'primary',
            module: 'form/create',
            url: 'query/personal',
            to: 'personal',
            name: 'createForm',
            action: 'createForm',
            skipValidation: true,
            requestBody: {
              store: [
                { requestKey: 'manager_id', storageKey: 'user.user.id' },
                { requestKey: 'personal_id', storageKey: 'formStorage.id' },
              ],
              static: { type_parent_action: 3, parent_action: 1 },
              formData: [
                'direction_id',
                'object_id',
                'grajdanstvo_id',
                'transfer',
                'start_point',
                'end_point',
                'city_id',
                'regions_id',
              ],
            },
            conditionCode: {
              key: 'code',
              results: [
                {
                  value: 1,
                  type: 'success',
                  emit: 'closePopup',
                  to: 'personal',
                },
                {
                  value: 2,
                  type: 'error',
                  text: 'Необходимо приложить паспорт',
                },
              ],
            },
            // nextForm: true,
          }),
          stringAction({
            text: 'Вернуться',
            type: 'submit',
            color: 'disabled',
            module: 'form/del',
            url: 'delete/unfinished_personal',
            name: 'prevStage',
            action: 'prevStage',
            // conditionCode: {
            //   key: 'code',
            //   results: [
            //     {
            //       value: 1,
            //       type: 'success',
            //       fromStorage: ['id'],
            //     },
            //   ],
            // },
          }),
        ],
      },
    ],
  },
]

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
        url: 'get/pagination/personal_active',
        title: 'Основные',
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
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          {
            label: 'Добавить персонал',
            class: ['v-table-button--custom'],
            type: 'changeUrl',
            url: 'personal-add',
            backgroundColor: '#fff',
            isShow: {
              condition: [
                {
                  permissions: [1],
                  type: true,
                },
              ]
            }
          },
        ],
      },
      head: [
        {
          title: 'id',
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
              type: 'text',
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
              type: 'text',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          value: 'doljnost_name',
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
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
        clearStore: true,
        activeTab: null,
        formData: {},
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
        url: 'get/pagination/personal_passive',
        title: 'Пассив',
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
          // {
          //   label: 'Добавить',
          //   class: ['v-table-button--custom'],
          //   url: '$IconSetting',
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          //{
          //  label: 'Добавить персонал',
          //  class: ['v-table-button--custom'],
          //  function: consolePanel,
          //  backgroundColor: '#fff',
          //},
        ],
      },
      head: [
        {
          title: 'id',
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
          title: 'Статус',
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
              type: 'text',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          value: 'doljnost_name',
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
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
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
        url: 'get/pagination/personal_archive',
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
          // {
          //   label: 'Добавить',
          //   class: ['v-table-button--custom'],
          //   url: '$IconSetting',
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          // {
          //   label: 'Скачать',
          //   class: ['v-table-button--custom'],
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
          //{
          //  label: 'Добавить персонал',
          //  class: ['v-table-button--custom'],
          //  function: consolePanel,
          //  backgroundColor: '#fff',
          //},
        ],
      },
      head: [
        {
          title: 'id',
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
              type: 'text',
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
              type: 'text',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          value: 'doljnost_name',
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
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: defaultForm,
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
        url: 'get/pagination/personal_on_add',
        title: 'На добавлении1',
        noTableAction: true,
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
          // {
          //   label: 'Добавить',
          //   class: ['v-table-button--custom'],
          //   url: '$IconSetting',
          //   function: consolePanel,
          //   backgroundColor: '#fff',
          // },
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
          title: 'id',
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
          title: 'Сотрудник',
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
          value: 'personal_name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.status',
          value: 'personal_status',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Этап',
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
          value: 'task_type_name',
          alias: 'p.telefon',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'От кого',
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
          value: 'from_account_name',
          alias: 'p.telefon',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'У кого',
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
          value: 'to_account_name',
          alias: 'p.telefon',
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
      detail: false,
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
    //     url: 'get/pagination/relocation',
    //     title: 'Перемещения',
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
    //       // {
    //       //   label: 'Добавить',
    //       //   class: ['v-table-button--custom'],
    //       //   url: '$IconSetting',
    //       //   function: consolePanel,
    //       //   backgroundColor: '#fff',
    //       // },
    //       // {
    //       //   label: 'Скачать',
    //       //   class: ['v-table-button--custom'],
    //       //   function: consolePanel,
    //       //   backgroundColor: '#fff',
    //       // },
    //     ],
    //   },
    //   head: [
    //     {
    //       title: 'Линейщик',
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
    //       alias: 'r.personal_id',
    //       isShow: true,
    //       width: '40',
    //       value: 'personal_name',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'От(объект)',
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
    //       alias: 'r.from_obj_id',
    //       value: 'from_object_name',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'От(менеджер)',
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
    //       alias: 'r.from_account_id',
    //       value: 'from_account_name',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'К(объект)',
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
    //       value: 'to_object_name',
    //       alias: 'r.to_obj_id',
    //       search: {
    //         field: '',
    //         isShow: true,
    //       },
    //     },
    //     {
    //       title: 'К(менеджер)',
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
    //       value: 'to_account_name',
    //       alias: 'r.to_account_id',
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
    //           url: '$IconSetting',
    //           function: consoleText,
    //           label: 'Редактировать',
    //         },
    //         {
    //           type: 'button',
    //           url: '$IconSetting',
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
    // },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {
          function: searchInputing,
        },
        headerFixed: true,
        //url: 'https://dummyjson.com/users',
        url: 'get/pagination/user_keys',
        title: 'Личные ключи',
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
            type: 'changeUrl',
            url: 'personal-add-key',
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
          title: 'Ключ',
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
          alias: 'uk.user_key',
          isShow: true,
          width: '40',
          value: 'user_key',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'uk.fio',
          value: 'fio',
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
          width: '150',
          alias: 'p.name',
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
          value: 'object_name',
          alias: 'o.name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Тип',
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
          value: 'is_stager',
          alias: 'uk.is_stager',
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
        alias: 'personal',
        url: '/get/form/',
        name: 'Личный ключ',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            path: 'add-key',
            id: 8,
            name: 'Добавить ключ',
            type: 'FormDefault',
            detail: true,
            fields: [
              autocompleteField({
                label: 'Сотрудник',
                name: 'personal_id',
                alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'api',
                    module: 'personal/getObject',
                    //url: 'object_id/avatar_with_user_key_id',
                    field: 'object_id',
                    url: [
                      {
                        source: 'formData',
                        field: 'this',
                      },
                    ],
                  },
                ]
              }),
              selectField({
                label: 'Объект',
                name: 'object_id',
                // alias: 'object_id',
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
              }),
              dropZoneField({
                label: 'Файл акта',
                name: 'photo_path',
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
                  folder: 'user_keys',
                  name: '`Заявка_ФИО_${form.fields.find((el) => el.name === "personal_id").selectOptionName}_${formData["object_id"]}`',
                  paramsForEmit: this,
                },
                value: '',
              }),
            ],
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'textDefault',
                name: 'closePopup',
                action: 'closePopup',
                to: 'personal',
                skipValidation: true,
              }),
              stringAction({
                text: 'Загрузить',
                type: 'submit',
                module: 'form/create',
                url: 'query/user_key',
                name: 'saveForm',
                action: 'saveFormStore',
              }),

            ],
          },
          {
            path: 'edit',
            id: 9,
            name: 'Добавить ключ',
            type: 'FormDefault',
            detail: true,
            fields: [
              autocompleteField({
                label: 'Сотрудник',
                name: 'personal_id',
                alias: 'personal_logistic_x5',
                subtype: 'single',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                selectOptionName: '',
                items: [],
                page: 1,
                search: '',
                url: 'get/pagination_list/personal_logistic_x5',
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'api',
                    module: 'personal/getObject',
                    //url: 'object_id/avatar_with_user_key_id',
                    field: 'object_id',
                    url: [
                      {
                        source: 'formData',
                        field: 'this',
                      },
                    ],
                  },
                ]
              }),
              selectField({
                label: 'Объект',
                name: 'object_id',
                // alias: 'object_id',
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
              }),
              dropZoneField({
                label: 'Файл акта',
                name: 'photo_path',
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
                  folder: 'user_keys',
                  name: '`Заявка_ФИО_${form.fields.find((el) => el.name === "personal_id").selectOptionName}_${formData["object_id"]}`',
                  paramsForEmit: this,
                },
                value: '',
              }),
            ],
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'textDefault',
                name: 'closePopup',
                action: 'closePopup',
                to: 'personal',
                skipValidation: true,
              }),
              stringAction({
                text: 'Загрузить',
                type: 'submit',
                module: 'form/create',
                url: 'query/user_key',
                name: 'saveForm',
                action: 'saveFormStore',
              }),
            ],
          },
        ],
        activeTab: null,
      },
    },
  ],
}

export default config
