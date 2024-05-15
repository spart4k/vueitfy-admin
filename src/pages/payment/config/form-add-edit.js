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
import { required, hasDate, hasTime } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

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
      alias: 'vid_vedomost_id',
      filter: [],
    },
    {
      alias: 'status_id',
      filter: [],
    },
    {
      alias: 'payment_account_id',
      filter: [],
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
      ],
    },
    {
      alias: 'account_id',
      filter: [],
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
              context.formData.account_id !== context.store.state.user.id &&
              context.store.state.user.is_personal_vertical &&
              (context.formData.status_id === 2 ||
                context.formData.status_id === 1 ||
                context.formData.status_id === 3),
            type: false,
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
        },
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    dateField({
      label: 'Дата назн',
      name: 'date_target',
      subtype: 'datetime',
      placeholder: '',
      classes: [''],
      position: {
        cols: 12,
        sm: 3,
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
      isShow: {
        value: false,
        conditions: [
          {
            field: 'vid_vedomost_id',
            value: [1, 5],
          },
        ],
      },
    }),
    selectField({
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
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
            type: true,
          },
        ],
      },
    }),
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
        },
      },
      validations: { required },
      bootstrapClass: [''],
      hiding: {
        conditions: [
          {
            target: 'mode',
            value: 'add',
            values: [2],
          },
        ],
      },
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
          url: 'get/pagination_list/personal',
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
                value: 5,
                options: [1, 3, 5, 8],
              },
              {
                value: 6,
                options: [2],
              },
              {
                value: 1,
                options: [2],
              },
              {
                value: 5,
                options: [2],
              },
              {
                value: [1, 6],
                options: [2],
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
        ],
      },
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
      ],
      dependence: [
        {
          //fields: ['statement_card', 'cardowner'],
          fillField: ['fio', 'invoice'],
          type: 'api',
          module: 'personal/getCard',
          field: 'personal_bank_id',
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
    selectField({
      label: 'Вид ведомости',
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
        },
      },
      validations: { required },
      bootstrapClass: [''],
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
    // stringField({
    //   label: 'Часы (план)',
    //   name: 'hour_plan',
    //   placeholder: '',
    //   readonly: true,
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 2,
    //   },
    //   bootstrapClass: [''],
    //   //validations: { required },
    //   //isShow: false,
    // }),
    // stringField({
    //   label: 'Часы(факт)',
    //   name: 'hour_fact',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 2,
    //   },
    //   bootstrapClass: [''],
    //   //validations: { required },
    //   //isShow: false,
    // }),
    // stringField({
    //   label: 'Часы',
    //   name: 'hour',
    //   placeholder: '',
    //   class: [''],
    //   position: {
    //     cols: 12,
    //     sm: 2,
    //   },
    //   validations: { required },
    //   bootstrapClass: [''],
    // }),
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
      // validations: { required },
      bootstrapClass: [''],
      round: true,
      readonly: {
        value: false,
        condition: [
          {
            target: 'formData',
            field: 'vid_vedomost_id',
            value: [1, 5],
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
                  (context.formData.status_id === 1 ||
                    context.formData.status_id === 2 ||
                    context.formData.status_id === 3) &&
                  (context.formData.direction_id === 1 ||
                    context.formData.direction_id === 6) &&
                  context.formData.vid_vedomost_id === 1,
                type: true,
              },
              // {
              //   funcCondition: (context) =>
              //     context.formData.vid_vedomost_id !== 1,
              //   type: false,
              // },
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
          id: 11,
          name: '--Наличные--',
          bank_id: 11,
          invoice: '',
          fio: '',
        },
      ],
      objectData: [],
      defaultItems: [
        {
          id: 11,
          name: '--Наличные--',
          bank_id: 11,
          invoice: '',
          fio: '',
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
              (context.formData.status_id === 3 ||
                context.formData.status_id === 2 ||
                context.formData.status_id === 1 ||
                context.formData.status_id === 6) &&
              context.store.state.user.is_personal_vertical,
            type: false,
          },
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
    textareaField({
      label: 'Текст ошибки',
      name: 'error_text',
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
      text: 'Сохранить',
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
        ],
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
              context.formData.status_id === 6 &&
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
              !context.environment.readonlyAll &&
              context.formData.status_id !== 6,
            type: false,
          },
        ],
      },
    }),
  ],
}
