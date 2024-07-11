import filters from './filters'
import {
  required,
  numeric,
  number,
  minLength,
  maxLength,
} from '@/utils/validation.js'
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
import { userKeys } from '@/pages'
import { stringify } from 'qs'
import { readonly } from 'vue'
import _ from 'lodash'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

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
    contextMenu: {
      actions: [
        {
          icon: 'mdi-delete',
          label: 'Удалить карту',
          action: {
            type: 'delete',
            alias: 'account_bank',
          },
        },
      ],
    },
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
      alias: 'ab.id',
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
      alias: 'ab.priority',
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
      alias: 'b.name',
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
      alias: 'ab.invoice',
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
      alias: 'ab.fio',
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
      alias: 'ab.comment',
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
    footer: null,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    getOnClose: true,
    classes: [''], // List class
    width: '500px',
    method: 'get',
    alias: 'account_bank',
    url: '/get/form/',
    requestId: 'card_id',
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
        routeParam: 'card_id',
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
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'mode',
                  target: 'environment',
                  value: ['edit'],
                  type: true,
                },
              ],
            },
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            color: 'primary',
            module: 'form/putForm',
            url: 'update/account_card',
            useRouteKey: [{ requestKey: 'account_id', storageKey: 'id' }],
            // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
            name: 'saveFormId',
            action: 'saveFormId',
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'mode',
                  target: 'environment',
                  value: ['add'],
                  type: true,
                },
              ],
            },
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
    footer: null,
  },
  detail: undefined,
  filters: _.cloneDeep(filters),
}

const fields = {
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
      filter: [
        {
          field: 'direction_json',
          value: '',
          source: 'formData',
          type: 'array',
        },
      ],
    },
    {
      alias: 'account_objects',
      filter: [{ source: 'formData', type: 'num', value: 'id', field: 'id' }],
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
        sm: 4,
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
        sm: 4,
      },
      bootstrapClass: [''],
    }),
    stringField({
      label: 'Стац',
      name: 'landline_phone',
      placeholder: '',
      readonly: false,
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      validations: { number, maxLength: maxLength(4) },
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
      name: 'object_type',
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
      type: 'TableDefault',
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
            isShow: {
              condition: [
                {
                  direction_id: [2],
                  permissions: [1],
                  vertical: false,
                  type: false,
                },
              ],
            },
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
              type: 'string',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          alias: 'sa.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'sp.name',
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
          alias: 'sa.telefon',
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
          alias: 'sa.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
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
        },
        // {
        //   title: 'Действия',
        //   type: 'actions',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'right',
        //   },
        //   isShow: true,
        //   width: '100',
        //   value: 'actions',
        //   actions: [
        //     {
        //       type: 'button',
        //       url: '$IconEdit',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //     {
        //       type: 'button',
        //       url: '$IconDelete',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //   ],
        // },
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
          fields,
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
                validations: { required },
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
                validations: { required },
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
                validations: { required },
              }),
              stringField({
                label: 'Email',
                name: 'email',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                bootstrapClass: [''],
                validations: { required },
              }),
              stringField({
                label: 'Стац',
                name: 'landline_phone',
                placeholder: '',
                readonly: false,
                class: [''],
                position: {
                  cols: 12,
                  sm: 4,
                },
                bootstrapClass: [''],
                validations: { number, maxLength: maxLength(4) },
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
                validations: { required },
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
                validations: { required },
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
                validations: { required },
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
                name: 'object_type',
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
                validations: { required },
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
                handlingResponse: {
                  1: {
                    text: 'Аккаунт создан',
                    color: 'success',
                  },
                  2: {
                    text: 'Такой аккаунт уже существует',
                    color: 'error',
                  },
                  3: {
                    text: '',
                  },
                },
              }),
            ],
          },
          {
            path: 'edit',
            id: 7,
            name: 'Банковские карты',
            type: 'TableDefault',
            active: false,
            config: bankConfig,
          },
        ],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
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
      type: 'TableDefault',
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
          alias: 'sa.fio',
          isShow: true,
          width: '40',
          value: 'fio',
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
          alias: 'sp.name',
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
          alias: 'sa.telefon',
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
          alias: 'sa.landline_phone',
          value: 'landline_phone',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Направление',
        //   type: 'default',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: undefined,
        //   },
        //   sorts: [
        //     {
        //       type: 'text',
        //       default: '',
        //       value: '',
        //       isShow: false,
        //     },
        //   ],
        //   isShow: true,
        //   width: '150',
        //   value: 'direction_json',
        //   alias: 'p.direction_json',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
        // {
        //   title: 'Роль',
        //   type: 'default',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: undefined,
        //   },
        //   sorts: [
        //     {
        //       type: 'text',
        //       default: '',
        //       value: '',
        //       isShow: false,
        //     },
        //   ],
        //   isShow: true,
        //   width: '150',
        //   value: 'permission_name',
        //   alias: 'p.permission_name',
        //   search: {
        //     field: '',
        //     isShow: true,
        //   },
        // },
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
          alias: 'sa.comment',
          search: {
            field: '',
            isShow: true,
          },
        },
        // {
        //   title: 'Действия',
        //   type: 'actions',
        //   align: 'center',
        //   fixed: {
        //     value: false,
        //     position: 'right',
        //   },
        //   isShow: true,
        //   width: '100',
        //   value: 'actions',
        //   actions: [
        //     {
        //       type: 'button',
        //       url: '$IconEdit',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //     {
        //       type: 'button',
        //       url: '$IconDelete',
        //       function: consoleButton,
        //       label: 'Удалить',
        //     },
        //   ],
        // },
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
        alias: 'account3',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          fields,
          {
            id: 1,
            name: 'Расход',
            type: 'TableDefault',
            active: false,
            config: consumptionConfig,
          },
        ],
        activeTab: null,
      },
      filters: _.cloneDeep(filters),
    },
  ],
}

export default config
