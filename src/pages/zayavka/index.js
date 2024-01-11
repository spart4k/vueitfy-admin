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

console.log('storestore', store)

// const store = useStore()

const tableConsumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal',
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
      // {
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      // },
    ],
  },
  //head: [
  //  {
  //    title: 'ID',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '40',
  //    value: 'id',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Сотрудник',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '90',
  //    value: 'firstName',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Отдел',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'company.department',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Email',
  //    type: 'default',
  //    align: 'left',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'number',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'email',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Телефон',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'phone',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Образование',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '200',
  //    value: 'university',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Пол',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '100',
  //    value: 'gender',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Мак адрес',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '130',
  //    value: 'macAddress',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Домен',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'domain',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'День рождения',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'birthDate',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Действия',
  //    type: 'actions',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'right',
  //    },
  //    isShow: true,
  //    width: '100',
  //    value: 'actions',
  //    actions: [
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleText,
  //        label: 'Редактировать',
  //      },
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleButton,
  //        label: 'Удалить',
  //      },
  //    ],
  //  },
  //],
  head: [
    {
      title: 'ID',
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
          type: 'string',
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
          type: 'number',
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
          type: 'number',
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
        isShow: true,
      },
    },
    {
      title: 'Файл счета / чек',
      type: 'actions',
      actionCondition: true,
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
          url: '$IconDownload',
        },
      ],
    },
    {
      title: 'Закрывающие документы',
      type: 'actions',
      actionCondition: true,
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
          url: '$IconDownload',
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
    alias: 'personal_target',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
        name: 'Основные',
        type: 'FormStage',
        detail: true,
        stages: [
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            lists: [
              'vid_vedomost_id',
              'status_pt',
              'direction_id_logistic',
              'doljnost_id_logistic',
              'shifts',
              'nutritions',
            ],
            alias: 'personal_target',
            active: false,
            fields: [
              selectField({
                label: 'Статус',
                name: 'status',
                alias: 'status_pt',
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
                value: 1,
                validations: { required },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'На дату',
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
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                disable: false,
                //mode: 'edit',
                isShow: true,
              }),
              stringField({
                label: 'Создал',
                name: 'account_name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                mode: 'edit',
                //validations: { required },
                //isShow: false,
              }),
              selectField({
                label: 'Вид ведомости:',
                name: 'vid_vedomost_id',
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
                // Прятать option от условия, target - цель условия, value - значение, value - значения которые нужно прятать
                hiding: {
                  conditions: [
                    {
                      target: 'mode',
                      value: 'edit',
                      values: [2, 4, 6, 7, 8],
                    },
                    {
                      target: 'mode',
                      value: 'add',
                      values: [2, 3, 4, 5, 6, 7],
                    },
                  ],
                },
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
                  sm: 6,
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
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
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
                label: 'Линейщик',
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
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                requiredFields: ['object_id'],
              }),
              selectField({
                label: 'Должность',
                name: 'doljnost_id',
                alias: 'doljnost_id_logistic',
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
              }),
              selectField({
                label: 'Тип смены',
                name: 'type_shift',
                alias: 'shifts',
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
              }),
              selectField({
                label: 'Питание',
                name: 'with_nutrition',
                alias: 'nutritions',
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
                defaultItems: [
                  {
                    id: 0,
                    name: '--Без питания--',
                  },
                ],
              }),
              stringField({
                label: 'Стоимость питания:',
                name: 'sum_nutrition',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
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
            name: 'Основные',
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
                filter: [
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
      {
        id: 1,
        name: 'Расход',
        type: 'TableDefault',
        active: false,
        config: tableConsumptionConfig,
      },
      {
        path: 'add',
        id: 2,
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
        alias: 'personal_target',
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
            readonly: false,
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
            // filter: [
            //   {
            //     field: 'direction_id',
            //     value: '',
            //   },
            //   {
            //     field: 'personal_zr',
            //     value: '',
            //   },
            // ],
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
            // requestKey: 'object_id',
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
            readonly: false,
            class: [''],
            prescription: 'items',
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
            readonly: false,
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
            readonly: false,
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
            readonly: false,
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
              value: false,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'rek2',
            name: 'rek2',
            placeholder: '',
            class: [''],
            disabled: true,
            isShow: {
              value: false,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
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
              value: false,
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
              value: false,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
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
              value: false,
            },
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
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
              value: false,
            },
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
    ],
    activeTab: null,
  },
  filters,
}

export default config
