import filters from './filters'
import { required } from '@/utils/validation.js'
import FormStage from '@/components/Form/stage/index.vue'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
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

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

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
    footer: null,
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
                name: 'account_id',
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
                value: 11,
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
            value: 11,
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
            readonly: true,
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
            value: 11,
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
