import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import { required, notValue, interval } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import text from '@/components/Mails/letter/text/setup'
import { isAllBug } from '@/utils/permissions'
const isMagnit = (ctx) => {
  return ctx.formData.direction_id === 2 && ctx.formData.type === 2
}

const conditionLogistik = (context) => {
  return (
    [1, 6, 7].includes(context.formData.direction_id) &&
    context.formData.account_id !== context.store.state.user.id &&
    (context.formData.status_id === 1 ||
      context.formData.status_id === 3 ||
      ((context.store.state.user.permission_id === 12 ||
        context.store.state.user.permission_id === 22) &&
        context.originalData?.status_id === 4)) &&
    context.mode === 'edit'
  )
}
const conditionX5 = (context) => {
  return !(
    context.formData.direction_id === 2 &&
    context.store.state.user.permission_id === 1 &&
    context.formData.status_id === 1 &&
    context.formData.bank_id === 1 &&
    context.mode === 'edit'
  )
}

const statusReject = (context) => {
  return context.formData.status_id === 6 && context.mode === 'edit'
}

const ROKKdOKKLogistika = (context) => {
  return (
    [8, 17].includes(context.store.state.user.permission_id) &&
    context.originalData.status_id !== 2 &&
    [1, 6, 7].includes(context.formData.direction_id)
  )
}

const ROKKdOKKRoznicd = (context) => {
  return (
    [8, 17].includes(context.store.state.user.permission_id) &&
    context.originalData.status_id !== 2 &&
    context.formData.direction_id === 2
  )
}

const AvansEjednLogistik = (context) => {
  return (
    [1, 6, 7].includes(context.formData.direction_id) &&
    [1, 5].includes(context.formData.vid_vedomost_id)
  )
}

export default {
  id: uuidv4(),
  name: 'Добавить начисление',
  type: 'FormDefault',
  path: 'add-edit-logistic',
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '780px',
    method: 'get',
    alias: 'payment',
    url: '/get/form/',
    bootstrapClass: [''],
    tabs: [
      {
        id: 8,
        path: 'output',
        name: 'Основные',
        type: 'FormOutputCorrect',
        detail: true,
        lists: [
          {
            alias: 'bind_directions',
            filter: [
              {
                field: 'bind_objects',
                alias: 'object_id',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
          // 'user_keys',
          // 'habitation_id',
          // 'account_id',
          // 'direction_id',
          // 'grajdanstvo_id',
        ],
        alias: 'personal',
        active: false,
        fields: [
          autocompleteField({
            label: 'Объект',
            //subtype: 'multiple',
            name: 'bind_objects',
            requestKey: 'object_id',
            //subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            //readonly: true,
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/bind_objects',
            // object
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            filter: [
              {
                field: 'personal_id',
                value: '',
                // source: '+route.params.id',
                routeKey: 'id',
              },
            ],
            dependence: [
              {
                type: 'api',
                module: 'selects/getListUpdate',
                field: 'bind_directions',
                url: 'get/pagination_list/bind_directions',
                filter: [
                  {
                    field: 'bind_objects',
                    alias: 'object_id',
                    value: '',
                    type: 'num',
                  },
                  {
                    field: 'personal_id',
                    value: '',
                    // source: '+route.params.id',
                    type: 'num',
                    routeKey: 'id',
                  },
                ],
              },
            ],
            //isShow: {
            //  value: false,
            //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
            //},
          }),
          autocompleteField({
            label: 'Направления',
            subtype: 'multiple',
            name: 'bind_directions',
            alias: '',
            notSend: true,
            //subtype: 'single',
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'name',
              value: 'id',
            },
            //readonly: true,
            items: [],
            page: 1,
            search: '',
            url: 'get/pagination_list/bind_objects',
            // object
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            updateList: [
              {
                alias: 'bind_accounts',
                filter: [
                  {
                    field: 'bind_objects',
                    alias: 'object_id',
                    source: 'formData',
                    value: '',
                    type: 'num',
                  },
                  {
                    field: 'bind_directions',
                    alias: 'direction_json',
                    source: 'formData',
                    value: '',
                    type: 'array',
                  },
                  {
                    field: 'personal_id',
                    value: '',
                    // source: '+route.params.id',
                    routeKey: 'id',
                    type: 'num',
                  },
                ],
              },
            ],
            filter: [
              {
                field: 'bind_objects',
                alias: 'object_id',
                value: '',
                type: 'num',
              },
              {
                field: 'bind_directions',
                alias: 'direction_json',
                value: '',
                type: 'array',
              },
              {
                field: 'personal_id',
                value: '',
                // source: '+route.params.id',
                routeKey: 'id',
                type: 'num',
              },
            ],
            //isShow: {
            //  value: false,
            //  conditions: [{ field: 'direction_id', value: [[1], [6], [1, 6]] }],
            //},
          }),
          selectField({
            label: 'Сотрудники',
            name: 'account_json',
            alias: 'bind_accounts',
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
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'personal',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveForm',
            url: 'update/personal/object',
            action: 'saveForm',
            color: 'primary',
            handlingResponse: {
              1: {
                text: 'Объект привязан',
                color: 'success',
              },
              2: {
                text: 'Сотрудник удален',
                color: 'error',
              },
              3: {
                text: '',
              },
            },
          }),
        ],
      },
    ],
  },
  //lists: [],
  lists: [
    {
      alias: 'payment_vid_vedomost_id',
      filter: [
        {
          field: 'direction_id',
          // alias: 'pb.id',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'type',
          alias: 'type_object_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'date_target',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          alias: 'mode',
          source: 'mode',
          type: 'num',
        },
      ],
    },
    {
      alias: 'payment_status_id',
      filter: [
        {
          alias: 'mode',
          source: 'mode',
          type: 'num',
        },
      ],
    },
    {
      alias: 'payment_direction_id',
      filter: [
        {
          field: 'account_id',
          // alias: 'account_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          alias: 'mode',
          source: 'mode',
          type: 'num',
        },
      ],
    },
    {
      alias: 'payment_direction_id',
      filter: [
        {
          field: 'account_id',
          // alias: 'account_id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
    {
      alias: 'doljnost_id',
      filter: [],
    },
    {
      alias: 'personal_bank_id',
      filter: [
        {
          field: 'personal_id',
          // alias: 'pb.id',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          field: 'vid_vedomost_id',
          // alias: 'pb.id',
          value: '',
          source: 'formData',
          type: 'num',
        },
      ],
    },
    {
      alias: 'status_account_id',
      filter: [],
    },
  ],
  alias: 'payment',
  active: false,
  fields: [
    selectField({
      label: 'Статус',
      name: 'status_id',
      alias: 'payment_status_id',
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
      value: +1,
      validations: { required },
      bootstrapClass: [''],
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) =>
              (context.formData.account_id !== context.store.state.user.id &&
                context.store.state.user.is_personal_vertical &&
                (context.formData.status_id === 1 ||
                  context.formData.status_id === 3)) ||
              // Условия для показа поля РОКК и ОКК
              ((context.store.state.user.permission_id === 8 ||
                context.store.state.user.permission_id === 17) &&
                (context.formData.status_id === 2 ||
                  context.formData.status_id === 1 ||
                  context.formData.status_id === 3)) ||
              (context.store.state.user.permission_id === 4 &&
                (context.formData.status_id === 2 ||
                  context.formData.status_id === 1 ||
                  context.formData.status_id === 3)) ||
              ((context.store.state.user.permission_id === 12 ||
                context.store.state.user.permission_id === 22) &&
                context.originalData?.status_id === 4),
            // asdasd
            type: false,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 1 &&
              context.store.state.user.id === context.formData.manager_id &&
              context.store.state.user.permission_id !== 4,
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     (context.store.state.user.permission_id === 8 ||
          //       context.store.state.user.permission_id === 18) &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3),
          //   type: false,
          // },
          {
            funcCondition: (context) => {
              return AvansEjednLogistik(context)
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              return (
                context.mode === 'add' &&
                context.formData.type === 2 &&
                context.formData.direction_id === 2
              )
            },
            type: true,
          },
        ],
      },
      hiding: {
        conditions: [
          {
            target: 'formData',
            field: 'status_id',
            value: [1, 2, 3],
            values: [1, 2, 3],
          },
          {
            target: 'formData',
            field: 'status_id',
            value: [4],
            values: [4, 6],
          },
          // {
          //   target: 'formData',
          //   field: 'status_id',
          //   permissions: [3, 15],
          //   value: [1, 2, 3],
          //   values: [1, 3],
          // },
          // {
          //   funcCondition: (context) => {
          //     context.formData.status_id === 1 && context.store.state.user.id === context.formData.status_account_id && context.store.state.permission_id !== 4
          //   },
          //   values: [1, 3],
          // },
        ],
      },
      // readonly: true,
    }),
    selectField({
      label: 'Статус от',
      name: 'status_account_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 3,
                false: 6,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 3,
                false: 3,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 3,
                false: 3,
              },
              // type: false,
            },
          ],
          default: 3,
        },
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    datetimeField({
      label: 'Смена статуса',
      name: 'date_status',
      value: '',
      type: 'datetime',
      subtype: 'datetime',
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      // validations: { hasDate, hasTime },
      bootstrapClass: [''],
      disable: false,
      readonly: true,
    }),
    dateField({
      label: 'Дата начисл',
      name: 'date_create',
      subtype: 'datetime',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 3,
                false: 3,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 3,
                false: 3,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 3,
                false: 3,
              },
              // type: false,
            },
          ],
          default: 3,
        },
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    // selectField({
    //   label: 'Менеджер',
    //   name: 'account_id',
    //   alias: 'payment_account_id',
    //   subtype: 'single',
    //   placeholder: '',
    //   class: ['noWrap'],
    //   selectOption: {
    //     text: 'name',
    //     value: 'id',
    //   },
    //   items: [],
    //   position: {
    //     cols: 12,
    //     // sm: 6,
    //     // condition: []
    //     sm: {
    //       conditon: [
    //         {
    //           funcCondition: (context) =>
    //             context.formData.vid_vedomost_id === 1,
    //           value: {
    //             true: 5,
    //             false: 6,
    //           },
    //           // type: false,
    //         },
    //         {
    //           funcCondition: (context) =>
    //             context.formData.vid_vedomost_id === 5,
    //           value: {
    //             true: 5,
    //             false: 6,
    //           },
    //           // type: false,
    //         },
    //         {
    //           funcCondition: (context) =>
    //             context.formData.vid_vedomost_id === 9,
    //           value: {
    //             true: 4,
    //             false: 6,
    //           },
    //           // type: false,
    //         },
    //       ],
    //       default: 4,
    //     },
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    //   updateList: [
    //     {
    //       alias: 'payment_direction_id',
    //       filter: [
    //         {
    //           field: 'account_id',
    //           // alias: 'account_id',
    //           value: '',
    //           source: 'formData',
    //           type: 'num',
    //         },
    //       ],
    //     },
    //   ],
    //   dependence: [
    //     {
    //       type: 'api',
    //       module: 'selects/getListUpdate',
    //       field: 'object_id',
    //       //filter: [
    //       //  {
    //       //    field: 'direction_id',
    //       //    value: '',
    //       //  },
    //       //],
    //       url: 'get/pagination_list/payment_object_id',
    //     },
    //     {
    //       type: 'api',
    //       module: 'selects/getListUpdate',
    //       field: 'personal_id',
    //       //filter: [
    //       //  {
    //       //    field: 'direction_id',
    //       //    value: '',
    //       //  },
    //       //],
    //       condition: [
    //         {
    //           field: 'direction_id',
    //           value: [2],
    //         },
    //       ],
    //       url: 'get/pagination_list/payment_personal_id',
    //     },
    //     // {
    //     //   type: 'api',
    //     //   module: 'selects/getListUpdate',
    //     //   field: 'object_id',
    //     //   //filter: [
    //     //   //  {
    //     //   //    field: 'direction_id',
    //     //   //    value: '',
    //     //   //  },
    //     //   //],
    //     //   condition: [
    //     //     {
    //     //       field: 'direction_id',
    //     //       value: [1],
    //     //     },
    //     //   ],
    //     //   url: 'get/pagination_list/payment_personal_id',
    //     // },
    //   ],
    //   readonly: {
    //     value: false,
    //     condition: [
    //       // {
    //       //   target: 'formData',
    //       //   field: 'vid_vedomost_id',
    //       //   value: [1, 5],
    //       //   type: true,
    //       // },
    //       // {
    //       //   permissions: [8, 17],
    //       //   type: true,
    //       // },
    //       // {
    //       //   funcCondition: (context) =>
    //       //     context.formData.account_id === context.store.state.user.id &&
    //       //     (context.formData.status_id === 1 ||
    //       //       context.formData.status_id === 3),
    //       //   type: false,
    //       // },
    //       // {
    //       //   funcCondition: (context) =>
    //       //     context.formData.account_id !== context.store.state.user.id &&
    //       //     (context.formData.status_id === 1 ||
    //       //       context.formData.status_id === 3 ||
    //       //       ((context.store.state.user.permission_id === 12 ||
    //       //         context.store.state.user.permission_id === 22) &&
    //       //         context.originalData?.status_id === 4)) &&
    //       //     context.mode === 'edit',
    //       //   type: true,
    //       // },
    //       {
    //         funcCondition: (context) => {
    //           return (
    //             context.formData.account_id !== context.store.state.user.id &&
    //             (context.formData.status_id === 1 ||
    //               context.formData.status_id === 3 ||
    //               ((context.store.state.user.permission_id === 12 ||
    //                 context.store.state.user.permission_id === 22) &&
    //                 context.formData?.status_id === 4)) &&
    //             context.mode === 'edit'
    //           )
    //         },
    //         type: true,
    //       },
    //       {
    //         funcCondition: (context) =>
    //           context.formData.status_id === 6 && context.mode === 'edit',
    //         type: true,
    //       },
    //       // {
    //       //   funcCondition: (context) =>
    //       //     context.formData.status_id === 6 && context.mode === 'edit',
    //       //   type: true,
    //       // },
    //       // {
    //       //   funcCondition: (context) =>
    //       //     (context.store.state.user.id !== context.formData.manager_id ||
    //       //       context.store.state.user.is_personal_vertical) &&
    //       //     (context.formData.status_id === 1 ||
    //       //       context.formData.status_id === 3),
    //       //   type: false,
    //       // },
    //       // {
    //       //   funcCondition: (context) => context.mode === 'add',
    //       //   type: false,
    //       // },
    //     ],
    //   },
    // }),
    autocompleteField({
      label: 'Менеджер',
      name: 'account_id',
      alias: 'payment_account_id',
      subtype: 'single',
      placeholder: '',
      class: ['noWrap'],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/account_payment_id',
      position: {
        cols: 12,
        // sm: 6,
        // condition: []
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 5,
                false: 6,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 5,
                false: 6,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 6,
              },
              // type: false,
            },
          ],
          default: 4,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      updateList: [
        {
          alias: 'payment_direction_id',
          filter: [
            {
              field: 'account_id',
              // alias: 'account_id',
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
          field: 'object_id',
          //filter: [
          //  {
          //    field: 'direction_id',
          //    value: '',
          //  },
          //],
          url: 'get/pagination_list/payment_object_id',
        },
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'personal_id',
          //filter: [
          //  {
          //    field: 'direction_id',
          //    value: '',
          //  },
          //],
          condition: [
            {
              field: 'direction_id',
              value: [2],
            },
          ],
          url: 'get/pagination_list/payment_personal_id',
        },
        // {
        //   type: 'api',
        //   module: 'selects/getListUpdate',
        //   field: 'object_id',
        //   //filter: [
        //   //  {
        //   //    field: 'direction_id',
        //   //    value: '',
        //   //  },
        //   //],
        //   condition: [
        //     {
        //       field: 'direction_id',
        //       value: [1],
        //     },
        //   ],
        //   url: 'get/pagination_list/payment_personal_id',
        // },
      ],
      readonly: {
        value: false,
        condition: [
          // {
          //   target: 'formData',
          //   field: 'vid_vedomost_id',
          //   value: [1, 5],
          //   type: true,
          // },
          // {
          //   permissions: [8, 17],
          //   type: true,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id === context.store.state.user.id &&
          //     (context.formData.status_id === 1 ||
          //       context.formData.status_id === 3),
          //   type: false,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 1 ||
          //       context.formData.status_id === 3 ||
          //       ((context.store.state.user.permission_id === 12 ||
          //         context.store.state.user.permission_id === 22) &&
          //         context.originalData?.status_id === 4)) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) => {
              return (
                context.formData.account_id !== context.store.state.user.id &&
                (context.formData.status_id === 1 ||
                  context.formData.status_id === 3 ||
                  ((context.store.state.user.permission_id === 12 ||
                    context.store.state.user.permission_id === 22) &&
                    context.formData?.status_id === 4)) &&
                context.mode === 'edit'
              )
            },
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 6 && context.mode === 'edit',
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
          // {
          //   funcCondition: (context) =>
          //     (context.store.state.user.id !== context.formData.manager_id ||
          //       context.store.state.user.is_personal_vertical) &&
          //     (context.formData.status_id === 1 ||
          //       context.formData.status_id === 3),
          //   type: false,
          // },
          // {
          //   funcCondition: (context) => context.mode === 'add',
          //   type: false,
          // },
        ],
      },
    }),

    ///////

    selectField({
      label: 'Направление',
      name: 'direction_id',
      alias: 'payment_direction_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 3,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 4,
                false: 3,
              },
              // type: false,
            },
          ],
          default: 4,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'object_id',
          //filter: [
          //  {
          //    field: 'direction_id',
          //    value: '',
          //  },
          //],
          url: 'get/pagination_list/payment_object_id',
        },
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'personal_id',
          //filter: [
          //  {
          //    field: 'direction_id',
          //    value: '',
          //  },
          //],
          condition: [
            {
              field: 'direction_id',
              value: [2],
            },
          ],
          url: 'get/pagination_list/payment_personal_id',
        },
        {
          //fields: ['statement_card', 'cardowner'],
          type: 'default',
          action: {
            type: 'hideOptions',
            //values: [8],
            field: 'direction_id',
            targetField: 'vid_vedomost_id',
            condition: [
              {
                value: 1,
                options: [1, 3, 5, 8],
              },
              {
                value: 6,
                options: [1, 3, 5, 8],
              },
              {
                value: 7,
                options: [1, 3, 5, 8],
              },
            ],
          },
          //url: 'object_id/avatar_with_user_key_id',
        },
        {
          //fields: ['statement_card', 'cardowner'],
          type: 'default',
          action: {
            type: 'hideOptions',
            //values: [8],
            field: 'direction_id',
            targetField: 'vid_vedomost_id',
            condition: [
              {
                value: 1,
                options: [1, 3, 5, 8],
              },
              {
                value: 6,
                options: [1, 3, 5, 8],
              },
              {
                value: [7],
                options: [1, 3, 5, 8],
              },
            ],
          },
          //url: 'object_id/avatar_with_user_key_id',
        },
        // {
        //   type: 'api',
        //   module: 'selects/getListUpdate',
        //   field: 'object_id',
        //   //filter: [
        //   //  {
        //   //    field: 'direction_id',
        //   //    value: '',
        //   //  },
        //   //],
        //   condition: [
        //     {
        //       field: 'direction_id',
        //       value: [1],
        //     },
        //   ],
        //   url: 'get/pagination_list/payment_personal_id',
        // },
      ],
      requiredFields: ['account_id'],
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
            type: true,
          },
          {
            permissions: [8, 17],
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 6 && context.mode === 'edit',
            type: true,
          },
        ],
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
      url: 'get/pagination_list/payment_object_id',
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 4,
                false: 3,
              },
              // type: false,
            },
          ],
          default: 4,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'account_id',
          // source: 'formData',
          type: 'array',
          value: '',
        },
        {
          field: 'direction_id',
          // source: 'formData',
          type: 'array',
          value: '',
        },
      ],
      dependence: [
        {
          type: 'api',
          module: 'selects/getListUpdate',
          field: 'personal_id',
          // filter: [
          //   {
          //     field: 'direction_id',
          //     value: '',
          //   },
          // ],
          url: 'get/pagination_list/payment_personal_id',
        },
        {
          type: 'default',
          fillField: ['type'],
        },
        {
          //fields: ['statement_card', 'cardowner'],
          type: 'custom',
          func: async (ctx) => {
            const body = {
              data: {
                object_id: ctx.formData.object_id,
                doljnost_id: ctx.formData.doljnost_id,
                date_target: moment(
                  ctx.formData.date_target,
                  'YYYY.MM.DD'
                ).format('YYYY-MM-DD'),
              },
            }
            const { code, result } = await ctx.store.dispatch('form/create', {
              body,
              url: 'get/object/price',
            })
            if (code) {
              ctx.formData.object_price = result.price
              ctx.formData.total = ctx.formData.hour * ctx.formData.object_price
              ctx.formData.object_price_id = result.id
            } else {
              ctx.formData.object_price = 0
              ctx.formData.object_price_id = 0
            }
            console.log(result)
          },
        },
        // {
        //   type: 'api',
        //   module: 'selects/getListUpdate',
        //   field: 'object_id',
        //   filter: [
        //     {
        //       field: 'object_json',
        //       type: 'array',
        //       value: '',
        //     },
        //   ],
        //   url: 'get/pagination_list/payment_object_id',
        // },
      ],
      requiredFields: ['direction_id'],
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
            type: true,
          },
          {
            permissions: [8, 17],
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 6 && context.mode === 'edit',
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id === context.store.state.user.id &&
          //     (context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: false,
          // },
        ],
      },
      updateList: [
        {
          alias: 'payment_vid_vedomost_id',
          filter: [
            {
              field: 'direction_id',
              // alias: 'pb.id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'type',
              alias: 'type_object_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'date_target',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              alias: 'mode',
              source: 'mode',
              type: 'num',
            },
          ],
        },
      ],
    }),
    autocompleteField({
      label: 'Линейщик',
      name: 'personal_id',
      subtype: 'single',
      placeholder: '',
      class: ['noWrap'],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      page: 1,
      search: '',
      url: 'get/pagination_list/payment_personal_id',
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 4,
                false: 3,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 5,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'account_id',
          source: 'formData',
          type: 'array',
          value: '',
        },
        {
          field: 'direction_id',
          source: 'formData',
          type: 'array',
          value: '',
        },
        {
          field: 'object_id',
          source: 'formData',
          type: 'array',
          value: '',
        },
        {
          alias: 'mode',
          source: 'mode',
          type: 'num',
        },
      ],
      // dependence: [
      //   {
      //     //fields: ['statement_card', 'cardowner'],
      //     fillField: ['fio', 'invoice', 'bank_id'],
      //     type: 'api',
      //     module: 'personal/getCard',
      //     field: 'personal_bank_id',
      //   },
      // ],
      updateList: [
        {
          alias: 'personal_bank_id',
          filter: [
            {
              field: 'personal_id',
              // alias: 'pb.id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'vid_vedomost_id',
              // alias: 'pb.id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
      ],
      requiredFields: ['object_id'],
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'status_id',
            value: [2, 3, 6],
            type: true,
          },
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
            type: true,
          },
          {
            permissions: [8, 17],
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 6 && context.mode === 'edit',
            type: true,
          },
        ],
      },
    }),
    selectField({
      label: 'Должность',
      name: 'doljnost_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 4,
                false: 3,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 4,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'status_id',
            value: [2, 3, 6],
            type: true,
          },
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
        ],
      },
      isShow: {
        value: false,
        conditions: [
          {
            field: 'vid_vedomost_id',
            value: [1, 5, 3],
          },
        ],
      },
    }),
    stringField({
      label: 'Тариф',
      name: 'object_price',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      bootstrapClass: [''],
      isShow: {
        value: false,
        conditions: [
          {
            target: 'funcCondition',
            funcCondition: (ctx) => {
              return ctx.formData.direction_id === 2 && ctx.formData.type === 2
            },
          },
        ],
      },
      validations: { notValue: notValue({ value: 0, text: 'Тариф' }) },
    }),
    selectField({
      label: 'Вид ведомости',
      name: 'vid_vedomost_id',
      alias: 'payment_vid_vedomost_id',
      placeholder: '',
      class: [''],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
                false: 5,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 5,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 6,
                false: 3,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 4,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      requiredFields: ['direction_id'],
      readonly: {
        value: false,
        condition: [
          // {
          //   funcCondition: (context) =>
          //     [1, 6, 7].includes(context.formData.direction_id) &&
          //     [1, 5].includes(context.formData.vid_vedomost_id),
          //   type: true,
          // },
          // {
          //   permissions: [8, 17],
          //   type: true,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) => {
              return (
                conditionLogistik(context) ||
                // conditionX5(context) ||
                statusReject(context) ||
                ROKKdOKKLogistika(context)
                // ROKKdOKKRoznicd(context)
              )
            },
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.direction_id === 2 &&
          //     context.store.state.user.permission_id === 1 &&
          //     context.formData.status_id === 1 &&
          //     context.formData.bank_id === 1 &&
          //     context.mode === 'edit',
          //   type: false,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
        ],
      },
      // hideOption: [
      //   {
      //     target: 'type',
      //     targetValue: [1],
      //     value: [9],
      //     type: true,
      //     func: (ctx) => {
      //       if (
      //         ctx.mode === 'add' &&
      //         ctx.formData.type === 1 &&
      //         ctx.formData.direction_id === 2
      //       ) {
      //         return true
      //       } else {
      //         return false
      //       }
      //     },
      //   },
      //   {
      //     target: 'type',
      //     targetValue: [1],
      //     value: [10],
      //     type: true,
      //     func: (ctx) => {
      //       if (
      //         ctx.mode === 'add' &&
      //         ctx.formData.type === 1 &&
      //         ctx.formData.direction_id === 2
      //       ) {
      //         return false
      //       } else {
      //         return true
      //       }
      //     },
      //   },
      //   {
      //     value: [1, 3, 5, 8],
      //     type: true,
      //     func: (ctx) => {
      //       if (ctx.mode === 'add') {
      //         return true
      //       } else {
      //         return false
      //       }
      //     },
      //   },
      // ],
      filter: [
        {
          field: 'direction_id',
          // alias: 'pb.id',
          value: '',
          source: 'formData',
          type: 'num',
        },
        {
          source: 'mode',
          type: 'num',
        },
      ],
      // hiding: {
      //   conditions: [
      //     // {
      //     //   target: 'formData',
      //     //   field: 'type',
      //     //   value: [1],
      //     //   values: [10],
      //     // },
      //     // {
      //     //   target: 'formData',
      //     //   field: 'status_id',
      //     //   value: [4],
      //     //   values: [4, 6],
      //     // },
      //     // {
      //     //   target: 'formData',
      //     //   field: 'status_id',
      //     //   permissions: [3, 15],
      //     //   value: [1, 2, 3],
      //     //   values: [1, 3],
      //     // },
      //     // {
      //     //   funcCondition: (context) => {
      //     //     context.formData.status_id === 1 && context.store.state.user.id === context.formData.status_account_id && context.store.state.permission_id !== 4
      //     //   },
      //     //   values: [1, 3],
      //     // },
      //   ],
      // },
    }),
    dateField({
      label: 'Дата назн',
      name: 'date_target',
      type: 'datetime',
      subtype: 'datetime',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
      isShow: {
        value: false,
        type: 'some',
        conditions: [
          {
            field: 'vid_vedomost_id',
            value: [1, 5],
          },
          {
            target: 'funcCondition',
            funcCondition: (ctx) => {
              return ctx.formData.direction_id === 2 && ctx.formData.type === 2
            },
          },
        ],
      },
    }),
    //selectField({
    //  label: 'Статья расхода',
    //  name: 'st_rashod_id',
    //  placeholder: '',
    //  class: [''],
    //  selectOption: {
    //    text: 'name',
    //    value: 'id',
    //  },
    //  items: [
    //    {
    //      id: 0,
    //      label: 'Продавец',
    //      value: 'Абдуллина Ирина',
    //    },
    //    {
    //      id: 1,
    //      label: 'Приемщик',
    //      value: 'Адылова Ильмира',
    //    },
    //    {
    //      id: 2,
    //      label: 'Погрузчик',
    //      value: 'Азаров Михаил',
    //    },
    //  ],
    //  position: {
    //    cols: 12,
    //    sm: 6,
    //  },
    //  validations: { required },
    //  bootstrapClass: [''],
    //}),
    stringField({
      label: 'Часы (план)',
      name: 'hour_plan',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 2,
      },
      bootstrapClass: [''],
      //validations: { required },
      //isShow: false,
    }),
    stringField({
      label: 'Часы(факт)',
      name: 'hour_fact',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 2,
      },
      bootstrapClass: [''],
      validations: { interval },
      //isShow: false,
      dependence: [
        {
          //fields: ['statement_card', 'cardowner'],
          type: 'custom',
          func: async (ctx) => {
            const body = {
              data: {
                object_id: ctx.formData.object_id,
                doljnost_id: ctx.formData.doljnost_id,
                hour_fact: ctx.formData.hour_fact,
              },
            }
            const { code, result } = await ctx.store.dispatch('form/create', {
              body,
              url: 'calculate/magnit/hour',
            })
            if (code) {
              ctx.formData.hour = result
              ctx.formData.total = ctx.formData.hour * ctx.formData.object_price
            }

            console.log(result)
          },
        },
      ],
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) => {
              console.log(context, context.originalData)
              return isMagnit(context) && context.originalData.status_id === 2
            },
            type: true,
          },
        ],
      },
    }),
    stringField({
      label: 'Часы',
      name: 'hour',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 2,
      },
      validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    // stringField({
    //   label: 'Тариф',
    //   name: 'price',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 2,
    //   },
    //   bootstrapClass: [''],
    // }),
    // stringField({
    //   label: 'Удержано',
    //   name: 'debit_percent',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 3,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    //   isShow: true,
    // }),
    // dateField({
    //   label: 'Назначение на дату',
    //   name: 'date_target',
    //   // subtype: 'multiple',
    //   placeholder: '',
    //   classes: [''],
    //   position: {
    //     cols: 12,
    //     sm: 6,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    // }),
    stringField({
      label: 'Сумма',
      name: 'total',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 5,
                false: 5,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 5,
              },
              // type: false,
            },
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 6,
                false: 3,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 5,
        },
      },
      validations: { required },
      bootstrapClass: [''],
      round: true,
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1],
            type: true,
          },
          {
            permissions: [8, 17],
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) =>
              context.formData.status_id === 6 && context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) => isMagnit(context),
            type: true,
          },
        ],
      },
      appendAction: [
        {
          icon: 'mdi-table-edit',
          label: 'Изменить выработку',
          action: {
            type: 'changeUrl',
            name: 'payment/:id/output',
          },
          isShow: {
            value: true,
            condition: [
              {
                funcCondition: (context) =>
                  context.formData.vid_vedomost_id === 1 &&
                  (context.formData.status_id === 1 ||
                    context.formData.status_id === 2 ||
                    context.formData.status_id === 3) &&
                  (context.formData.direction_id === 1 ||
                    context.formData.direction_id === 6),
                type: true,
              },
            ],
          },
        },
      ],
    }),
    // stringField({
    //   label: '% удержания',
    //   name: 'debit_percent',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 3,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    //   isShow: true,
    // }),
    // stringField({
    //   label: 'Итог',
    //   name: 'total',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 6,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    // }),
    //stringField({
    //  label: 'Минус нал',
    //  name: 'minus_nal',
    //  placeholder: '',
    //  class: [''],
    //  position: {
    //    cols: 12,
    //    sm: 2,
    //  },
    //  validations: { required },
    //  bootstrapClass: [''],
    //  isShow: false,
    //}),
    selectField({
      label: 'Банки.карта/нал',
      name: 'personal_bank_id',
      placeholder: '',
      class: ['noWrap'],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 1,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 4,
        },
      },
      defaultObjectData: [
        {
          id: 0,
          name: '--Наличные--',
          bank_id: 11,
          invoice: '',
          fio: '',
        },
      ],
      objectData: [],
      defaultItems: [
        {
          id: 0,
          name: '--Наличные--',
          bank_id: 11,
          invoice: '',
          fio: '',
        },
      ],
      hideOption: [
        {
          target: 'vid_vedomost_id',
          targetValue: [1],
          value: [0],
          type: true,
        },
      ],
      validations: { required },
      bootstrapClass: [''],
      dependence: [
        {
          type: 'update',
          fields: ['fio', 'invoice', 'bank_id'],
        },
      ],
      requiredFields: ['personal_id'],
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) =>
              ((context.formData.status_id === 3 ||
                context.formData.status_id === 2 ||
                context.formData.status_id === 1 ||
                context.formData.status_id === 6) &&
                context.store.state.user.is_personal_vertical) ||
              // Условия для того чтобы ОКК и РОКК могли менять карту
              (context.formData.status_id === 6 &&
                (context.store.state.user.permission_id === 8 ||
                  context.store.state.user.permission_id === 17)) ||
              (context.store.state.user.is_personal_vertical &&
                (context.formData.status_id === 1 ||
                  context.formData.status_id === 3)) ||
              (context.formData.status_id === 6 && context.mode === 'edit'),
            type: false,
          },
          {
            funcCondition: (context) => {
              return isMagnit(context) && context.originalData.status_id === 2
            },
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.store.state.user.is_personal_vertical &&
          //     (context.formData.status_id === 1 ||
          //       context.formData.status_id === 3),
          //   type: false,
          // },
          // {
          //   funcCondition: (context) =>
          //     context.environment.mode === 'add',
          //   type: false,
          // },
        ],
      },
    }),
    stringField({
      label: 'Р/С',
      name: 'invoice',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: {
          conditon: [
            {
              funcCondition: (context) =>
                context.formData.vid_vedomost_id === 9,
              value: {
                true: 4,
                false: 4,
              },
              // type: false,
            },
            // {
            //   funcCondition: (context) =>
            //     context.formData.vid_vedomost_id === 5,
            //   value: {
            //     true: 3,
            //     false: 6,
            //   },
            //   // type: false,
            // },
          ],
          default: 4,
        },
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    stringField({
      label: 'Карта на имя',
      name: 'fio',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    stringField({
      label: 'Текст ошибки',
      name: 'error_text',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) =>
              (context.store.state.user.permission_id === 12 ||
                context.store.state.user.permission_id === 22) &&
              context.originalData?.status_id === 4,

            type: false, //могу при этих условиях
          },
        ],
      },
      //validations: { required },
      bootstrapClass: [''],
    }),
    textareaField({
      label: 'Комментарий ОКК',
      name: 'comment_okk',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      //validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    textareaField({
      label: 'Примечание',
      name: 'comment',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      //validations: { required },
      bootstrapClass: [''],
      readonly: {
        value: false,
        condition: [
          {
            permissions: [8, 17],
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.account_id !== context.store.state.user.id &&
          //     (context.formData.status_id === 2 ||
          //       context.formData.status_id === 1 ||
          //       context.formData.status_id === 3) &&
          //     context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) =>
              context.formData.account_id !== context.store.state.user.id &&
              (context.formData.status_id === 1 ||
                context.formData.status_id === 3 ||
                ((context.store.state.user.permission_id === 12 ||
                  context.store.state.user.permission_id === 22) &&
                  context.originalData?.status_id === 4)) &&
              context.mode === 'edit',
            type: true,
          },
        ],
      },
    }),
    textBlock({
      label: 'Должность',
      name: 'doljnost_id_clone',
      requestKey: 'doljnost_id',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      value: 0,
      //validations: { required },
      //isShow: false,
      isShow: {
        value: false,
        conditions: [
          {
            field: 'vid_vedomost_id',
            value: [9],
          },
        ],
      },
    }),
    stringField({
      label: 'Должность',
      name: 'bank_id',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      value: 0,
      //validations: { required },
      isShow: {
        value: true,
      },
    }),
    textBlock({
      label: 'Тип магазина',
      name: 'type',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      isShow: {
        value: true,
      },
      updateList: [
        {
          alias: 'payment_vid_vedomost_id',
          filter: [
            {
              field: 'direction_id',
              // alias: 'pb.id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'type',
              alias: 'type_object_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'date_target',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              alias: 'mode',
              source: 'mode',
              type: 'num',
            },
          ],
        },
      ],
    }),
    stringField({
      label: 'ID тарифа',
      name: 'object_price_id',
      placeholder: '',
      readonly: true,
      class: [''],
      position: {
        cols: 12,
        sm: 12,
      },
      bootstrapClass: [''],
      //validations: { required },
      isShow: {
        value: true,
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
      to: 'payment',
      skipValidation: true,
    }),
    stringAction({
      text: 'Создать',
      type: 'submit',
      module: 'form/create',
      name: 'createForm',
      url: 'create/payment',
      action: 'createForm',
      color: 'primary',
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
          {
            field: 'status_id',
            target: 'formData',
            value: [6],
            type: true,
          },
          {
            funcCondition: (ctx) => {
              return (
                ctx.formData.direction_id === 2 &&
                ctx.formData.type === 2 &&
                ctx.mode === 'add'
              )
            },
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'Создать',
      type: 'submit',
      module: 'form/create',
      name: 'createForm',
      url: 'create/payment',
      action: 'func',
      color: 'primary',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (ctx) => {
              return (
                ctx.formData.direction_id !== 2 ||
                ctx.formData.type !== 2 ||
                ctx.mode !== 'add'
              )
            },
            type: true,
          },
        ],
      },
      func: async (ctx) => {
        console.log(ctx)
        // ctx.$emit('emitFormData')
        const payment_data = ctx.sortData({ action: this })
        const request_data = {
          ...ctx.formDataParent,
          id: +ctx.context.root.route.params.id,
        }
        console.log(this)
        // try {
        // const { code, id } = await ctx.createForm({
        //   url: 'create/payment',
        //   module: 'form/create',
        //   formData: {
        //     payment_data,
        //     request_data,
        //     from_request_magnit: true,
        //   },
        //   params: this,
        // })
        // if (code) {
        const handlerEmit = async (rootCtx) => {
          console.log(rootCtx, 'CONTEXT')
          rootCtx.fields.act_path.options.toObjectCustom = 'request_data'
          await rootCtx.loadStoreFile({
            url: 'create/payment',
            module: 'form/create',
            formData: {
              payment_data,
              request_data,
              from_request_magnit: true,
            },
            action: this,
          })
          rootCtx.emit('closePopup')
          rootCtx.emit('refreshData')
          // ctx.emit('closePopup')
          // clickHandler
          // const payment_data = sortData()
          // const { code, id } = await ctx.createForm({
          //   url: 'create/payment',
          //   module: 'update/payment',
          //   formData: ctx.sortedData,
          //   params: this,
          // })
        }
        await ctx.emit('emitFormData', { rootCtx: {}, handlerEmit })
        ctx.emit('closePopup')
        // }
        // } catch (err) {
        //   console.log(err)
        // }

        // console.log(result)
      },
    }),
    stringAction({
      text: 'Исправлено',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'correct/payment',
      action: 'saveFormId',
      color: 'primary',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            field: 'status_id',
            target: 'formData',
            value: [6],
            type: false,
          },
          {
            funcCondition: (context) =>
              context.originalData?.status_id === 6 &&
              !context.environment.readonlyAll,
            type: false,
          },
        ],
      },
    }),
    stringAction({
      text: 'Сохранить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'primary',
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
          {
            funcCondition: (context) =>
              context.formData?.status_id !== 6 &&
              !context.environment.readonlyAll,
            type: false,
          },
        ],
      },
    }),
    stringAction({
      text: 'На проверку',
      type: 'submit',
      status_id: 1,
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'yellow',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) => {
              return (
                ![1, 2, 3].includes(context.formData?.status_id) ||
                context.formData.status_id === 1
              )
            },
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'Согласовать',
      status_id: 2,
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'green',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) =>
              (isMagnit(context) &&
                ![1, 2, 3].includes(context.originalData?.status_id)) ||
              context.formData.status_id === 2,
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'Не согласовать',
      status_id: 3,
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'error',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) =>
              ![1, 2, 3].includes(context.formData?.status_id) ||
              context.formData.status_id === 3,
            type: true,
          },
        ],
      },
    }),
    stringAction({
      text: 'В ошибку',
      status_id: 6,
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'error',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              console.log(isAllBug(context), 'isAllBug(context)')
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) =>
              // [22, 12].includes(context.store.state.user.permission_id),
              isAllBug(context) && context.formData.status_id === 4,
            type: false,
          },
        ],
      },
    }),
    stringAction({
      text: 'На оплату',
      status_id: 4,
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'green',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              console.log(isAllBug(context), 'isAllBug(context)')
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) => {
              console.log(
                isAllBug(context),
                context.formData.status_id === 2,
                'isAllBug(context), context.formData.status_id === 2'
              )
              return isAllBug(context) && context.formData.status_id === 2
            },
            type: false,
          },
        ],
      },
    }),
    stringAction({
      text: 'Оплачено',
      status_id: 5,
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'update/payment',
      action: 'saveFormId',
      color: 'green',
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return context.mode === 'add'
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              console.log(isAllBug(context), 'isAllBug(context)')
              return isMagnit(context)
            },
            type: false,
          },
          {
            funcCondition: (context) =>
              // [22, 12].includes(context.store.state.user.permission_id),
              isAllBug(context) && context.formData.status_id === 4,
            type: false,
          },
        ],
      },
    }),
    // stringAction({
    //   text: 'Исправлено1',
    //   status_id: 7,
    //   type: 'submit',
    //   module: 'form/putForm',
    //   name: 'saveFormId',
    //   url: 'correct/payment',
    //   action: 'saveFormId',
    //   color: 'primary',
    //   isHide: {
    //     value: false,
    //     type: 'every',
    //     condition: [
    //       {
    //         funcCondition: (context) => {
    //           return isMagnit(context)
    //         },
    //         type: false,
    //       },
    //       {
    //         funcCondition: (context) =>
    //           context.originalData?.status_id === 6 &&
    //           context.store.state.user.is_personal_vertical,
    //         type: false,
    //       },
    //     ],
    //   },
    // }),
  ],
}
//
