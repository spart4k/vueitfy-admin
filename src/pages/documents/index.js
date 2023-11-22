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
import FormDefault from '@/components/form/default/index.vue'
import FormDocuments from '@/components/form/documents/default/index.vue'
import FormList from '@/components/form/list/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import { userKeys } from '@/pages'
import { ref } from 'vue'
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

// const activeTab = ref(0)

const consumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/documents_new',
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
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
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
    pageLength: 10,
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
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
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
    pageLength: 10,
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
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'IDasdf',
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
      value: 'id32sdfuuu',
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
    pageLength: 10,
    currentPage: 1,
    totalPages: null,
  },
  detail: undefined,
  filters,
}

const defaultForm = [
  {
    id: 0,
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      // { alias: 'user_keys', filter: [] },
      // { alias: 'habitation_id', filter: [] },
      // { alias: 'account_id', filter: [] },
      // { alias: 'direction_id', filter: [] },
      // { alias: 'grajdanstvo_id', filter: [] },
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
        label: 'ФИО2',
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
  {
    path: 'query',
    id: 5,
    name: 'Запросить документы',
    type: 'FormStage',
    detail: true,
    stages: [
      {
        id: 0,
        name: '',
        type: FormDefault,
        detail: true,
        lists: [
          {
            alias: 'personal_missing_documents',
            filter: [
              {
                field: 'type',
                type: 'num',
                value: '',
                source: 'formData',
              },
            ],
          },
        ],
        alias: 'personal_target',
        active: true,
        fields: [
          selectField({
            label: 'Тип граждан',
            name: 'type',
            // alias: 'direction_id_logistic',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            disabled: true,
            // value: value,
            items: [
              { id: 0, name: 'Новые' },
              { id: 1, name: 'ЕАЭС' },
              { id: 2, name: 'Не резиденты' },
              { id: 3, name: 'РФ' },
            ],
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
            label: 'Персонально',
            name: 'personally',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          autocompleteField({
            label: 'Линейщики',
            name: 'personal_logistic_document',
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            isShow: {
              value: false,
              conditions: [{ field: 'personally', value: [true] }],
            },
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/personal_logistic_document',
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
            filters: [
              {
                field: 'object_id',
                value: '',
              },
            ],
          }),
          selectField({
            label: 'Документы',
            name: 'personal_missing_documents',
            // url: 'get/pagination_list/personal_logistic_document',
            subtype: 'multiselect',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            isShow: {
              value: false,
              conditions: [{ field: 'personally', value: [true] }],
            },
            // value: 3,
            items: [
              // { id: 1, name: 'Новые' },
              // { id: 2, name: 'ЕАЭС' },
              // { id: 3, name: 'Не резиденты' },
              // { id: 4, name: 'РФ' },
            ],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: '',
            name: 'saveForm',
            action: 'nextStage',
            color: 'primary',
          }),
        ],
        formData: {},
      },
    ],
  },
]

const keysForm = [
  {
    id: 0,
    name: 'Основные',
    type: FormDefault,
    detail: true,
    lists: [
      // { alias: 'user_keys', filter: [] },
      // { alias: 'habitation_id', filter: [] },
      // { alias: 'account_id', filter: [] },
      // { alias: 'direction_id', filter: [] },
      // { alias: 'grajdanstvo_id', filter: [] },
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
    path: 'query',
    id: 5,
    name: 'Заявка на персонал',
    type: 'FormStage',
    detail: true,
    stages: [
      {
        id: 0,
        name: 'Основные0',
        type: FormDefault,
        detail: true,
        lists: [
          { alias: 'direction_id_logistic', filter: [] },
          { alias: 'grajdanstvo_id', filter: [] },
        ],
        alias: 'personal_target',
        active: false,
        fields: [
          stringField({
            label: 'ФИО',
            name: 'fio',
            placeholder: '',
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
            name: 'date_target',
            value: [],
            type: 'date',
            subtype: 'multiple',
            readonly: true,
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
          autocompleteField({
            label: 'Объект',
            name: 'object_id',
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
            dependence: {
              type: 'default',
              fillField: ['sum_nutrition', 'with_nutrition'],
            },
            update: {
              module: 'selects/getList',
              fields: ['personal_id'],
            },
            requiredFields: ['direction_id'],
          }),
          autocompleteField({
            label: 'Бригадир',
            name: 'personal_id',
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
            url: 'get/pagination_list/personal',
            position: {
              cols: 12,
              sm: 12,
            },
            // validations: { required },
            bootstrapClass: [''],
            filters: [
              {
                field: 'object_id',
                value: '',
              },
            ],
            requiredFields: ['object_id'],
          }),
          selectField({
            label: 'Гражданство',
            name: 'grajdanstvo_id',
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
            name: 'addressA',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            isShow: {
              value: false,
              conditions: [
                { field: 'transfer', value: true },
                { field: 'grajdanstvo_id', value: 1 },
              ],
            },
          }),
          stringField({
            label: 'Адрес Б',
            name: 'addressB',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: '',
            name: 'saveForm',
            action: 'nextStage',
            color: 'primary',
          }),
        ],
        formData: {},
      },
      {
        id: 1,
        name: 'Основные1',
        type: FormList,
        //detail: true,
        lists: ['avatar_with_user_key_id'],
        alias: 'personal_target',
        active: false,
        fromLastTab: [
          {
            name: 'personal_id',
            alias: 'name',
            nameInTab: 'account_name',
            type: 'list',
          },
        ],
        fields: [
          textBlock({
            label: 'Создал',
            name: 'account_name',
            placeholder: '',
            readonly: true,
            class: [''],
            position: {
              cols: 12,
              sm: 6,
            },
            bootstrapClass: [''],
            //validations: { required },
            //isShow: false,
          }),
          autocompleteField({
            label: '',
            name: 'avatar_with_user_key_id',
            alias: 'personal_id',
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
            url: 'get/pagination_list/avatar_with_user_key_id',
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            filters: [
              {
                field: 'object_id',
                value: '',
              },
            ],
            dependence: {
              //fields: ['statement_card', 'cardowner'],
              type: 'api',
              module: 'personal/getKeys',
              //url: 'object_id/avatar_with_user_key_id',
              field: 'print_form_key',
              url: [
                {
                  source: 'props',
                  field: 'object_id',
                },
                {
                  source: 'formData',
                  field: 'avatar_with_user_key_id',
                },
              ],
            },
          }),
          selectField({
            label: 'Ключ',
            name: 'print_form_key',
            //alias: 'direction_id_logistic',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'user_key',
              value: 'id',
            },
            items: [],
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Назад',
            type: 'cancel',
            module: '',
            name: 'saveForm',
            action: 'prevStage',
            color: 'normal',
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: '',
            name: 'saveForm',
            action: 'nextStage',
            color: 'primary',
          }),
        ],
        formData: {},
      },
    ],
  },
]
const buttonNameQueryDocument = 'Запросить документы'
const buttonsMixin = [
  {
    // route: 'query',
    label: buttonNameQueryDocument,
    class: ['v-table-button--custom'],
    type: 'changeUrl',
    function: consolePanel,
    url: 'documents-query',
    backgroundColor: '#fff',
  },
]

// const formQuery = ;

const tabNames = ['Основные', 'ЕАЭС', 'Не резиденты', 'РФ']
const config = {
  title: 'Персонал',
  // activeTab: activeTab,
  bindField: [
    {
      field: 'typeCitizen',
      targetForm: 5,
    },
  ],
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
        url: 'get/pagination/documents_new',
        title: 'Новое',
      },
      type: TableDefault,
      panel: {
        buttons: [
          ...buttonsMixin,
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
          {
            label: 'Скачать',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
          },
          {
            label: 'Добавить персонал',
            class: ['v-table-button--custom'],
            type: 'addItem',
            backgroundColor: '#fff',
          },
        ],
      },
      head: [
        // {
        //   title: 'id',
        //   type: 'default',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'left',
        //   },
        //   sorts: [
        //     {
        //       type: 'string',
        //       default: '',
        //       value: '',
        //       isShow: false,
        //     },
        //   ],
        //   alias: 'p.id',
        //   isShow: true,
        //   width: '40',
        //   value: 'id',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },

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
          alias: 'ps.name',
          value: 'name',
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
          alias: 'ps.object_name',
          value: 'object_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Гражданство',
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
          alias: 'ps.grajdanstvo',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
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
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт 2',
          type: 'icon',
          icon: '$IconPassport2',
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
          alias: 'ps.pasport_2',
          value: 'pasport_2',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
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
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
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
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
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
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          conditionValue: 'registration_date_c_docs_in',
          backgroundValue: 'need_reg',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
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
          alias: 'p.invoice',
          value: 'invoice',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ИНН',
          type: 'icon',
          icon: '$IconInn',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.inn',
          value: 'inn',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Экзамен РФ',
          type: 'icon',
          icon: '$IconRf',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.exam_rf',
          value: 'exam_rf',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мед. карта',
          type: 'icon',
          icon: '$IconMedicalBook',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.med_card',
          value: 'med_card',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Перевод',
          type: 'icon',
          icon: '$IconPerevod',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.translate',
          value: 'translate',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ДМС',
          type: 'icon',
          icon: '$IconDmc',
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
          alias: 'ps.dms',
          value: 'dms',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мед. осмотр',
          type: 'icon',
          icon: '$IconMedOsmotr',
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
          alias: 'ps.med_view',
          value: 'med_view',
          conditionValue: 'med_view_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент',
          type: 'icon',
          icon: '$IconPatent',
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
          alias: 'ps.patent',
          value: 'patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент 2',
          type: 'icon',
          icon: '$IconPatent2',
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
          alias: 'ps.patent_2',
          value: 'patent_2',
          backgroundColor: 'need_patent',
          conditionValue: 'patent_date_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент первичный',
          type: 'icon',
          icon: '$IconCheckPoten',
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
          alias: 'ps.check_patent',
          value: 'check_patent',
          conditionValue: 'check_patent_date_pay',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент текущий',
          type: 'icon',
          icon: '$IconCheckPoten',
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
          alias: 'ps.check_patent_2',
          value: 'check_patent_2',
          conditionValue: 'check_patent_date_pay_now',
          backgroundValue: 'need_check_patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Дактилоскопия',
          type: 'icon',
          icon: '$IconFinger',
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
          alias: 'ps.cartdact',
          value: 'cartdact',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Дактилоскопия 2',
          type: 'icon',
          icon: '$IconFinger2',
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
          alias: 'ps.cartdact_2',
          value: 'cartdact_2',
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
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 10,
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
        name: buttonNameQueryDocument,
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
        url: 'get/pagination/documents_eaes',
        title: 'ЕАЭС',
      },
      type: TableDefault,
      panel: {
        buttons: [
          ...buttonsMixin,
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
          {
            label: 'Скачать',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
          },
          {
            label: 'Добавить персонал',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.name',
          value: 'name',
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
          alias: 'ps.object_name',
          value: 'object_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Гражданство',
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
          alias: 'ps.grajdanstvo',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
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
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
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
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
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
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
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
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          backgroundValue: 'need_red',
          conditionValue: 'registration_date_c_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
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
          alias: 'p.invoice',
          value: 'invoice',
          search: {
            field: '',
            isShow: true,
          },
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 10,
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
        name: buttonNameQueryDocument,
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
        url: 'get/pagination/documents_dont_res',
        title: 'Не резиденты',
      },
      type: TableDefault,
      panel: {
        buttons: [
          ...buttonsMixin,
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
          {
            label: 'Скачать',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
          },
          {
            label: 'Добавить персонал',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.name',
          value: 'name',
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
          alias: 'ps.object_name',
          value: 'object_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Гражданство',
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
          alias: 'ps.grajdanstvo',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
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
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
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
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация',
          type: 'icon',
          icon: '$IconMigrUch',
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
          alias: 'ps.migr_uch',
          value: 'migr_uch',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регистрация 2',
          type: 'icon',
          icon: '$IconMigrUch2',
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
          idth: '90',
          alias: 'ps.migr_uch_2',
          value: 'migr_uch_2',
          conditionValue: 'registration_date_c_docs_in',
          backgroundValue: 'need_red',
          arch: {
            ield: '',
            isShow: true,
          },
        },
        {
          title: 'Счет',
          type: 'icon',
          icon: '$IconRekvizit',
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
          alias: 'p.invoice',
          value: 'invoice',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент',
          type: 'icon',
          icon: '$IconPatent',
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
          alias: 'ps.patent',
          value: 'patent',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Патент 2',
          type: 'icon',
          icon: '$IconPatent2',
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
          alias: 'ps.patent_2',
          backgroundColor: 'need_patent',
          value: 'patent_2',
          conditionValue: 'patent_date_docs_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент первичный',
          type: 'icon',
          icon: '$IconCheckPoten',
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
          alias: 'ps.check_patent',
          value: 'check_patent',
          conditionValue: 'check_patent_date_pay',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Чек-патент текущий',
          type: 'icon',
          icon: '$IconCheckPoten',
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
          alias: 'ps.check_patent_2',
          value: 'check_patent_2',
          conditionValue: 'check_patent_date_pay_now',
          backgroundValue: 'need_check_patent',
          search: {
            field: '',
            isShow: true,
          },
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 10,
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
        name: buttonNameQueryDocument,
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
        url: 'get/pagination/documents_rf',
        title: 'РФ',
      },
      type: TableDefault,
      panel: {
        buttons: [
          {
            ...buttonsMixin,
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
          {
            label: 'Скачать',
            class: ['v-table-button--custom'],
            function: consolePanel,
            backgroundColor: '#fff',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'ps.name',
          value: 'name',
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
          alias: 'ps.object_name',
          value: 'object_name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Гражданство',
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
          alias: 'ps.grajdanstvo',
          value: 'grajdanstvo',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт',
          type: 'icon',
          icon: '$IconPassport',
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
          alias: 'p.pasport',
          value: 'pasport',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Паспорт 2',
          type: 'icon',
          icon: '$IconPassport2',
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
          alias: 'ps.pasport_2',
          value: 'pasport_2',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Мигр карта',
          type: 'icon',
          icon: '$IconMigrCarta',
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
          alias: 'ps.migr_card',
          value: 'migr_card',
          conditionValue: 'migr_card_data_in',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'ИНН',
          type: 'icon',
          icon: '$IconInn',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.inn',
          value: 'inn',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'СНИЛС',
          type: 'icon',
          icon: '$IconSnils',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            {
              type: '',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '90',
          alias: 'p.snils',
          value: 'snils',
          search: {
            field: '',
            isShow: true,
          },
        },
      ],
      data: {
        rows: [],
        totalRows: null,
        pageLength: 10,
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
                label: 'ФИО2',
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

// config.fn()
export default config
