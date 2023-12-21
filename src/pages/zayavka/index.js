import filters from './filters'
import TableDefault from '@/components/Table/default/index.vue'
import FormDefault from '@/components/form/default/index.vue'
import FormList from '@/components/form/list/index.vue'
import Expenses from '@/components/form/expenses/index.vue'

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
    width: '800px',
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
                filters: [
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
          { alias: 'type_pay', filter: [] },
        ],
        alias: 'personal_target',
        active: false,
        fields: [
          // selectField({
          //   label: 'Статус:',
          //   name: 'status_zr',
          //   alias: 'status_zr',
          //   placeholder: '',
          //   class: [''],
          //   value: '',
          //   selectOption: {
          //     text: 'name',
          //     value: 'id',
          //   },
          //   items: [],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // stringField({
          //   label: 'От:',
          //   name: 'fio',
          //   placeholder: '',
          //   value: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   disable: true,
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // dateField({
          //   label: 'Дата статус:',
          //   name: 'date_rojd',
          //   type: 'date',
          //   value: '',
          //   menu: false,
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   disable: true,
          //   validations: { required },
          //   bootstrapClass: [''],
          //   //mode: 'edit',
          // }),
          // stringField({
          //   label: 'Создана:',
          //   name: 'fio',
          //   placeholder: '',
          //   value: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   disable: true,
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // checkboxField({
          //   label: 'На себя',
          //   name: 'transfer',
          //   value: false,
          //   placeholder: '',
          //   readonly: false,
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   bootstrapClass: [''],
          // }),
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
            validations: { required },
            bootstrapClass: [''],
          }),
          radioPanel({
            name: 'zcxxczxc',
            alias: 'zcxxczxc',
            class: [''],
            bootstrapClass: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            value: 1,
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
          }),
          selectField({
            label: 'Наименование:',
            name: 'name__0',
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
              sm: 6,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Кол-во:',
            name: 'count__0',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Стоимость :',
            name: 'price__0',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 2,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'ВДС',
            name: 'vds__0',
            value: false,
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 2,
            },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'Точное наименование',
            name: 'exact_name__0',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          {
            type: 'btn',
            id: 'btn-decrease',
            readonly: false,
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            // validations: { required: { $params: { type: 'required' } } },
            bootstrapClass: [''],
            label: '-',
            color: 'primary',
            increase: false,
          },
          {
            type: 'btn',
            id: 'btn-increase',
            readonly: false,
            disable: false,
            isShow: true,
            mode: 'all',
            placeholder: '',
            class: [''],
            position: { cols: 12, sm: 6 },
            notSend: true,
            // validations: { required: { $params: { type: 'required' } } },
            bootstrapClass: [''],
            label: '+',
            color: 'success',
            increase: true,
          },
          // {
          //   type: 'btn',
          //   id: 'hgfdjtdegfgm',
          //   position: {
          //     cols: 12,
          //     sm: 6,
          //   },
          //   color: 'primary',
          //   action: 'increase',
          //   text: '+',
          // },
          // autocompleteField({
          //   label: 'Персонаж:',
          //   name: 'personal_id',
          //   requestKey: 'account_json',
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
          //   url: 'get/pagination_list/personal',
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // autocompleteField({
          //   label: 'Объект:',
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
          //   url: 'get/pagination_list/personal',
          //   // brigadirs
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // autocompleteField({
          //   label: 'Тип объекта:',
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
          //   url: 'get/pagination_list/personal',
          //   // brigadirs
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // autocompleteField({
          //   label: 'Должность:',
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
          //   url: 'get/pagination_list/personal',
          //   // brigadirs
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // autocompleteField({
          //   label: 'ФИО:',
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
          //   url: 'get/pagination_list/personal',
          //   // brigadirs
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // selectField({
          //   label: 'Категория:',
          //   name: 'category_zr',
          //   alias: 'category_zr',
          //   placeholder: '',
          //   class: [''],
          //   value: '',
          //   selectOption: {
          //     text: 'name',
          //     value: 'id',
          //   },
          //   items: [],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // selectField({
          //   label: 'Тип оплаты:',
          //   name: 'type_pay',
          //   alias: 'type_pay',
          //   placeholder: '',
          //   class: [''],
          //   value: '',
          //   selectOption: {
          //     text: 'name',
          //     value: 'id',
          //   },
          //   items: [],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // autocompleteField({
          //   label: 'Реквизит для оплаты:',
          //   name: 'type_pay',
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
          //   url: 'get/pagination_list/personal',
          //   // brigadirs
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
          // textareaField({
          //   label: 'Ошибка:',
          //   name: 'note',
          //   alias: 'pd.note',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   // validations: { required },
          //   bootstrapClass: [''],
          // }),
          // textareaField({
          //   label: 'Примечание:',
          //   name: 'note',
          //   alias: 'pd.note',
          //   placeholder: '',
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   // validations: { required },
          //   bootstrapClass: [''],
          // }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'disabled',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal',
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
