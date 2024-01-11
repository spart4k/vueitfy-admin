import filters from './filters'
import { required, numeric, minLength } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  dateField,
  checkboxField,
  textareaField,
  colorPicker,
  textBlock,
  // dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import { userKeys } from '@/pages'
import { stringify } from 'qs'
import { readonly } from 'vue'

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

const bankConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/account_bank',
    urlDetail: 'account_id',
    alias: 'account_id',
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
        url: 'account/:id/new_card',
        type: 'changeUrl',
        // function: addQuery,
        // type: 'nextStage',
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
  detail: {
    type: 'popup', // String 'popup' or 'page'
    popupIndex: 2,
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'account_bank',
    url: '/get/form/',
    requstId: 'card_id',
    name: 'Банковская карта',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    activeTab: null,
    tabs: [
      {
        path: 'new_card',
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [{ alias: 'bank_id_without_nal', filter: [] }],
        alias: 'account_bank',
        active: false,
        fields: [
          selectField({
            label: 'Банк',
            name: 'bank_id',
            alias: 'bank_id_without_nal',
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
            value: '',
            disable: true,
            validations: { required },
            bootstrapClass: [''],
          }),
          stringField({
            label: 'ФИО',
            name: 'fio',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
          }),
          stringField({
            label: 'БИК',
            name: 'bik',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { minLength: minLength(8), numeric, required },
          }),
          stringField({
            label: 'Номер счета',
            name: 'invoice',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { minLength: minLength(20), numeric, required },
          }),
          stringField({
            label: 'Примечание',
            name: 'comment',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
          }),
          checkboxField({
            label: 'Приоритет',
            name: `priority`,
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
          // textBlock({
          //   label: 'Создал',
          //   name: 'id',
          //   placeholder: '',
          //   notSend: true,
          //   readonly: true,
          //   class: [''],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   bootstrapClass: [''],
          // }),
        ],
        actions: [
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/create',
            url: 'create/account_card',
            useRouteKey: [{ requestKey: 'account_id', storageKey: 'id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveForm',
            action: 'saveForm',
          }),
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'text',
            name: 'closePopup',
            action: 'closePopup',
            to: 'account/:id',
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
      color: 'textDefault',
      name: 'closePopup',
      action: 'closePopup',
      to: 'account',
      skipValidation: true,
    }),
  ],
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
    urlDetail: 'account_id',
    alias: 'p.account_id',
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
      alias: 'p.id',
      value: 'id',
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
  filters,
}

const config = {
  title: 'Добавление аккаунта',
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
        url: 'get/pagination/account_active',
        title: 'Активные',
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
            url: '$IconSetting',
            type: 'addItem',
            //function: consolePanel,
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
            //{
            //  type: 'string',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          alias: 'p.fio',
          isShow: true,
          width: '40',
          value: 'fio',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Роль',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: undefined,
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          value: 'permission_name',
          alias: 'p.permission_name',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Телефон',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '90',
          alias: 'p.telefon',
          value: 'telefon',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        {
          title: 'Стац.',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: 'left',
          },
          sorts: [
            //{
            //  type: 'string',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          alias: 'p.landline_phone',
          value: 'landline_phone',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
        },
        //{
        //  title: 'Направление',
        //  type: 'default',
        //  align: 'center',
        //  fixed: {
        //    value: false,
        //    position: undefined,
        //  },
        //  sorts: [
        //    {
        //      type: 'text',
        //      default: '',
        //      value: '',
        //      isShow: false,
        //    },
        //  ],
        //  isShow: true,
        //  width: '150',
        //  value: 'direction_json',
        //  alias: 'p.direction_json',
        //  search: {
        //    field: '',
        //    isShow: true,
        //  },
        //},
        {
          title: 'Примечание',
          type: 'default',
          align: 'center',
          fixed: {
            value: false,
            position: undefined,
          },
          sorts: [
            //{
            //  type: 'text',
            //  default: '',
            //  value: '',
            //  isShow: false,
            //},
          ],
          isShow: true,
          width: '150',
          value: 'comment',
          alias: 'p.comment',
          //search: {
          //  field: '',
          //  isShow: true,
          //},
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
              function: consoleButton,
              label: 'Удалить',
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
        alias: 'account',
        url: '/get/form/',
        name: 'Добавление аккаунта',
        getOnClose: true,
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          {
            id: 1,
            path: 'edit',
            name: 'Основные',
            type: FormDefault,
            detail: true,
            lists: [
              { alias: 'permissions_account', filter: [] },
              { alias: 'chief_id', filter: [] },
              { alias: 'direction_json', filter: [] },
              { alias: 'direction_id', filter: [] },
              { alias: 'grajdanstvo_id', filter: [] },
              {
                alias: 'object_type',
                filter: [],
              },
              {
                alias: 'account_objects',
                filter: [
                  { source: 'formData', type: 'num', value: 'id', field: 'id' },
                ],
              },
            ],
            alias: 'account',
            active: false,
            fields: [
              textBlock({
                label: 'Создал',
                name: 'id',
                placeholder: '',
                notSend: true,
                readonly: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'ФИО',
                name: 'fio',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Краткое имя',
                name: 'name',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
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
              }),
              stringField({
                label: 'Email',
                name: 'email',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Логин',
                name: 'username',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Пароль',
                name: 'password',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'Дата рождения',
                name: 'birthday',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                alias: 'p.date_status',
              }),
              selectField({
                label: 'Направления',
                name: 'direction_json',
                subtype: 'multiple',
                // requestKey: 'direction_json',
                stringify: true,
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
                updateList: [
                  {
                    alias: 'object_type',
                    filter: [
                      {
                        field: 'direction_json',
                        value: '',
                        source: 'formData',
                        type: 'array',
                      },
                    ],
                  },
                ],
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'chief_id',
                    url: 'get/pagination_list/chief_id',
                    filter: [
                      {
                        field: 'permission_id',
                        type: 'num',
                        value: '',
                      },
                      {
                        field: 'direction_json',
                        type: 'array',
                        value: '',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Тип',
                name: 'object_types',
                alias: 'object_type',
                subtype: 'multiple',
                stringify: true,
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
                requiredFields: ['direction_json'],
              }),
              selectField({
                label: 'Роль',
                name: 'permission_id',
                alias: 'permissions_account',
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
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'chief_id',
                    url: 'get/pagination_list/chief_id',
                    filter: [
                      {
                        field: 'permission_id',
                        type: 'num',
                        value: '',
                      },
                      {
                        field: 'direction_json',
                        type: 'array',
                        value: '',
                      },
                    ],
                  },
                ],
              }),
              autocompleteField({
                label: 'Руководитель',
                name: 'chief_id',
                alias: 'permission_id',
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
                url: 'get/pagination_list/chief_id',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
                  {
                    field: 'permission_id',
                    type: 'num',
                    source: 'formData',
                    value: '',
                  },
                  {
                    field: 'direction_json',
                    type: 'array',
                    source: 'formData',
                    value: '',
                  },
                ],
                requiredFields: ['direction_json', 'permission_id'],
              }),
              colorPicker({
                label: 'Цвет',
                name: 'color',
                //value: '#ffffff',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              checkboxField({
                label: 'Руководитель',
                name: 'is_chief',
                placeholder: '',
                // readonly: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
              selectField({
                label: 'Объекты',
                name: 'object_json',
                alias: 'account_objects',
                subtype: 'multiple',
                readonly: true,
                // requestKey: 'direction_json',
                stringify: true,
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
                validations: {},
                bootstrapClass: [''],
                // updateList: [
                //   {
                //     alias: 'account_id',
                //     filter: [
                //       {
                //         field: 'direction_json',
                //         value: '',
                //         source: 'formData',
                //         type: 'num',
                //       },
                //     ],
                //   },
                // ],
              }),
            ],
            actions: [
              stringAction({
                text: 'Закрыть',
                type: 'submit',
                color: 'text',
                name: 'closePopup',
                action: 'closePopup',
                to: 'account',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: 'form/putForm',
                name: 'saveFormId',
                url: 'set/account',
                action: 'saveFormId',
                color: 'primary',
              }),
            ],
          },
          {
            path: 'add',
            id: 2,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            lists: [
              { alias: 'permissions_account', filter: [] },
              { alias: 'chief_id', filter: [] },
              { alias: 'direction_json', filter: [] },
              { alias: 'direction_id', filter: [] },
              { alias: 'grajdanstvo_id', filter: [] },
              {
                alias: 'account_object_types',
                filter: [],
              },
            ],
            alias: '2account',
            active: false,
            fields: [
              stringField({
                label: 'ФИО',
                name: 'fio',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Краткое имя',
                name: 'name',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Телефон',
                name: 'telefon',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Email',
                name: 'email',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Логин',
                name: 'username',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              stringField({
                label: 'Пароль',
                name: 'password',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'Дата рождения',
                name: 'birthday',
                subtype: 'date',
                placeholder: '',
                classes: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
                alias: 'p.date_status',
              }),
              selectField({
                label: 'Направления',
                name: 'direction_json',
                subtype: 'multiple',
                // requestKey: 'direction_json',
                stringify: true,
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
                // updateList: [
                //   {
                //     alias: 'doljnost_id',
                //     filter: [
                //       {
                //         field: 'direction_id',
                //         value: '',
                //         source: 'formData',
                //         type: 'num',
                //       },
                //     ],
                //   },
                // ],
                updateList: [
                  {
                    alias: 'account_object_types',
                    filter: [
                      {
                        field: 'direction_json',
                        value: '',
                        source: 'formData',
                        type: 'array',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Тип',
                name: 'type',
                alias: 'account_object_types',
                subtype: 'multiple',
                stringify: true,
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
                requiredFields: ['direction_json'],
              }),
              selectField({
                label: 'Роль',
                name: 'permission_id',
                alias: 'permissions_account',
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
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'chief_id',
                    url: 'get/pagination_list/chief_id',
                    filter: [
                      {
                        field: 'permission_id',
                        type: 'num',
                        value: '',
                      },
                      {
                        field: 'direction_json',
                        type: 'array',
                        value: '',
                      },
                    ],
                  },
                ],
              }),
              autocompleteField({
                label: 'Руководитель',
                name: 'chief_id',
                // alias: 'permission_id',
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
                url: 'get/pagination_list/chief_id',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filter: [
                  {
                    field: 'permission_id',
                    type: 'num',
                    source: null,
                    value: '',
                  },
                  {
                    field: 'direction_json',
                    type: 'array',
                    source: null,
                    value: '',
                  },
                ],
                requiredFields: ['direction_json', 'permission_id'],
              }),
              colorPicker({
                label: 'Цвет',
                name: 'color',
                value: '#000000',
                placeholder: '',
                readonly: false,
                disabled: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                bootstrapClass: [''],
              }),
              checkboxField({
                label: 'Руководитель',
                name: 'is_chief',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
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
                to: 'account',
                skipValidation: true,
              }),
              stringAction({
                text: 'Создать',
                type: 'submit',
                module: 'account/createData',
                url: 'set/account',
                name: 'createForm',
                action: 'createForm',
                color: 'primary',
              }),
            ],
          },
          {
            path: 'edit',
            id: 7,
            name: 'Банковские карты',
            type: TableDefault,
            active: false,
            config: bankConfig,
          },
        ],
        activeTab: null,
      },
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
        url: 'get/pagination/account_archive',
        title: 'Заблокированные',
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
          //{
          //  label: 'Добавить',
          //  class: ['v-table-button--custom'],
          //  url: '$IconSetting',
          //  function: consolePanel,
          //  backgroundColor: '#fff',
          //},
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
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          alias: 'p.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'p.telefon',
          value: 'telefon',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Стац.',
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
          alias: 'p.landline_phone',
          value: 'landline_phone',
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
          value: 'direction_json',
          alias: 'p.direction_json',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Роль',
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
          value: 'permission_name',
          alias: 'p.permission_name',
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
              url: '$IconEdit',
              function: consoleButton,
              label: 'Удалить',
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
        width: '1000px',
        method: 'get',
        alias: 'account3',
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
            alias: 'sysaccount',
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
                subtype: 'multiple',
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
                subtype: 'multiple',
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
                subtype: 'multiple',
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

export default config
