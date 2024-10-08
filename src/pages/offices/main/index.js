import filters from './filters'
import FormDefault from '@/components/Form/default/index.vue'
import TargetPersonal from '@/components/Form/targetPersonal/default/index.vue'
import FormStage from '@/components/Form/stage/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'

import { required } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  dateField,
  textBlock,
  checkboxField,
  colorPicker,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import target from '../office-target'
export const editFields = [
  stringField({
    label: 'Название',
    name: 'name',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
    validations: { required },
    //isShow: false,
  }),
  colorPicker({
    label: 'Цвет',
    name: 'color',
    value: '#000000',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
  }),
  stringField({
    label: 'Адрес',
    name: 'address',
    placeholder: '',
    readonly: false,
    class: [''],
    position: {
      cols: 12,
      sm: 12,
    },
    bootstrapClass: [''],
    // validations: { required },
    validations: { required },
    //isShow: false,
  }),
  autocompleteField({
    label: 'Регион',
    name: 'regions_id',
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
    url: 'get/pagination_list/regions_id',
    position: {
      cols: 12,
      sm: 12,
    },
    validations: { required },
    bootstrapClass: [''],
    updateList: [
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
  }),
  selectField({
    label: 'Город',
    name: 'city_id',
    //alias: 'city_id',
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
    requiredFields: ['regions_id'],
  }),
  textBlock({
    label: 'Создал',
    name: 'from_account_id',
    notSend: true,
    placeholder: '',
    readonly: true,
    class: [''],
    position: {
      cols: 12,
      sm: 4,
    },
    bootstrapClass: [''],
    // validations: { required },
    //isShow: false,
  }),
  // autocompleteField({
  //   label: 'Офис-менеджер',
  //   name: 'office_manager_id',
  //   subtype: 'single',
  //   placeholder: '',
  //   class: [''],
  //   selectOption: {
  //     text: 'name',
  //     value: 'id',
  //   },
  //   items: [],
  //   page: 1,
  //   search: '',
  //   url: 'get/pagination_list/office_manager',
  //   position: {
  //     cols: 12,
  //     sm: 12,
  //   },
  //   value: null,
  //   readonly: {
  //     value: false,
  //     condition: [
  //       {
  //         funcCondition: (context) => {
  //           console.log(context.store.state.user)
  //           return context.store.state.user.permission_id !== 4
  //         },
  //         type: true,
  //       },
  //     ],
  //   },
  //   // value: null,
  //   // validations: { required },
  //   bootstrapClass: [''],
  // }),
]
import TargetOffice from '../target/index'
import AccountOffice from '../account/index'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/office',
    title: 'Основные',
    contextMenu: {
      actions: [
        {
          icon: '$IconDelete',
          label: 'Архивировать',
          isShow: {
            condition: [
              {
                funcCondition: (ctx) => {
                  console.log(ctx)
                  console.log(
                    ctx.store.state.user.permission_id === 4,
                    (ctx.store.state.user.permission_id === 3,
                    ctx.data.row.from_account_id === ctx.store.state.user.id)
                  )
                  return (
                    ctx.store.state.user.permission_id === 4 ||
                    (ctx.store.state.user.permission_id === 3 &&
                      ctx.data.row.from_account_id === ctx.store.state.user.id)
                  )
                },
                type: true,
              },
            ],
          },
          action: {
            type: 'confirm',
            dialog: {
              text: 'Вы подтверждаете архивацию офиса?',
              function: async (context) => {
                console.log(context)
                const { code } = await context.store.dispatch('form/putForm', {
                  url: 'update/office/archive ',
                  body: { data: { office_id: context.data.row.id } },
                })
                if (code === 1) {
                  context.store.commit('notifies/showMessage', {
                    color: 'success',
                    content: 'Успешно',
                    timeout: 1000,
                  })
                } else if (code === 2) {
                  context.store.commit('notifies/showMessage', {
                    color: 'error',
                    content: 'Ошибка на стороне сервера',
                    timeout: 1000,
                  })
                } else if (code === 3) {
                  context.store.commit('notifies/showMessage', {
                    color: 'error',
                    content: 'Доступ запрещен',
                    timeout: 1000,
                  })
                }
              },
            },
          },
        },
        {
          icon: 'mdi-plus',
          label: 'Назначить',
          isShow: {
            condition: [
              {
                funcCondition: (ctx) => {
                  console.log(ctx)
                  console.log(
                    ctx.store.state.user.permission_id === 4,
                    (ctx.store.state.user.permission_id === 3,
                    ctx.data.row.from_account_id === ctx.store.state.user.id)
                  )
                  return (
                    ctx.store.state.user.permission_id === 4 ||
                    (ctx.store.state.user.permission_id === 3 &&
                      ctx.data.row.from_account_id === ctx.store.state.user.id)
                  )
                },
                type: true,
              },
            ],
          },
          action: {
            type: 'toRoute',
            url: 'target',
            routeName: 'office/:office_id',
            routeParam: 'id',
            routeTarget: 'office_id',
          },
        },
      ],
    },
  },
  type: 'TableDefault',
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
        isShow: {
          condition: [
            // {
            //   permissions: [4],
            //   type: true,
            // },
            {
              funcCondition: (ctx) => {
                console.log('TEST FUNC')
                return (
                  ctx.store.state.user.permission_id === 4 ||
                  ctx.store.state.user.permission_id === 3
                )
              },
              type: true,
            },
          ],
        },
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
      title: 'id',
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
      alias: 'o.id',
      isShow: true,
      width: '40',
      value: 'id',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Название',
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
      alias: 'o.name',
      value: 'office_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Адрес',
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
      value: 'address',
      alias: 'o.address',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Город',
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
      alias: 'c.name',
      value: 'city_name',
      search: {
        field: '',
        isShow: true,
      },
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
    width: '600px',
    method: 'get',
    alias: 'office',
    url: '/get/form/',
    name: 'Офисы',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        path: 'add',
        lists: [
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
        alias: 'office',
        active: false,
        fields: editFields,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'office',
            skipValidation: true,
          }),
          stringAction({
            text: 'Создать',
            type: 'submit',
            module: 'form/create',
            url: 'create/office',
            name: 'createForm',
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
              ],
            },
            handlingResponse: {
              1: {
                text: 'Успешно',
                color: 'success',
              },
              2: {
                text: 'Ошибка на стороне сервера',
                color: 'error',
              },
              3: {
                text: 'Офис с таким именем уже существует',
                color: 'error',
              },
            },
          }),
          // stringAction({
          //   text: 'Удалить',
          //   type: 'submit',
          //   module: 'form/del',
          //   color: 'error',
          //   url: 'delete/personal_target',
          //   name: 'deleteFormById',
          //   action: 'deleteFormById',
          //   isHide: {
          //     value: false,
          //     type: 'every',
          //     condition: [
          //       {
          //         permissions: [1],
          //         type: false,
          //       },
          //     ],
          //   },
          // }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            url: 'update/office',
            name: 'saveFormId',
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
              ],
            },
            handlingResponse: {
              1: {
                text: 'Успешно',
                color: 'success',
              },
              2: {
                text: 'Ошибка на стороне сервера',
                color: 'error',
              },
              3: {
                text: 'Офис с таким именем уже существует',
                color: 'error',
              },
            },
          }),
        ],
        formData: {},
      },
      {
        id: 1,
        name: 'Основные',
        type: FormDefault,
        detail: true,
        path: 'edit',
        lists: [
          {
            alias: 'city_id',
            filter: [
              {
                alias: 'regions_id',
                field: 'regions_id',
                value: '',
                source: 'formData',
                type: 'num',
              },
            ],
          },
        ],
        alias: 'office',
        active: false,
        fields: editFields,
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'office',
            skipValidation: true,
          }),
          stringAction({
            text: 'Создать',
            type: 'submit',
            module: 'form/create',
            url: 'create/office',
            name: 'createForm',
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
              ],
            },
          }),
          // stringAction({
          //   text: 'Удалить',
          //   type: 'submit',
          //   module: 'form/del',
          //   color: 'error',
          //   url: 'delete/office',
          //   name: 'deleteFormById',
          //   action: 'deleteFormById',
          //   isHide: {
          //     value: false,
          //     type: 'every',
          //     condition: [
          //       {
          //         permissions: [4],
          //         type: false,
          //       },
          //     ],
          //   },
          // }),
          stringAction({
            text: 'Сохранить',
            type: 'submit',
            module: 'form/putForm',
            url: 'update/office',
            name: 'saveFormId',
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
              ],
            },
            handlingResponse: {
              1: {
                text: 'Информация сохранена',
                color: 'success',
              },
              2: {
                text: 'Ошибка',
                color: 'error',
              },
              3: {
                text: 'Офис с таким названием уже существует',
                color: 'error',
              },
            },
          }),
        ],
        formData: {},
      },
      target,
      TargetOffice,
      AccountOffice,
    ],
    activeTab: null,
  },
  // filters,
}

export default config
