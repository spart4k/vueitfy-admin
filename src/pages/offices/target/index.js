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
  name: 'Назначения',
  type: 'TableDefault',
  active: false,
  config: {
    selector: '#mainTable',
    name: 'Назначения',
    options: {
      selecting: true,
      search: {
        function: searchInputing,
      },
      headerFixed: true,
      url: 'get/pagination/target_office_manager',
      title: 'Назначения',
      contextMenu: {
        actions: [
          {
            icon: '$IconDelete',
            label: 'Удалить',
            isShow: {
              condition: [
                {
                  permissions: [4],
                  type: true,
                },
              ],
            },
            action: {
              type: 'confirm',
              dialog: {
                text: 'Вы подтверждаете удаление назначения?',
                function: (context) => {
                  context.store.dispatch('form/update', {
                    url: 'update/office/remove_assign',
                    body: {
                      data: {
                        office_id: context.data.row.id,
                        account_id: context.data.row.account_id,
                      },
                    },
                  })
                },
              },
            },
          },
        ],
      },
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
        title: 'Офис-менеджер',
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
        value: 'account_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата с',
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
        value: 'date_target_start',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата по',
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
        value: 'date_target_end',
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
    // filters,
  },
}
export default config
