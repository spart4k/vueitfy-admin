import Expenses from '@/components/Form/expenses/index.vue'
import { required, number } from '@/utils/validation.js'
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
  carouselField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'

const addFields = [
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
    readonly: true,
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
          {
            field: 'type_objects',
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
    dependence: [
      // {
      //   type: 'default',
      //   action: {
      //     type: 'hideOptions',
      //     field: 'on_yourself',
      //     targetField: 'type_pay',
      //     condition: [
      //       {
      //         value: true,
      //         options: [1],
      //       },
      //     ],
      //   },
      // },
      {
        type: 'default',
        fillField: [
          {
            formKey: 'me',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'personal_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'permission_accounts_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
        ],
      },
    ],
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
        alias: 'type_objects',
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
          {
            field: 'type_objects',
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
    readonly: true,
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
      // {
      //   type: 'default',
      //   action: {
      //     type: 'hideOptions',
      //     field: 'on_yourself',
      //     targetField: 'type_pay',
      //     condition: [
      //       {
      //         value: true,
      //         options: [1],
      //       },
      //     ],
      //   },
      // },
      // {
      //   type: 'default',
      //   action: {
      //     type: 'hideOptions',
      //     field: 'vector_id',
      //     targetField: 'type_pay',
      //     condition: [
      //       {
      //         value: 2,
      //         options: [1],
      //       },
      //       {
      //         value: 3,
      //         options: [1],
      //       },
      //     ],
      //   },
      // },
      {
        type: 'default',
        fillField: [
          {
            formKey: 'me',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'personal_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'permission_accounts_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
        ],
      },
      {
        type: 'computed',
        funcComputed: (context) => {
          context.formData.personal_zr = null
          context.formData.personal_object_zr = null
          context.formData.personal_account_zr = null
          context.formData.type_objects = null
          context.formData.object_zr = null
          context.formData.permissions_zr = null
          context.formData.permission_accounts_zr = null
          context.formData.type_pay = null
          context.formData.req_zr_id = null
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
          {
            field: 'type_objects',
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
    // hiding: {
    //   conditions: [
    //     {
    //       target: 'type_pay',
    //       field: 'vector_id',
    //       value: [2],
    //       values: [1, 2, 3],
    //     },
    //   ],
    // },
  }),

  autocompleteField({
    label: 'Сотрудник',
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
        fillField: [
          {
            formKey: 'personal_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
        ],
      },
    ],
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
    label: 'Руководитель',
    name: 'personal_account_zr',
    requestKey: 'account_id',
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
          {
            field: 'personal_account_zr',
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
    label: 'Объект',
    name: 'personal_object_zr',
    requestKey: 'object_id',
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
    updateList: [
      {
        alias: 'type_pay',
        filter: [
          {
            field: 'type_objects',
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
            field: 'vector_id',
            value: '',
            source: 'formData',
            type: 'num',
          },
        ],
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
  autocompleteField({
    label: 'Объект',
    name: 'object_zr',
    requestKey: 'object_id',
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
        alias: 'type_pay',
        filter: [
          {
            field: 'type_objects',
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
          {
            field: 'type_objects',
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
        fillField: [
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'id',
            targetKey: 'habitation_id',
          },
          'regions_id',
          'city_id',
        ],
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
        fillField: [
          {
            formKey: 'permission_accounts_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'name',
          },
        ],
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
    notSend: true,
    position: {
      cols: 12,
      sm: 5,
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
    notSend: true,
    position: {
      cols: 12,
      sm: 2,
    },
    validations: { required, number },
    bootstrapClass: [''],
  }),
  stringField({
    label: 'Стоимость',
    name: 'price',
    placeholder: '',
    class: [''],
    prescription: 'items',
    notSend: true,
    position: {
      cols: 12,
      sm: 3,
    },
    validations: { required, number },
    bootstrapClass: [''],
  }),
  checkboxField({
    label: 'ВДС',
    name: 'vds',
    value: false,
    placeholder: '',
    class: [''],
    prescription: 'items',
    notSend: true,
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
    notSend: true,
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
    disable: false,
    isShow: true,
    mode: 'all',
    placeholder: '',
    class: [''],
    position: { cols: 12, sm: 6 },
    notSend: true,
    readonly: false,
    bootstrapClass: [''],
    label: '-',
    color: 'primary',
    increase: false,
  },
  {
    type: 'btn',
    name: 'btn-increase',
    id: 'btn-increase',
    disable: false,
    isShow: true,
    mode: 'all',
    placeholder: '',
    class: [''],
    position: { cols: 12, sm: 6 },
    notSend: true,
    readonly: false,
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
            funcCondition: (context) =>
              context.formData.vector_id === 1 && !context.formData.on_yourself,
          },
          {
            key: 'type_pay',
            funcCondition: (context) => {
              return (
                [2, 3].includes(context.formData.type_pay) &&
                !context.formData.on_yourself
              )
            },
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
          {
            field: 'type_objects',
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
          // {
          //   field: 'id',
          //   alias: 'account_id',
          //   value: '',
          //   source: 'environment',
          //   type: 'num',
          // },
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
    hideOption: [
      {
        target: 'vector_id',
        targetValue: [2, 3],
        value: [1],
        type: true,
      },
      {
        target: 'on_yourself',
        targetValue: [true],
        value: [1],
        type: true,
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
        fillField: ['rek1', 'rek2', 'bank_id', 'owner_id', 'realtor_id'],
      },
    ],
    isShow: {
      value: true,
      conditions: [{ field: 'type_pay', value: [1, 2, 3, 6, 7] }],
    },
  }),
  dropZoneField({
    label: 'Скан-копия/фото',
    name: 'check_docs',
    notPut: true,
    placeholder: '',
    grouping: 'multiple',
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
      fileName: true,
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
    name: 'error_text',
    alias: 'pd.note',
    placeholder: '',
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    disabled: true,
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
    value: false,
    placeholder: '',
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
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
  stringField({
    label: 'rek2',
    name: 'rek2',
    placeholder: '',
    class: [''],
    disabled: true,
    isShow: {
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
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
      value: true,
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
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
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
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
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
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
  stringField({
    label: 'owner_id',
    name: 'owner_id',
    placeholder: '',
    class: [''],
    requestType: 'number',
    disabled: true,
    isShow: {
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
  stringField({
    label: 'realtor_id',
    name: 'realtor_id',
    placeholder: '',
    class: [''],
    requestType: 'number',
    disabled: true,
    isShow: {
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
  stringField({
    label: 'habitation_id',
    name: 'habitation_id',
    placeholder: '',
    class: [''],
    requestType: 'number',
    disabled: true,
    isShow: {
      value: true,
    },
    position: {
      cols: 12,
      sm: 12,
    },
    // validations: { required },
    bootstrapClass: [''],
  }),
]

export const config = {
  path: 'add',
  id: 0,
  name: 'Заявка на расход',
  type: Expenses,
  detail: true,
  lists: [
    { alias: 'status_zr', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'category_zr', filter: [] },
    { alias: 'me', filter: [] },
    {
      alias: 'type_objects',
      filter: [
        {
          field: 'direction_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
    { alias: 'type_pay', filter: [] },
  ],
  alias: 'zayavka',
  active: false,
  fields: addFields,
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
      name: 'saveFormStore',
      action: 'saveFormStore',
      // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
    }),
  ],
  formData: {},
}

export default config
