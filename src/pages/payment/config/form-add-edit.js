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
  detail: true,
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
        sm: 6,
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
        sm: 3,
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
          condiiton: [
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
                context.formData.vid_vedomost_id === 5,
              value: {
                true: 3,
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
        sm: 3,
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
        sm: 4,
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
        sm: 4,
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
        sm: 4,
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
        sm: 6,
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
    stringField({
      label: 'Сумма',
      name: 'total',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
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
    }),
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
        sm: 4,
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
      objectData: undefined,
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
        sm: 4,
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
    textBlock({
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
      //isShow: false,
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
