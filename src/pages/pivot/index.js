import filters from './filters'
import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  // autocompleteField,
  dateField,
  checkboxField,
  dropZoneField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormOutput from '@/components/Form/output/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'
import { editFields as appointmentsFields } from '@/pages/appointments/index.js'
import { fieldsBaseDefaulrForm as personalFields } from '@/pages/personal/index.js'
import { objectEditField as objectFields } from '@/pages/object/index.js'

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
    heading.routeName = 'pivot-edit-object'
    heading.routeParam = 'object_id'
    config.options.url = 'get/pagination_pivot/personal_target_object'
  } else if (btn.label === 'ФИО') {
    btn.label = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = 'p.personal_name'
    heading.value = 'personal_name'
    heading.routeName = 'pivot-edit-personal'
    heading.routeParam = 'personal_id'
    config.options.url = 'get/pagination_pivot/personal_target_personal'
  }
}

// const consumptionConfig = {
//   selector: '#mainTable',
//   options: {
//     selecting: true,
//     search: {
//       function: searchInputing,
//     },
//     headerFixed: true,
//     //url: 'https://dummyjson.com/users',
//     url: 'get/pagination/payment',
//     urlDetail: 'personal_id',
//     alias: 'p.personal_id',
//     title: 'This is an about page1',
//   },
//   panel: {
//     buttons: [
//       {
//         label: 'Обновить',
//         class: ['v-table-button--custom'],
//         url: '$IconEdit',
//         function: consolePanel,
//         backgroundColor: '#ffffff',
//       },
//       {
//         label: 'Добавить',
//         class: ['v-table-button--custom'],
//         url: '$IconSetting',
//         function: consolePanel,
//         backgroundColor: '#fff',
//       },
//       // {
//       //   label: 'Скачать',
//       //   class: ['v-table-button--custom'],
//       //   function: consolePanel,
//       //   backgroundColor: '#fff',
//       // },
//       {
//         label: 'Объекты',
//         class: ['v-table-button--custom'],
//         url: '$IconEdit',
//         function: changeSort,
//         backgroundColor: '#ffffff',
//       },
//     ],
//   },
//   head: [
//     {
//       title: 'ID',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       alias: 'p.id',
//       isShow: true,
//       width: '40',
//       value: 'id',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Дата назн',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'number',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       value: 'date_target',
//       alias: 'p.date_target',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Линейщик',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '90',
//       alias: 'pers.name',
//       value: 'personal_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Объект',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
//       },
//       sorts: [
//         {
//           type: 'string',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'o.name',
//       value: 'object_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Часы',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'number',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       value: 'hour',
//       alias: 'p.hour',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Должность',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'date',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'd.name',
//       value: 'doljnost_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Сумма',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: undefined,
//       },
//       sorts: [
//         {
//           type: 'date',
//           default: '',
//           value: '',
//           isShow: false,
//         },
//       ],
//       isShow: true,
//       width: '150',
//       alias: 'p.total',
//       value: 'total',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Действия',
//       type: 'actions',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'right',
//       },
//       isShow: true,
//       width: '100',
//       value: 'actions',
//       actions: [
//         {
//           type: 'button',
//           url: '$IconSetting',
//           function: consoleText,
//           label: 'Редактировать',
//         },
//         {
//           type: 'button',
//           url: '$IconSetting',
//           function: consoleButton,
//           label: 'Удалить',
//         },
//       ],
//     },
//   ],
//   data: {
//     rows: [],
//     totalRows: null,
//     pageLength: 20,
//     currentPage: 1,
//     totalPages: null,
//   },
//   detail: undefined,
//   filters,
// }

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination_pivot/personal_target_personal',
    title: 'This is an about page1',
    doubleHandlerType: 'cell',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        // function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Выработка',
        class: ['v-table-button--custom'],
        url: 'pivot-output',
        type: 'changeUrl',
        backgroundColor: '#fff',
      },
      {
        label: 'Начислить',
        class: ['v-table-button--custom'],
        url: 'pivot-profit',
        type: 'changeUrl',
        backgroundColor: '#fff',
      },
      // {
      //   label: 'Скачать',
      //   class: ['v-table-button--custom'],
      //   // function: consolePanel,
      //   backgroundColor: '#fff',
      // },
      {
        label: 'Объекты',
        class: ['v-table-button--custom'],
        url: '$IconUpdate',
        function: changeSort,
        backgroundColor: '#ffffff',
        type: 'refresh',
      },
      {
        label: 'Аванс',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        type: 'confirmPayment',
        backgroundColor: '#fff',
        // type: 'sendPage',
        // requestPage: 'payment',
        isShow: {
          condition: [
            {
              permissions: [4, 8, 17],
              type: true,
            },
          ],
        },
      },
    ],
    filters: true,
    search: true,
    date: true,
    addedItemsChildrenType: 'object',
  },
  head: [
    {
      id: 1,
      title: 'ФИО',
      align: 'center',
      type: 'default',
      isShow: true,
      width: '200',
      alias: 'p.personal_name',
      value: 'personal_name',
      changeable: true,
      // routeParam: 'personal_id',
      // route
      fixed: {
        value: true,
        position: 'left',
      },
      search: {
        field: '',
        isShow: true,
      },
      routeParam: 'personal_id',
      routeName: 'pivot-edit-personal',
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
    width: '600px',
    method: 'get',
    alias: 'personal',
    url: '/get/form/',
    name: 'Выработка X5',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        path: 'output',
        id: 1,
        name: 'Выработка X5',
        type: FormOutput,
        detail: true,
        initialRequestUrl: 'get/parser/active/',
        outputType: 3,
        lists: [
          { alias: 'type_parser', filter: [] },
          { alias: 'parser_objects', filter: [] },
          { alias: 'service_spr', filter: [] },
        ],
        fields: [
          selectField({
            label: 'Тип',
            name: 'type_parser',
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
          selectField({
            label: 'Объект',
            name: 'object_id',
            alias: 'parser_objects',
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
          dateField({
            label: 'Период',
            name: 'period',
            subtype: 'period',
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
          }),
          dropZoneField({
            label: 'Файл',
            name: 'file',
            notPut: true,
            placeholder: '',
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
              maxSize: 500,
              valueId: 'parser_objects',
              folder: 'parser',
              name: '`parser_logistic`',
              paramsForEmit: this,
              countFiles: 1,
            },
            value: [],
          }),
          checkboxField({
            name: 'reparse',
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
        ],
        outputData: {
          file: {
            text: 'По файлу:',
            value: null,
            stage: 1,
          },
          search: {
            text: 'Найдено:',
            value: null,
            stage: 1,
          },
          error: {
            text: 'С ошибками:',
            value: null,
            stage: 1,
          },
          sum: {
            text: 'Сумма:',
            value: null,
            stage: 2,
          },
          count: {
            text: 'На назначений:',
            value: null,
            stage: 2,
          },
        },
        stageActions: [
          {
            actions: [
              stringAction({
                text: 'Закрыть',
                color: 'error',
                name: 'closePopup',
                action: 'closePopup',
                skipValidation: true,
              }),
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                color: 'primary',
                name: 'saveFormStore',
                action: 'saveFormStore',
                notClose: true,
                module: 'form/loadParser',
                url: 'load/parser/',
              }),
            ],
          },
          {
            actions: [
              stringAction({
                text: 'Закрыть',
                color: 'error',
                name: 'closePopup',
                action: 'closePopup',
                skipValidation: true,
              }),
              stringAction({
                text: 'К выработке',
                type: 'submit',
                color: 'primary',
                confirm: {
                  text: '`Вы подтверждаете переход к выработке?`',
                  width: 550,
                },
                action: 'changeStage',
                changeDirection: 1,
                local: true,
              }),
            ],
          },
          {
            actions: [
              stringAction({
                text: 'Вернуться',
                color: 'error',
                action: 'changeStage',
                changeDirection: -1,
                local: true,
              }),
              stringAction({
                text: 'Отправить',
                type: 'submit',
                color: 'primary',
                confirm: {
                  text: '`Вы подтверждаете начисления на сумму ${outputData.value.sum.value}р?`',
                  width: 650,
                },
                action: 'loadParser',
                local: true,
              }),
            ],
          },
        ],
      },
      {
        path: 'profit',
        id: 2,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        lists: [],
        // alias: 'personal',
        active: false,
        fields: [
          dateField({
            label: 'Период',
            name: 'period',
            subtype: 'period',
            placeholder: '',
            class: [''],
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
            color: 'error',
            name: 'closePopup',
            action: 'closePopup',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/create',
            url: 'create/pay/by_service',
            name: 'createForm',
            action: 'createForm',
            handlingResponse: {
              context: 'result',
              result: 'data',
              data: {
                text: 'Создано начислений %count_payment% на сумму %sum_payment% <br/> Создано %count_zero% начислений с полным вычетом на сумму %sum_zero% <br/> Создано задолженностей %count_hold% на сумму %sum_hold%',
                color: 'success',
              },
            },
          }),
        ],
        formData: {},
      },
      {
        id: 1,
        name: 'Основные',
        type: FormTarget,
        detail: true,
        path: 'edit',
        lists: [
          { alias: 'vid_vedomost_id_logistic', filter: [] },
          { alias: 'status_pt', filter: [] },
          // { alias: 'object_id_logistic', filter: [] },
          // { alias: 'account_id_logistic', filter: [] },
          { alias: 'direction_id_logistic', filter: [] },
          {
            alias: 'doljnost_id_logistic',
            filter: [
              {
                field: 'direction_id',
                value: '',
                source: 'formData',
                type: 'array',
              },
            ],
          },
          { alias: 'shifts', filter: [] },
          { alias: 'nutritions', filter: [] },
          //{
          //  alias: 'account_id',
          //  filter: [],
          //},
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
        fields: appointmentsFields,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'pivot',
            skipValidation: true,
          }),
          stringAction({
            text: 'Удалить',
            type: 'submit',
            module: 'form/del',
            color: 'error',
            url: 'delete/personal_target',
            name: 'deleteFormById',
            action: 'deleteFormById',
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'is_close',
                  target: 'formData',
                  value: [1],
                  type: true,
                },
                {
                  field: 'status',
                  target: 'formData',
                  value: [1, 2],
                  type: false,
                },
                {
                  permissions: [3, 15, 4],
                  field: 'status',
                  target: 'formData',
                  value: [3],
                  type: false,
                },
              ],
            },
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'personal_target/update',
            name: 'saveForm',
            url: 'update/target',
            action: 'saveForm',
            color: 'primary',
            successMessage: false,
            isHide: {
              value: false,
              type: 'every',
              condition: [
                {
                  field: 'readonlyAll',
                  target: 'environment',
                  value: [1],
                  type: true,
                },
              ],
            },
          }),
        ],
        formData: {},
      },
      {
        id: 4,
        path: 'edit-personal',
        name: 'Персонал',
        type: FormDefault,
        detail: true,
        lists: [
          { alias: 'user_keys', filter: [] },
          { alias: 'habitation_id', filter: [] },
          { alias: 'account_id', filter: [] },
          { alias: 'direction_id', filter: [] },
          { alias: 'grajdanstvo_id', filter: [] },
          {
            alias: 'objects_personal',
            filter: [
              {
                field: 'object_id',
                alias: 'personal_id',
                value: '',
                source: '+route.params.id',
                type: 'num',
              },
            ],
          },
        ],
        alias: 'personal',
        active: false,
        fields: personalFields,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'pivot',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'update/personal',
            action: 'saveFormId',
            color: 'primary',
          }),
        ],
      },
      {
        id: 5,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        path: 'edit-object',
        lists: [
          {
            alias: 'direction_object',
            filter: [],
          },
          {
            alias: 'type',
            filter: [],
          },
          {
            alias: 'object_type',
            filter: [
              {
                field: 'direction_json',
                source: 'formData',
                type: 'array',
              },
            ],
          },
          {
            alias: 'object_subtype',
            filter: [
              {
                field: 'type',
                source: 'formData',
                type: 'num',
              },
            ],
          },
          {
            alias: 'filial_id',
            filter: [],
          },
          {
            alias: 'city_id',
            filter: [
              {
                field: 'regions_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
        alias: 'object',
        active: false,
        fields: objectFields,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'pivot',
            skipValidation: true,
          }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            name: 'saveFormId',
            url: 'set/object',
            action: 'saveFormId',
            color: 'primary',
          }),
        ],
      },
      // {
      //   id: 2,
      //   name: 'Расход',
      //   type: TableDefault,
      //   active: false,
      //   config: consumptionConfig,
      // },
    ],
    activeTab: null,
  },
  filters,
}

export default config
