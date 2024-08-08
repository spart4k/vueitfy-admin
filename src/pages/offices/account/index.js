import filters from './filters'
import FormDefault from '@/components/Form/default/index.vue'
import TargetPersonal from '@/components/Form/targetPersonal/default/index.vue'
import FormStage from '@/components/Form/stage/index.vue'
import FormTarget from '@/components/Form/target/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import { v4 as uuidv4 } from 'uuid'
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
import AccountEdit from '../../account/config/form-account-edit'
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

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

// const config = {
//   selector: '#mainTable',
//   name: 'Назначения',
//   options: {
//     selecting: true,
//     search: {
//       function: searchInputing,
//     },
//     headerFixed: true,
//     url: 'get/pagination/target_office_manager',
//     title: 'Назначения',
//     contextMenu: {
//       actions: [
//         {
//           icon: '$IconDelete',
//           label: 'Удалить',
//           isShow: {
//             condition: [
//               {
//                 permissions: [4],
//                 type: true,
//               },
//             ],
//           },
//           action: {
//             type: 'confirm',
//             dialog: {
//               text: 'Вы подтверждаете удаление назначения?',
//               function: (context) => {
//                 context.store.dispatch('form/update', {
//                   url: 'update/office/remove_assign',
//                   body: {
//                     data: {
//                       office_id: context.data.row.id,
//                       account_id: context.data.row.account_id,
//                     },
//                   },
//                 })
//               },
//             },
//           },
//         },
//       ],
//     },
//     styleRow: [
//       {
//         targetKey: 'is_active',
//         result: {
//           1: {
//             backgroundColor: 'green',
//           },
//           0: {
//             backgroundColor: 'unset',
//           },
//         },
//       },
//     ],
//   },
//   type: 'TableDefault',
//   path: 'edit',
//   panel: {
//     buttons: [
//       {
//         label: 'Обновить',
//         class: ['v-table-button--custom'],
//         url: '$IconEdit',
//         type: 'refresh',
//         function: consolePanel,
//         backgroundColor: '#ffffff',
//       },
//       // {
//       //   label: 'Скачать',
//       //   class: ['v-table-button--custom'],
//       //   function: consolePanel,
//       //   backgroundColor: '#fff',
//       // },
//     ],
//   },
//   head: [
//     {
//       title: 'Офис-менеджер',
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
//       alias: 'o.id',
//       isShow: true,
//       width: '40',
//       value: 'account_name',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Дата с',
//       type: 'default',
//       align: 'center',
//       fixed: {
//         value: false,
//         position: 'left',
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
//       width: '90',
//       alias: 'o.name',
//       value: 'date_target_start',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//     {
//       title: 'Дата по',
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
//       alias: 'c.name',
//       value: 'date_target_end',
//       search: {
//         field: '',
//         isShow: true,
//       },
//     },
//   ],
//   data: {
//     rows: [],
//     totalRows: null,
//     pageLength: 20,
//     currentPage: 1,
//     totalPages: null,
//     footer: null,
//   },
//   // filters,
// }

const config = {
  path: 'edit',
  id: uuidv4(),
  name: 'Сотрудники',
  type: 'TableDefault',
  active: false,
  config: {
    selector: '#mainTable',
    name: 'Сотрудники',
    options: {
      selecting: true,
      search: {
        function: searchInputing,
      },
      alias: 'o.id',
      headerFixed: true,
      url: 'get/pagination/office_accounts',
      title: 'Сотрудники',
      // contextMenu: {
      //   actions: [
      //     {
      //       icon: '$IconDelete',
      //       label: 'Удалить',
      //       isShow: {
      //         condition: [
      //           {
      //             funcCondition: (ctx) => {
      //               console.log(ctx)
      //               console.log(
      //                 ctx.store.state.user.permission_id === 4,
      //                 (ctx.store.state.user.permission_id === 3,
      //                 ctx.mainData.from_account_id === ctx.store.state.user.id)
      //               )
      //               return (
      //                 ctx.store.state.user.permission_id === 4 ||
      //                 (ctx.store.state.user.permission_id === 3 &&
      //                   ctx.mainData.from_account_id ===
      //                     ctx.store.state.user.id)
      //               )
      //             },
      //             type: true,
      //           },
      //         ],
      //       },
      //       action: {
      //         type: 'confirm',
      //         dialog: {
      //           text: 'Вы подтверждаете удаление назначения?',
      //           function: async (context) => {
      //             console.log(context)
      //             const { code } = await context.store.dispatch(
      //               'form/putForm',
      //               {
      //                 url: 'update/office/remove_assign',
      //                 body: {
      //                   data: {
      //                     office_id: context.route.params.id,
      //                     account_id: context.data.row.account_id,
      //                   },
      //                 },
      //               }
      //             )
      //             if (code === 1) {
      //               context.store.commit('notifies/showMessage', {
      //                 color: 'success',
      //                 content: 'Успешно',
      //                 timeout: 1000,
      //               })
      //             } else if (code === 2) {
      //               context.store.commit('notifies/showMessage', {
      //                 color: 'error',
      //                 content: 'Ошибка на стороне сервера',
      //                 timeout: 1000,
      //               })
      //             } else if (code === 3) {
      //               context.store.commit('notifies/showMessage', {
      //                 color: 'error',
      //                 content: 'Доступ запрещен',
      //                 timeout: 1000,
      //               })
      //             }
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
      styleRow: [
        {
          targetKey: 'is_active',
          result: {
            1: {
              backgroundColor: 'green',
            },
            0: {
              backgroundColor: 'unset',
            },
          },
        },
      ],
    },
    type: 'TableDefault',
    path: 'edit',
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
        alias: 'sy.id',
        isShow: true,
        width: '40',
        value: 'account_id',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Аккаунт',
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
        alias: 'sy.name',
        isShow: true,
        width: '40',
        value: 'account_name',
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
      tabs: [AccountEdit],
      activeTab: null,
    },
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
    ],
    // filters,
  },
}
export default config
