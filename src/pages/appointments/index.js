import filters from './filters'
import TableDefault from '@/components/Table/default/index.vue'
import FormDefault from '@/components/form/default/index.vue'
import FormList from '@/components/form/list/index.vue'
import FormStage from '@/components/form/stage/index.vue'

import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  dateField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'

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

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/personal_target',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        type: 'refresh',
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
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
    ],
  },
  head: [
    {
      title: 'В/В',
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
      alias: 'vv.name',
      isShow: true,
      width: '40',
      value: 'vid_vedomost_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'На дату',
      type: 'default',
      align: 'center',
      fixed: {
        value: false,
        position: 'left',
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
      width: '90',
      alias: 'pt.date_target',
      value: 'date_target',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Объект',
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
      value: 'object_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Линейщик',
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
      value: 'personal_name',
      alias: 'pers.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Должность',
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
      value: 'doljnost_name',
      alias: 'd.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Статус',
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
      value: 'status_name',
      alias: 'spt.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Тип смены',
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
      value: 'shift_name',
      alias: 'sh.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Назначил',
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
      value: 'account_name',
      alias: 'sa.name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Итого',
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
      value: 'total',
      alias: 'pt.total',
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
      alias: 'pt.comment',
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
    classes: [''], // List class
    width: '800px',
    method: 'get',
    alias: 'personal_target',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
        name: 'Основные',
        type: FormStage,
        detail: true,
        path: 'add',
        stages: [
          {
            id: 0,
            name: 'Основные',
            type: FormDefault,
            detail: true,
            lists: [
              { alias: 'vid_vedomost_id_logistic', filter: [] },
              { alias: 'status_pt', filter: [] },
              // { alias: 'object_id_logistic', filter: [] },
              // { alias: 'account_id_logistic', filter: [] },
              { alias: 'direction_id_logistic', filter: [] },
              { alias: 'doljnost_id_logistic', filter: [] },
              { alias: 'shifts', filter: [] },
              { alias: 'nutritions', filter: [] },
            ],
            alias: 'personal_target',
            active: false,
            fields: [
              selectField({
                label: 'Статус',
                name: 'status',
                alias: 'status_pt',
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
                value: 1,
                validations: { required },
                bootstrapClass: [''],
              }),
              dateField({
                label: 'На дату',
                name: 'date_target',
                value: [],
                type: 'date',
                subtype: 'multiple',
                readonly: true,
                menu: false,
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                disable: false,
                //mode: 'edit',
                isShow: true,
              }),
              //stringField({
              //  label: 'Создал',
              //  name: 'account_name',
              //  placeholder: '',
              //  readonly: false,
              //  class: [''],
              //  position: {
              //    cols: 12,
              //    sm: 6,
              //  },
              //  bootstrapClass: [''],
              //  mode: 'edit',
              //  //validations: { required },
              //  //isShow: false,
              //}),
              selectField({
                label: 'Вид ведомости:',
                name: 'vid_vedomost_id_logistic',
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
                // Прятать option от условия, target - цель условия, value - значение, value - значения которые нужно прятать
                hiding: {
                  conditions: [
                    {
                      target: 'mode',
                      value: 'edit',
                      values: [8],
                    },
                    {
                      target: 'mode',
                      value: 'add',
                      values: [2, 3, 4, 5, 6, 7],
                    },
                  ],
                },
                requiredFields: ['personal_id'],
              }),
              selectField({
                label: 'Направления',
                name: 'direction_id',
                alias: 'direction_id_logistic',
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
                //update: {
                //  module: 'selects/getList',
                //  fields: ['object_id'],
                //},
                dependence: [
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'object_id',
                    url: 'get/pagination_list/object_logistic',
                  },
                ],
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
                url: 'get/pagination_list/object_logistic',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'direction_id',
                    value: '',
                  },
                ],
                dependence: [
                  {
                    type: 'default',
                    fillField: ['sum_nutrition', 'with_nutrition', 'subtype'],
                  },
                  {
                    type: 'api',
                    module: 'selects/getListUpdate',
                    field: 'personal_id',
                    url: 'get/pagination_list/personal',
                  },
                ],
                update: {
                  module: 'selects/getList',
                  fields: ['personal_id'],
                },
                requiredFields: ['direction_id'],
              }),
              autocompleteField({
                label: 'Линейщик',
                name: 'personal_id',
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
                url: 'get/pagination_list/personal',
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'object_id',
                    value: '',
                  },
                ],
                requiredFields: ['object_id'],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'api',
                    module: 'personal/checkEveryDayPayment',
                    action: {
                      type: 'hideOptions',
                      //values: [8],
                      field: 'vid_vedomost_id_logistic',
                      condition: {
                        true: [],
                        false: 1,
                      },
                    },
                    //url: 'object_id/avatar_with_user_key_id',
                    url: [
                      {
                        source: 'formData',
                        field: 'this',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Должность',
                name: 'doljnost_id',
                alias: 'doljnost_id_logistic',
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
              }),
              selectField({
                label: 'Тип смены',
                name: 'type_shift',
                alias: 'shifts',
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
              }),
              selectField({
                label: 'Питание',
                name: 'with_nutrition',
                alias: 'nutritions',
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
                defaultItems: [
                  {
                    id: 0,
                    name: '--Без питания--',
                  },
                ],
              }),
              stringField({
                label: 'Стоимость питания:',
                name: 'sum_nutrition',
                placeholder: '',
                class: [''],
                position: {
                  cols: 12,
                  sm: 6,
                },
                validations: { required },
                bootstrapClass: [''],
                requiredFields: ['with_nutrition', 'sum_nutrition'],
              }),
              textBlock({
                label: 'Создал',
                name: 'subtype',
                placeholder: '',
                readonly: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 12,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
            ],
            actions: [
              stringAction({
                text: 'Сохранить',
                type: 'submit',
                module: '',
                name: 'saveForm',
                action: 'nextStage',
                color: 'primary',
              }),
            ],
            formData: {},
          },
          {
            id: 1,
            name: 'Основные1',
            type: FormList,
            //detail: true,
            lists: [
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
            fromLastTab: [
              {
                name: 'personal_id',
                alias: 'name',
                nameInTab: 'account_name',
                type: 'list',
              },
            ],
            fields: [
              textBlock({
                label: 'Создал',
                name: 'account_name',
                placeholder: '',
                readonly: true,
                class: [''],
                position: {
                  cols: 12,
                  sm: 5,
                },
                bootstrapClass: [''],
                //validations: { required },
                //isShow: false,
              }),
              autocompleteField({
                label: '',
                name: 'avatar_with_user_key_id',
                alias: 'personal_id',
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
                url: 'get/pagination_list/avatar_with_user_key_id',
                position: {
                  cols: 12,
                  sm: 4,
                },
                validations: { required },
                bootstrapClass: [''],
                filters: [
                  {
                    field: 'object_id',
                    value: '',
                    type: 'fromPrev',
                  },
                ],
                dependence: [
                  {
                    //fields: ['statement_card', 'cardowner'],
                    type: 'api',
                    module: 'personal/getKeys',
                    //url: 'object_id/avatar_with_user_key_id',
                    field: 'print_form_key',
                    url: [
                      {
                        source: 'props',
                        field: 'object_id',
                      },
                      {
                        source: 'formData',
                        field: 'this',
                      },
                    ],
                  },
                ],
              }),
              selectField({
                label: 'Ключ',
                name: 'print_form_key',
                //withoutList: true,
                //alias: 'direction_id_logistic',
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
                customList: {
                  type: 'api',
                  module: 'personal/getKeys',
                  //url: 'object_id/avatar_with_user_key_id',
                  field: 'print_form_key',
                  url: [
                    {
                      source: 'props',
                      field: 'object_id',
                    },
                    {
                      source: 'formData',
                      field: 'this',
                    },
                  ],
                },
                isShow: {
                  value: false,
                  conditions: [
                    {
                      field: 'subtype',
                      value: [9],
                      source: 'form.formData[el.field]',
                    },
                    {
                      field: 'direction_id',
                      value: [1],
                      source: 'form.formData[el.field]',
                    },
                    {
                      field: 'doljnost_id',
                      value: [5, 7],
                      source: 'form.formData[el.field]',
                    },
                  ],
                },
              }),
            ],
            actions: [
              stringAction({
                text: 'Назад',
                type: 'cancel',
                module: '',
                name: 'prevStage',
                action: 'prevStage',
                color: 'normal',
              }),
              stringAction({
                text: 'Создать',
                type: 'submit',
                module: 'form/create',
                url: 'create/multiple_target',
                name: 'saveForm',
                action: 'saveForm',
                color: 'primary',
              }),
            ],
            formData: {},
          },
        ],
      },
    ],
    activeTab: null,
  },
  filters,
}

export default config
