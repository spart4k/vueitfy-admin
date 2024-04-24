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
import _ from 'lodash'
import { stringAction } from '@/utils/actions'
import FormDefault from '@/components/Form/default/index.vue'
import FormOutput from '@/components/Form/output/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'
import { editFields as appointmentsFields } from '@/pages/appointments/index.js'
// import { fieldsBaseDefaultForm as personalFields } from '@/pages/personal/index.js'
// import { defaultForm as personalConfig } from '@/pages/personal/index'
// import { defaultForm as objectConfig } from '@/pages/object/index.js'

// const changeActionTo = (array, oldPath, newPath) => {
//   array.forEach((tab) => {
//     if (tab.path === oldPath) {
//       tab.path = newPath
//     }
//   })
// }

// const personalConfigForms = _.cloneDeep(personalConfig)
// const objectConfigForm = _.cloneDeep(objectConfig)

// changeActionTo(personalConfigForms, 'edit', 'edit-personal')
// changeActionTo(objectConfigForm, 'edit', 'edit-object')

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

function changeSort(config) {
  let btn = config.panel.buttons.find((x) => x.subtype === 'changeHeads')
  let heading = config.head.find((x) => x.changeable)
  if (btn.label === 'Объекты') {
    btn.label = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot-object'
    heading.routeParam = 'object_id'
    heading.type = 'download'
    config.options.url = 'get/pagination_pivot/personal_target_object'
  } else if (btn.label === 'ФИО') {
    btn.label = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)"
    heading.value = 'fio'
    heading.routeName = 'pivot-personal'
    heading.routeParam = 'personal_id'
    heading.type = 'default'
    config.options.url = 'get/pagination_pivot/personal_target_personal'
  }
}

export const config = {
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
    sideMenu: [
      {
        component: 'Checklist',
        name: 'План закрытия',
        icon: '$IconGraphic',
        condition: [3, 4, 8, 17],
      },
      {
        component: 'Coefficient',
        name: 'Коэффициент',
        icon: '$IconGraphic',
        condition: [3, 4, 8, 17],
      },
    ],
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
        isShow: {
          condition: [
            {
              permissions: [4, 8, 17],
              type: true,
            },
          ],
        },
      },
      {
        label: 'Начислить',
        class: ['v-table-button--custom'],
        url: 'pivot-profit',
        type: 'changeUrl',
        backgroundColor: '#fff',
        isShow: {
          condition: [
            {
              permissions: [4, 8, 17],
              type: true,
            },
          ],
        },
      },
      {
        label: 'Объекты',
        class: ['v-table-button--custom'],
        url: '$IconUpdate',
        function: changeSort,
        backgroundColor: '#ffffff',
        type: 'refresh',
        subtype: 'changeHeads',
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
      alias: "CONCAT(p.surname, ' ', p.name_n, ' ', p.patronymic)",
      value: 'fio',
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
      routeName: 'pivot-personal',
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
    width: '800px',
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
          // { alias: 'type_parser', filter: [] },
          // { alias: 'object_period', filter: [] },
          // { alias: 'service_spr', filter: [] },
        ],
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
            updateList: [
              {
                alias: 'object_period',
                filter: [
                  {
                    field: 'period',
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
            label: 'Объект',
            name: 'object_id',
            alias: 'object_period',
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
            updateList: [
              {
                alias: 'object_type_period',
                filter: [
                  {
                    field: 'period',
                    value: '',
                    source: 'formData',
                    type: 'num',
                  },
                  {
                    field: 'object_id',
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
            label: 'Тип',
            name: 'type_parser',
            alias: 'object_type_period',
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
          // selectField({
          //   label: 'Период',
          //   name: 'period',
          //   alias: 'period',
          //   placeholder: '',
          //   class: [''],
          //   selectOption: {
          //     text: 'name',
          //     value: 'id',
          //   },
          //   items: [],
          //   position: {
          //     cols: 12,
          //     sm: 12,
          //   },
          //   validations: { required },
          //   bootstrapClass: [''],
          // }),
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
        name: 'Профит',
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
        name: 'Редактирование выработки',
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
      // {
      //   id: 2,
      //   name: 'Расход',
      //   type: TableDefault,
      //   active: false,
      //   config: consumptionConfig,
      // },
      // ...objectConfigForm,
      // ...personalConfigForms,
    ],
    activeTab: null,
  },
  filters,
}

export default config
