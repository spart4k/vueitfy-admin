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
import {
  isAllBug,
  isCUP,
  isDBA,
  isDirector,
  isManager,
  isOKK,
  isRG,
  isROKK,
  isVertical,
} from '@/utils/permissions'

const isMagnit = (ctx) => {
  return ctx.formData.direction_id === 2 && ctx.formData.type === 2
}

const isX5 = (ctx) => {
  return ctx.formData.direction_id === 2 && ctx.formData.type === 1
}

const isLogistik = (ctx) => {
  return ctx.formData.direction_id === 1
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
  name: 'Сменить линейщика',
  type: 'FormDefault',
  path: 'change-personal',
  //lists: [],
  lists: [
    {
      alias: 'payment_vid_vedomost_id',
      filter: [
        {
          field: 'direction_id',
          // alias: 'pb.id',
          source: 'formDataParent',
          type: 'num',
        },
        {
          field: 'type',
          alias: 'type_object_id',
          source: 'formDataParent',
          type: 'num',
        },
        {
          field: 'date_target',
          source: 'formDataParent',
          type: 'num',
        },
        {
          field: 'personal_bank_id',
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
  alias: 'payment',
  active: false,
  fields: [
    autocompleteField({
      label: 'Линейщик',
      name: 'personal_id',
      requestKey: 'real_personal_id',
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
      url: 'get/pagination_list/personal_payment_id',
      position: {
        cols: 12,
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
      filter: [
        {
          field: 'account_id',
          source: 'formDataParent.account_id',
          type: 'array',
          value: '',
        },
        {
          field: 'direction_id',
          source: 'formDataParent.direction_id',
          type: 'array',
          value: '',
        },
        {
          field: 'object_id',
          source: 'formDataParent.object_id',
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
      //     fillField: ['real_fio', 'real_invoice', 'bank_id'],
      //     type: 'api',
      //     module: 'personal/getCard',
      //     field: 'real_personal_bank_id',
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
      readonly: {
        value: false,
        condition: [
          {
            funcCondition: (context) =>
              [4, 6].includes(context.formData.status_id) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) => {
              return !!context.formData.readonly
            },
            type: true,
          },
          {
            funcCondition: (context) => {
              return isOKK(context) || isROKK(context)
            },
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
        ],
      },
      appendAction: [
        {
          icon: 'mdi-account-sync-outline',
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
                  [1, 2, 3].includes(context.formData.status_id) &&
                  isVertical(context) &&
                  context.formData.type === 1,
                type: true,
              },
            ],
          },
        },
      ],
    }),
    selectField({
      label: 'Банки.карта/нал',
      name: 'personal_bank_id',
      requestKey: 'real_personal_bank_id',
      placeholder: '',
      class: ['noWrap'],
      selectOption: {
        text: 'name',
        value: 'id',
      },
      items: [],
      position: {
        cols: 12,
        sm: 6,
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
      updateList: [
        {
          alias: 'payment_vid_vedomost_id',
          filter: [
            {
              field: 'direction_id',
              // alias: 'pb.id',
              source: 'formDataParent',
              type: 'num',
            },
            {
              field: 'type',
              alias: 'type_object_id',
              source: 'formDataParent',
              type: 'num',
            },
            {
              field: 'date_target',
              source: 'formDataParent',
              type: 'num',
            },
            {
              field: 'personal_bank_id',
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
      readonly: {
        value: false,
        condition: [
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) => {
              return !!context.formData.readonly
            },
            type: true,
          },
          {
            funcCondition: (context) =>
              [4, 6].includes(context.formData.status_id) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) => {
              return isOKK(context) || isROKK(context)
            },
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
        ],
      },
    }),
    stringField({
      label: 'Р/С',
      name: 'invoice',
      requestKey: 'real_invoice',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
    }),
    stringField({
      label: 'Карта на имя',
      name: 'fio',
      requestKey: 'real_fio',
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 6,
      },
      // validations: { required },
      bootstrapClass: [''],
      readonly: true,
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
        sm: 6,
      },
      validations: { required },
      bootstrapClass: [''],
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
          source: 'formDataParent.direction_id',
          type: 'num',
        },
        {
          field: 'type',
          alias: 'type_object_id',
          source: 'formDataParent.type',
          type: 'num',
        },
        {
          field: 'date_target',
          source: 'formDataParent.date_target',
          type: 'num',
        },
        {
          field: 'real_personal_bank_id',
          source: 'formDataParent.real_personal_bank_id',
          type: 'num',
        },
        {
          alias: 'mode',
          source: 'mode',
          type: 'num',
        },
      ],
      readonly: {
        value: false,
        condition: [
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
          {
            funcCondition: (context) => {
              return !!context.formData.readonly
            },
            type: true,
          },
          {
            funcCondition: (context) =>
              [4, 6].includes(context.formData.status_id) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) => {
              return isOKK(context) || isROKK(context)
            },
            type: true,
          },
          // {
          //   funcCondition: (context) =>
          //     context.formData.status_id === 6 && context.mode === 'edit',
          //   type: true,
          // },
        ],
      },
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
    stringField({
      label: 'Должность',
      name: 'bank_id',
      requestKey: 'real_bank_id',
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
    stringField({
      label: 'Должность',
      name: 'readonly',
      requestKey: 'real_bank_id',
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
    stringField({
      label: 'Должность',
      name: 'status_id',
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
      skipValidation: true,
    }),
    stringAction({
      text: 'Сменить',
      type: 'submit',
      module: 'form/putForm',
      name: 'saveFormId',
      url: 'change/payment/personal',
      action: 'saveFormId',
      color: 'primary',
      refreshData: true,
      handlingResponse: {
        1: {
          text: 'Выполнено успешно',
          color: 'success',
        },
        2: {
          text: 'Ошибка сервера',
          color: 'error',
        },
        3: {
          text: 'Не хватает данных в body',
          color: 'error',
        },
        4: {
          text: 'Нет доступа',
          color: 'error',
        },
        5: {
          text: 'Не найдено начисление с данным id',
          color: 'error',
        },
      },
      isHide: {
        value: false,
        type: 'every',
        condition: [
          {
            funcCondition: (context) => {
              return !!context.formData.readonly
            },
            type: true,
          },
          {
            funcCondition: (context) =>
              [4, 6].includes(context.formData.status_id) &&
              context.mode === 'edit',
            type: true,
          },
          {
            funcCondition: (context) =>
              !isVertical(context) && context.mode === 'edit',
            type: true,
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
