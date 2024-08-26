import filters from './filters'
import FormDefault from '@/components/Form/default/index.vue'
import formZayavkaAdd from './config/form-zayavka-add'
import formZayavkaEdit from './config/form-zayavka-edit'
import { required, number } from '@/utils/validation.js'
import {
  stringField,
  selectField,
  autocompleteField,
  //datetimeField,
  textareaField,
  checkboxField,
  dateField,
  textBlock,
  radioPanel,
  dropZoneField,
  carouselField,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'

function consoleText(row) {}

function consoleButton(row) {}

function consolePanel() {}

function searchInputing(field) {}

function downloadFile() {}

const config = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'get/pagination/zayavka',
    title: 'This is an about page1',
    contextMenu: {
      actions: [
        {
          icon: '$IconDelete',
          label: 'Удалить',
          isShow: {
            condition: [
              {
                funcCondition: (context) => {
                  return (
                    context.store.state.user.id ===
                      context.data.row.from_account_id &&
                    context.data.row.status === 1
                  )
                },
                type: true,
              },
            ],
          },
          action: {
            type: 'confirm',
            dialog: {
              text: 'Вы подтверждаете удаление заявки?',
              function: (context) => {
                context.store.dispatch('form/update', {
                  url: 'set/data/zayavka',
                  body: { data: { id: context.data.row.id, del: 1 } },
                })
              },
            },
          },
        },
      ],
    },
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
        isShow: {
          condition: [
            {
              permissions: [12, 22],
              type: false,
            },
          ],
        },
      },
      {
        label: 'Бухгалтерия excel',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        backgroundColor: '#fff',
        type: 'sendPage',
        requestUrl: 'accounting/zayavka/export',
        isShow: {
          condition: [
            {
              permissions: [4, 12, 22],
              type: true,
            },
          ],
        },
      },
      {
        label: 'Загрузить статус',
        class: ['v-table-button--custom'],
        backgroundColor: '#fff',
        type: 'changeUrl',
        url: 'zayavka-load',
        isShow: {
          condition: [
            {
              permissions: [4, 12, 22],
              type: true,
            },
          ],
        },
      },
      {
        label: 'Согласовать',
        class: ['v-table-button--custom'],
        backgroundColor: '#fff',
        type: 'selectedItems',
        refreshTable: true,
        isShow: {
          condition: [
            {
              permissions: [4, 8, 17],
              type: true,
            },
          ],
        },
        method: async (context) => {
          const data = await context.store.dispatch('form/putForm', {
            url: 'mass/zayavka/agree',
            body: { data: { ids: context.idArray } },
          })
          if (data.code === 1) {
            context.store.commit('notifies/showMessage', {
              color: 'success',
              content: 'Заявки согласованы',
              timeout: 2000,
            })
          } else if (data.code === 2) {
            context.store.commit('notifies/showMessage', {
              color: 'warning',
              content: 'Не выбрано ни одной записи',
              timeout: 2000,
            })
          } else if (data.code === 3) {
            context.store.commit('notifies/showMessage', {
              color: 'error',
              content: 'Что-то пошло не так...',
              timeout: 2000,
            })
          }
        },
      },
      {
        label: 'Оплачено',
        class: ['v-table-button--custom'],
        backgroundColor: '#fff',
        type: 'selectedItems',
        refreshTable: true,
        isShow: {
          condition: [
            {
              permissions: [4, 12, 22],
              type: true,
            },
          ],
        },
        method: async (context) => {
          const data = await context.store.dispatch('form/putForm', {
            url: 'mass/zayavka/pay',
            body: { data: { ids: context.idArray } },
          })
          if (data.code === 1) {
            context.store.commit('notifies/showMessage', {
              color: 'success',
              content: 'Заявки оплачены',
              timeout: 2000,
            })
          } else if (data.code === 2) {
            context.store.commit('notifies/showMessage', {
              color: 'warning',
              content: 'Не выбрано ни одной записи',
              timeout: 2000,
            })
          } else if (data.code === 3) {
            context.store.commit('notifies/showMessage', {
              color: 'error',
              content: 'Что-то пошло не так...',
              timeout: 2000,
            })
          }
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
      title: 'Статус',
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
      alias: 'sz.name',
      isShow: true,
      width: '40',
      value: 'status_name',
      backgroundColorKey: 'status_color',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Создал',
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
      alias: 'sac.name',
      isShow: true,
      width: '40',
      value: 'from_fio',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'От',
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
      alias: 'sas.name',
      isShow: true,
      width: '40',
      value: 'status_fio',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Дата статус',
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
      alias: 'z.date_status',
      isShow: true,
      width: '40',
      value: 'date_status',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Направление',
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
      alias: 'dir.name',
      isShow: true,
      width: '40',
      value: 'direction_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'На кого',
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
      alias: 'z.to_name',
      isShow: true,
      width: '40',
      value: 'to_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Категория',
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
      alias: 'rc.name',
      isShow: true,
      width: '40',
      value: 'category_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Кол-во',
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
      alias: 'z.count',
      isShow: true,
      width: '40',
      value: 'count',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Стоимость',
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
      alias: 'z.price',
      isShow: true,
      width: '40',
      value: 'price',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'ВДС',
      type: 'checkbox',
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
      alias: 'z.is_debit',
      isShow: true,
      width: '40',
      value: 'is_debit',
      search: {
        field: '',
        isShow: false,
      },
    },
    {
      title: 'Файл счета / чек',
      type: 'download',
      actionCondition: false,
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
      alias: 'z.payment_schet',
      isShow: true,
      width: '40',
      value: 'schet',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          funcCondition: (context) => {
            return JSON.parse(context.row.row.schets).length
          },
          type: 'button',
          url: '$IconDownload',
          method: async (context) => {
            const data = await context.store.dispatch('form/update', {
              url: 'create/zayavka_archive',
              body: { zayavka_id: context.row.row.id, type: 'schet' },
            })
            if (data.code === 1) {
              context.Vue.downloadFile(data.result)
            } else {
              context.store.commit('notifies/showMessage', {
                color: 'error',
                content: 'Что-то пошло не так...',
                timeout: 2000,
              })
            }
          },
        },
      ],
    },
    {
      title: 'Закрывающие документы',
      type: 'download',
      actionCondition: false,
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
      alias: 'z.close_schet',
      isShow: true,
      width: '40',
      value: 'close_schet',
      search: {
        field: '',
        isShow: true,
      },
      actions: [
        {
          funcCondition: (context) => {
            return JSON.parse(context.row.row.close_schets).length
          },
          type: 'button',
          url: '$IconDownload',
          method: async (context) => {
            const data = await context.store.dispatch('form/update', {
              url: 'create/zayavka_archive',
              body: { zayavka_id: context.row.row.id, type: 'close_schet' },
            })
            if (data.code === 1) {
              context.Vue.downloadFile(data.result)
            } else {
              context.store.commit('notifies/showMessage', {
                color: 'error',
                content: 'Что-то пошло не так...',
                timeout: 2000,
              })
            }
          },
          label: 'Скачать',
        },
      ],
    },
    {
      title: 'rek1',
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
      alias: 'z.rek1',
      isShow: true,
      width: '40',
      value: 'rek1',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'rek2',
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
      alias: 'z.rek2',
      isShow: true,
      width: '40',
      value: 'rek2',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Банк',
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
      alias: 'b.name',
      isShow: true,
      width: '40',
      value: 'bank_name',
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
          url: '$IconEdit',
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconDelete',
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
    footer: null,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    classes: [''], // List class
    width: '600px',
    method: 'get',
    name: 'Заявка',
    alias: 'zayavka',
    url: '/get/form/',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      formZayavkaAdd,
      formZayavkaEdit,
      {
        id: 2,
        path: 'load',
        name: 'load',
        type: FormDefault,
        detail: true,
        alias: 'personal',
        active: false,
        fields: [
          dropZoneField({
            label: 'Файл',
            name: 'file_path',
            placeholder: '',
            readonly: false,
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            bootstrapClass: [''],
            validations: { required },
            options: {
              withoutSave: false,
              folder: 'accounting',
              name: '`accounting_zayavka`',
              paramsForEmit: this,
            },
            value: [],
          }),
        ],
        actions: [
          stringAction({
            text: 'Закрыть',
            type: 'submit',
            color: 'textDefault',
            name: 'closePopup',
            action: 'closePopup',
            to: 'zayavka',
            skipValidation: true,
          }),
          stringAction({
            text: 'Загрузить',
            type: 'submit',
            module: 'table/loadStatus',
            url: 'accounting/zayavka/import',
            successMessage: false,
            name: 'saveForm',
            action: 'saveFormStore',
          }),
          //stringAction({
          //  text: 'Сохранить',
          //  type: 'submit',
          //  module: '',
          //  name: 'saveForm',
          //  //action: 'saveForm',
          //  nextForm: true,
          //}),
        ],
      },
    ],
    activeTab: null,
  },
  filters,
}

export default config
