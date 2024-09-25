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

const editFields = [
  selectField({
    label: 'Статус',
    name: 'status',
    alias: 'status_zr',
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            ((Number(context.originalData.from_account_id) !==
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4 ||
              context.store.state.user.permission_id === 16 ||
              (context.store.state.user.permission_id === 3 &&
                context.originalData.direction_id === 7)) &&
              (context.originalData.status === 1 ||
                context.originalData.status === 2 ||
                context.originalData.status === 3)) ||
            ((context.store.state.user.permission_id === 12 ||
              context.store.state.user.permission_id === 22) &&
              context.originalData.status === 4) ||
            context.originalData.status === 2,
          type: false, //могу при этих условиях
        },
      ],
    },
    hideOption: [
      // {
      //   target: 'status',
      //   targetValue: [1, 2, 3],
      //   value: [1, 2, 3],
      //   type: false,
      // },
      // {
      //   target: 'status',
      //   targetValue: [4],
      //   value: [4, 9],
      //   type: false,
      // },
      // {
      //   target: 'status',
      //   targetValue: [9],
      //   value: [9],
      //   type: false,
      // },
      {
        func: (context) => {
          return (
            (context.formData?.status === 1 ||
              context.formData?.status === 2 ||
              context.formData?.status === 3) &&
            !(
              context.store.state.user.permission_id === 12 ||
              context.store.state.user.permission_id === 22
            )
          )
        },
        value: [1, 2, 3],
        type: false,
      },
      {
        func: (context) => {
          return (
            context.originalData?.status === 2 &&
            (context.store.state.user.permission_id === 12 ||
              context.store.state.user.permission_id === 22)
          )
        },
        value: [2, 4],
        type: false,
      },
      {
        func: (context) => {
          return (
            context.originalData?.status === 4 &&
            (context.store.state.user.permission_id === 12 ||
              context.store.state.user.permission_id === 22)
          )
        },
        value: [4, 9],
        type: false,
      },
    ],
    // hiding: {
    //   conditions: [
    //     {
    //       target: 'formData',
    //       field: 'status',
    //       value: [1, 2, 3],
    //       values: [1, 2, 3, 4],
    //     },
    //     {
    //       target: 'formData',
    //       field: 'status',
    //       value: [4],
    //       values: [4, 9],
    //     },
    //     {
    //       target: 'formData',
    //       field: 'status',
    //       value: [2],
    //       values: [2, 4],
    //     },
    //   ],
    // },
    validations: { required },
    bootstrapClass: [''],
  }),
  selectField({
    label: 'От',
    name: 'status_account_id',
    placeholder: '',
    value: '',
    class: [''],
    readonly: true,
    disabled: true,
    selectOption: {
      text: 'name',
      value: 'id',
    },
    items: [],
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            Number(context.originalData.from_account_id) ===
              context.store.state.user.id && context.originalData.status === 1,
          type: false,
        },
      ],
    },
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
          // {
          //   field: 'id',
          //   alias: 'account_id',
          //   value: '',
          //   source: 'environment',
          //   type: 'num',
          // },
          {
            field: 'from_account_id',
            alias: 'me',
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
            field: 'payment_type',
            alias: 'type_pay',
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
            value: '',
            source: 'formData',
            type: 'num',
          },
        ],
      },
    ],
    dependence: [
      // {
      //   type: 'default',
      //   action: {
      //     type: 'hideOptions',
      //     field: 'on_yourself',
      //     targetField: 'payment_type',
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
            formKey: 'account_id',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'personal_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'permission_accounts_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
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
    placeholder: '',
    class: [''],
    value: '',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
    validations: { required },
    bootstrapClass: [''],
  }),
  selectField({
    label: 'ФИО',
    name: 'account_id',
    alias: 'me',
    requestKey: 'me',
    placeholder: '',
    class: [''],
    notSend: true,
    readonly: true,
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
    name: 'type_zayavka',
    alias: 'vector_id',
    requestKey: 'vector_id',
    class: ['background-upper'],
    bootstrapClass: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
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
      //     targetField: 'payment_type',
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
      //     field: 'type_zayavka',
      //     targetField: 'payment_type',
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
            formKey: 'account_id',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'personal_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'object_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
          },
          {
            formKey: 'permission_accounts_zr',
            compareKey: 'id',
            objectKey: 'name',
            targetKey: 'to_name',
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
          context.formData.payment_type = null
          context.formData.rek_id = null
        },
      },
    ],
    updateList: [
      {
        alias: 'req_zr_id',
        condition: [
          {
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
    label: 'Сотрудник',
    name: 'personal_zr',
    requestKey: 'personal_id',
    // subtype: 'single',
    subtype: 'single',
    placeholder: '',
    class: ['background-middle'],
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            targetKey: 'to_name',
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
        { field: 'type_zayavka', value: [1] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
        { field: 'type_zayavka', value: [1] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
        { field: 'type_zayavka', value: [1] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            field: 'type_zayavka',
            alias: 'vector_id',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'direction_id',
            value: '',
            source: 'formData',
            type: 'num',
          },
        ],
      },
    ],
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
        { field: 'type_zayavka', value: [2] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            field: 'type_zayavka',
            alias: 'vector_id',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'direction_id',
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
            targetKey: 'to_name',
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
        { field: 'type_zayavka', value: [2] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
        { field: 'type_zayavka', value: [3] },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            targetKey: 'to_name',
          },
        ],
      },
    ],
    isShow: {
      value: false,
      conditions: [
        { field: 'type_zayavka', value: [3] },
        { field: 'on_yourself', value: [false] },
      ],
    },
  }),

  selectField({
    label: 'Категория',
    name: 'rashod_category_id',
    alias: 'category_zr',
    // name: 'rashod_category_id',
    requestKey: 'category_id',
    placeholder: '',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    prescription_name: 'rashod_vid_id',
    placeholder: '',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    prescription_name: 'count',
    placeholder: '',
    class: [''],
    prescription: 'items',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    prescription_name: 'price',
    placeholder: '',
    class: [''],
    prescription: 'items',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    prescription_name: 'is_debit',
    value: false,
    placeholder: '',
    class: [''],
    prescription: 'items',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    prescription_name: 'name',
    placeholder: '',
    class: [''],
    prescription: 'items',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
    bootstrapClass: [''],
    label: '+',
    color: 'success',
    increase: true,
  },

  selectField({
    label: 'Тип оплаты',
    name: 'payment_type',
    alias: 'type_pay',
    requestKey: 'type_pay',
    placeholder: '',
    class: [''],
    value: '',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            context.originalData.status === 1 ||
            context.originalData.status === 3 ||
            context.originalData.status === 9,
          type: false,
        },
      ],
    },
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
            value: [1],
          },
          {
            key: 'payment_type',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
            key: 'type_zayavka',
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
            field: 'payment_type',
            alias: 'type_pay',
            value: '',
            source: 'formData',
            type: 'num',
          },
          {
            field: 'type_zayavka',
            alias: 'vector_id',
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
          //   field: 'account_id',
          //   value: '',
          //   source: 'formData',
          //   type: 'num',
          // },
          {
            field: 'from_account_id',
            alias: 'me',
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
            field: 'payment_type',
            alias: 'type_pay',
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
        target: 'type_zayavka',
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
    name: 'rek_id',
    alias: 'req_zr_id',
    subtype: 'single',
    placeholder: '',
    class: [''],
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            context.originalData.status === 1 ||
            context.originalData.status === 3 ||
            context.originalData.status === 9,
          type: false,
        },
      ],
    },
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
      value: false,
      conditions: [{ field: 'payment_type', value: [1, 2, 3, 6, 7] }],
    },
  }),
  dropZoneField({
    label: 'Скан-копия/фото',
    name: 'check_docs',
    notPut: true,
    placeholder: '',
    grouping: 'multiple',
    stash: 'schet',
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            context.originalData.status === 1 ||
            context.originalData.status === 3 ||
            context.originalData.status === 9,
          type: false,
        },
      ],
    },
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
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
      conditions: [{ field: 'payment_type', value: [4] }],
    },
    value: [],
  }),
  {
    type: 'schet',
    name: 'schet',
    id: 'schet',
    disable: false,
    mode: 'all',
    placeholder: '',
    class: [''],
    position: { cols: 12, sm: 12 },
    notSend: true,
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id &&
              (context.originalData.status === 1 ||
                context.originalData.status === 3 ||
                context.originalData.status === 9)) ||
            (Number(context.originalData.from_account_id) !==
              context.store.state.user.id &&
              context.originalData.status === 9),
          type: false,
        },
      ],
    },
    isShow: {
      value: false,
      conditions: [{ field: 'payment_type', value: [4] }],
    },
    bootstrapClass: [''],
  },
  textareaField({
    label: 'Ошибка',
    name: 'error_text',
    alias: 'pd.note',
    placeholder: '',
    class: [''],
    readonly: {
      value: false,
      condition: [
        {
          target: 'originalData',
          field: 'status',
          permissions: [12, 22],
          value: [4, 5],
          type: false,
        },
      ],
    },
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
    readonly: {
      value: false,
      condition: [
        {
          funcCondition: (context) =>
            (Number(context.originalData.from_account_id) ===
              context.store.state.user.id ||
              context.store.state.user.permission_id === 4) &&
            (context.originalData.status === 1 ||
              context.originalData.status === 3),
          type: false,
        },
      ],
    },
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
    name: 'to_name',
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
    requestKey: 'regions_id',
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
    label: 'from_account_id',
    name: 'from_account_id',
    placeholder: '',
    class: [''],
    notSend: true,
    readonly: true,
    // selectOption: {
    //   text: 'name',
    //   value: 'id',
    // },
    position: {
      cols: 12,
      sm: 12,
    },
    // putFirst: true,
    // disabled: true,
    isShow: {
      value: false,
    },
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
  path: 'id',
  id: 1,
  name: 'Заявка на расход',
  type: Expenses,
  detail: true,
  lists: [
    { alias: 'status_zr', filter: [] },
    { alias: 'direction_id', filter: [] },
    { alias: 'category_zr', filter: [] },
    { alias: 'account_id', filter: [] },
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
    { alias: 'status_account_id', filter: [] },
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

    {
      alias: 'req_zr_id',
      condition: [
        {
          key: 'type_zayavka',
          value: [1],
        },
        {
          key: 'payment_type',
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
          field: 'payment_type',
          alias: 'type_pay',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'type_zayavka',
          alias: 'vector_id',
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
          key: 'type_zayavka',
          value: [1],
        },
        {
          key: 'payment_type',
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
          field: 'payment_type',
          alias: 'type_pay',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'type_zayavka',
          alias: 'vector_id',
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
          key: 'type_zayavka',
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
          field: 'payment_type',
          alias: 'type_pay',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'type_zayavka',
          alias: 'vector_id',
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
          key: 'type_zayavka',
          value: [3],
        },
      ],
      filter: [
        {
          field: 'account_id',
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
          field: 'payment_type',
          alias: 'type_pay',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'type_zayavka',
          alias: 'vector_id',
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
        //   field: 'account_id',
        //   value: '',
        //   source: 'formData',
        //   type: 'num',
        // },
        {
          field: 'from_account_id',
          alias: 'me',
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
          field: 'payment_type',
          alias: 'type_pay',
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
      alias: 'me',
      filter: [
        {
          field: 'from_account_id',
          alias: 'account_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
  ],
  alias: 'zayavka',
  active: false,
  fields: editFields,
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
      text: 'Исправлено',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'correct/zayavka',
      action: 'saveFormId',
      color: 'primary',
      // isHide: false,
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) =>
              context.originalData?.status === 9 &&
              !context.environment.readonlyAll,
            type: false,
          },
        ],
      },
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      color: 'primary',
      module: 'form/putForm',
      url: 'update/zayavka',
      // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
      name: 'customFormStore',
      action: 'customFormStore',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) =>
              context.originalData?.status !== 9 &&
              !context.environment.readonlyAll,
            type: false,
          },
        ],
      },
    }),
  ],
  formData: {},
}

export default config
