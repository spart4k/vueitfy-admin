import filters from './filters'
import { required } from '@/utils/validation.js'
import FormStage from '@/components/Form/stage/index.vue'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
//import TableDefault from '@/components/Table/default/index.vue'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  checkboxField,
  dateField,
  textBlock,
} from '@/utils/fields.js'
import FormList from '@/components/Form/list/index.vue'

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

function changeSort() {
  let btn = config.panel.buttons.find((x) => x.function === changeSort)
  let heading = config.head.find((x) => x.changeable)
  if (btn.label === 'Объекты') {
    btn.label = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'p.object_name'
    heading.value = 'object_name'
    config.options.url = 'get/pagination_pivot/personal_target_object'
  } else if (btn.label === 'ФИО') {
    btn.label = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = 'p.personal_name'
    heading.value = 'personal_name'
    config.options.url = 'get/pagination_pivot/personal_target_personal'
  }
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
      //   label: 'Добавить',
      //   class: ['v-table-button--custom'],
      //   url: '$IconSetting',
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      //   type: 'addItem',
      // },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        type: 'addItem',
        //function: consolePanel,
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
        type: FormStage,
        detail: true,
        path: 'add',
        stages: [
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            lists: [
              { alias: 'vid_vedomost_id_logistic', filter: [] },
              { alias: 'status_pt', filter: [] },
              // { alias: 'object_id_logistic', filter: [] },
              // { alias: 'account_id_logistic', filter: [] },
              { alias: 'direction_id_logistic', filter: [] },
              { alias: 'doljnost_id_logistic', filter: [] },
              { alias: 'shifts', filter: [] },
              { alias: 'nutritions', filter: [] },
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
                disable: true,
                validations: { required },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'Дата статуса',
                name: 'date_created',
                value: '',
                type: 'datetime',
                subtype: 'datetime',
                readonly: true,
                menu: false,
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                disable: true,
                //mode: 'edit',
                isShow: true,
              }),
              //stringField({
              //  label: 'Создал',
              //  name: 'account_name',
              //  placeholder: '',
              //  readonly: false,
              //  class: [''],
              //  position: {
              //    cols: 12,
              //    sm: 6,
              //  },
              //  bootstrapClass: [''],
              //  mode: 'edit',
              //  //validations: { required },
              //  //isShow: false,
              //}),
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
                //update: {
                //  module: 'selects/getList',
                //  fields: ['object_id'],
                //},
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'object_id',
                    url: 'get/pagination_list/object_logistic',
                  },
                ],
              }),
              selectField({
                label: 'Вид ведомости:',
                name: 'vid_vedomost_id_logistic',
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
                      values: [8],
                    },
                    {
                      target: 'mode',
                      value: 'add',
                      values: [2, 3, 4, 5, 6, 7],
                    },
                  ],
                },
                requiredFields: ['personal_id'],
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
                dependence: [
                  {
                    type: 'default',
                    fillField: ['sum_nutrition', 'with_nutrition', 'subtype'],
                  },
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'personal_id',
                    url: 'get/pagination_list/personal',
                  },
                ],
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
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'api',
                    module: 'personal/checkEveryDayPayment',
                    action: {
                      type: 'hideOptions',
                      //values: [8],
                      field: 'vid_vedomost_id_logistic',
                      condition: {
                        true: [],
                        false: 1,
                      },
                    },
                    //url: 'object_id/avatar_with_user_key_id',
                    url: [
                      {
                        source: 'formData',
                        field: 'this',
                      },
                    ],
                  },
                ],
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
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: [''],
                disable: false,
                //mode: 'edit',
                isShow: true,
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
                requiredFields: ['with_nutrition', 'sum_nutrition'],
              }),
              textBlock({
                label: 'Создал',
                name: 'subtype',
                placeholder: '',
                readonly: true,
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
            lists: [
              {
                alias: 'print_form_key',
                filter: [
                  {
                    field: 'object_id',
                    value: '',
                    source: 'form.formData',
                    type: 'num',
                  },
                  {
                    field: 'personal_id',
                    value: '',
                    source: 'form.formData',
                    type: 'num',
                  },
                ],
              },
            ],
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
                  sm: 5,
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
                    source: 'fromPrev',
                  },
                ],
                dependence: [
                  {
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
                        field: 'this',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Ключ',
                name: 'print_form_key',
                //withoutList: true,
                //alias: 'direction_id_logistic',
                placeholder: '',
                class: [''],
                selectOption: {
                  text: 'name',
                  value: 'id',
                },
                items: [],
                position: {
                  cols: 12,
                  sm: 3,
                },
                validations: { required },
                bootstrapClass: [''],
                customList: {
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
                      field: 'this',
                    },
                  ],
                },
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'subtype',
                      value: [9],
                      source: 'form.formData[el.field]',
                    },
                    {
                      field: 'direction_id',
                      value: [1],
                      source: 'form.formData[el.field]',
                    },
                    {
                      field: 'doljnost_id',
                      value: [5, 7],
                      source: 'form.formData[el.field]',
                    },
                  ],
                },
              }),
            ],
            actions: [
              stringAction({
                text: 'Назад',
                type: 'cancel',
                module: '',
                name: 'prevStage',
                action: 'prevStage',
                color: 'normal',
              }),
              stringAction({
                text: 'Создать',
                type: 'submit',
                module: 'form/create',
                url: 'create/multiple_target',
                name: 'saveForm',
                action: 'saveForm',
                color: 'primary',
              }),
            ],
            formData: {},
          },
        ],
      },
    ],
    activeTab: null,
  },
  //filters,
}

// const fieldsAddToEdit = [
//   selectField({
//     label: 'Сотрудник',
//     name: 'account_name',
//     alias: 'p.account_name',
//     placeholder: '',
//     class: [''],
//     selectOption: {
//       text: 'name',
//       value: 'id',
//     },
//     disabled: false,
//     value: 0,
//     // items: [
//     //   { id: 0, name: '' },

//     // ],
//     position: {
//       cols: 12,
//       sm: 12,
//     },
//     validations: { required },
//     bootstrapClass: [''],
//     update: {
//       module: 'selects/getList',
//       fields: ['object_id'],
//     },
//   }),
//   dateField({
//     label: ' Дата',
//     name: 'data_rojd',
//     subtype: 'date',
//     placeholder: '',
//     classes: [''],
//     position: {
//       cols: 12,
//       sm: 12,
//     },
//     validations: { required },
//     bootstrapClass: ['changeSelect'],
//   }),
//   stringField({
//     label: 'Рабочие часы',
//     name: 'seriya',
//     placeholder: '',
//     readonly: false,
//     class: [''],
//     position: {
//       cols: 12,
//       sm: 12,
//     },
//     bootstrapClass: [''],
//     //validations: { required },
//     //isShow: false,
//   }),
// ]

const config = {
  selector: '#mainTable',
  options: {
    routeKey: 'account_id',
    doubleHandlerType: 'cell', //row, column?, cell
    pageName: 'schedule',
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/schedule',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
      // {
      //   label: 'Добавить',
      //   class: ['v-table-button--custom'],
      //   url: '$IconSetting',
      //   function: consolePanel,
      //   backgroundColor: '#fff',
      // },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        type: 'addItem',
        //function: consolePanel,
        backgroundColor: '#fff',
      },
    ],
    //filters: true,
    search: true,
    date: true,
    addedItemsChildrenType: 'object',
  },
  head: [
    {
      id: 1,
      noAction: true,
      title: 'ФИО',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'sa.name',
      value: 'account_name',
      changeable: true,
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
    {
      id: 2,
      noAction: true,
      title: 'Должность',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'sp.name',
      value: 'permission_name',
      changeable: true,
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
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '1000px',
    method: 'get',
    alias: 'personal2',
    url: '/get/form/',
    name: 'Добавить',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        path: 'add',
        id: 5,
        //  content: 'super',
        name: 'Запросить документы',
        type: 'FormStage',
        detail: true,
        stages: [
          {
            id: 0,
            name: '',
            type: FormDefault,
            // detail: true,
            lists: [
              {
                alias: 'schedule_account_id',
                filter: [],
              },
            ],
            alias: 'personal_target',
            active: true,
            fields: [
              autocompleteField({
                label: 'Сотрудник',
                name: 'name',
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
                url: 'get/pagination_list/account',
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                alias: 'object_logistic',
              }),
              dateField({
                label: ' Дата',
                name: 'data_rojd',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                validations: { required },
                bootstrapClass: ['changeSelect'],
              }),
              stringField({
                label: 'Рабочие часы',
                value: '11',
                name: 'seriya',
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
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'text',
                name: 'closePopup',
                action: 'closePopup',
                to: 'schedule',
                skipValidation: true,
              }),
              stringAction({
                text: 'Создать',
                type: 'submit',
                module: 'personal/create',
                url: 'query/docs',
                name: 'createForm',
                action: 'createForm',
                color: 'primary',
              }),
            ],
            formData: {},
          },
        ],
      },
      {
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [
          { alias: 'account_id', filter: [] },
          { alias: 'direction_id', filter: [] },
        ],
        alias: 'account',
        active: false,
        fields: [
          selectField({
            label: 'Сотрудник',
            name: 'account_name',
            alias: 'p.account_name',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            disabled: false,
            value: 0,
            items: [{ id: 0, name: '' }],
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
          dateField({
            label: ' Дата',
            name: 'data_rojd',
            subtype: 'date',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: ['changeSelect'],
          }),
          stringField({
            label: 'Рабочие часы',
            name: 'seriya',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
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
        path: 'new',
        content: '',
        id: 2,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [
          // { alias: 'user_keys', filter: [] },
          // { alias: 'habitation_id', filter: [] },
          { alias: 'account_id', filter: [] },
          { alias: 'direction_id', filter: [] },
          // { alias: 'grajdanstvo_id', filter: [] },
        ],
        alias: 'schedule',
        active: false,
        fields: [
          autocompleteField({
            label: 'Сотрудник',
            name: 'account_id',
            disabled: true,
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [{ id: 0, name: '' }],
            page: 1,
            search: '',
            url: 'get/pagination_list/account',
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            alias: 'p.account_id',
          }),
          // selectField({
          //   label: 'Сотрудник',
          //   name: 'account_id',
          //   alias: 'p.account_id',
          //   placeholder: '',
          //   class: [''],
          //   selectOption: {
          //     text: 'name',
          //     value: 'id',
          //   },
          //   disabled: true,
          //   value: 0,
          //   items: [{ id: 0, name: '' }],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          //   update: {
          //     module: 'selects/getList',
          //     fields: ['object_id'],
          //   },
          // }),
          dateField({
            label: ' Дата',
            name: 'date_target',
            subtype: 'date',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: ['changeSelect'],
          }),
          stringField({
            label: 'Рабочие часы',
            name: 'hour',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),

          //Дополнительные поля, которые скрыты но учитываются в formdata
          stringField({
            value: '1',
            isShow: {
              value: true,
            },
            label: 'Что-то type',
            name: 'type',
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
            value: '2023-03',
            isShow: { value: false },
            label: 'Что-то period',
            name: 'period',
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
            value: '1',
            isShow: { value: true },
            label: 'Что-то shift',
            name: 'shift',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'schedule',
            skipValidation: true,
          }),
          stringAction({
            text: 'Создать',
            type: 'submit',
            module: 'personal/create',
            url: 'schedule/',
            name: 'createForm',
            action: 'createForm',
            actionKey: 'schedule',
            color: 'primary',
          }),
        ],
      },
      {
        path: 'edit',
        content: '',
        id: 2,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        // lists: [
        //   { alias: 'user_keys', filter: [] },
        //   { alias: 'habitation_id', filter: [] },
        //   { alias: 'account_id', filter: [] },
        //   { alias: 'direction_id', filter: [] },
        //   { alias: 'grajdanstvo_id', filter: [] },
        // ],
        alias: 'schedule',
        active: false,
        fields: [
          autocompleteField({
            label: 'Сотрудник',
            name: 'account_id',
            disabled: true,
            subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            items: [{ id: 0, name: '' }],
            page: 1,
            search: '',
            url: 'get/pagination_list/account',
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            alias: 'p.account_id',
          }),
          dateField({
            label: ' Дата',
            name: 'date_target',
            subtype: 'date',
            placeholder: '',
            classes: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: ['changeSelect'],
          }),
          stringField({
            label: 'Рабочие часы',
            name: 'hour',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),

          //Дополнительные поля, которые скрыты но учитываются в formdata
          stringField({
            value: 1,
            isShow: {
              value: true,
            },
            label: 'Что-то type',
            name: 'type',
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
            value: '2023-03',
            isShow: { value: false },
            label: 'Что-то period',
            name: 'period',
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
            value: 1,
            isShow: { value: true },
            label: 'Что-то shift',
            name: 'shift',
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
            value: '0',
            isShow: {
              value: true,
            },
            label: 'Что-то id',
            name: 'id',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'schedule',
            skipValidation: true,
          }),
          stringAction({
            text: 'Отменить',
            type: 'cancel',
            module: 'form/del',
            url: 'schedule',
            name: 'deleteFormById',
            action: 'deleteFormById',
            actionKey: 'schedule',
            color: 'error',
          }),
          stringAction({
            text: 'Обновить',
            type: 'submit',
            module: 'personal/createData',
            url: 'set/data/schedule',
            name: 'createForm',
            action: 'createForm',
            actionKey: 'schedule',
            color: 'primary',
          }),
        ],
      },
    ],
    activeTab: null,
  },
}

export default config
