import filters from './filters'
import _ from 'lodash'
import formRealtyAddEdit from './config/form-realty-add-edit.js'

export const config = {
  title: 'Недвижимость',
  activeTab: 0,
  tabs: [
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {},
        headerFixed: true,
        url: 'get/pagination/realty_active_object',
        title: 'Активные',
        contextMenu: {
          actions: [
            {
              icon: 'mdi-history',
              label: 'Переместить в архив',
              isShow: {
                condition: [
                  {
                    permissions: [3, 4, 15],
                    type: true,
                  },
                ],
              },
              action: {
                type: 'confirm',
                dialog: {
                  text: 'Вы подтверждаете перемещение в архив?',
                  function: (context) => {
                    context.store.dispatch('form/putForm', {
                      url: 'update/realty/archive',
                      body: { data: { id: context.data.row.id } },
                    })
                  },
                },
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
            function: null,
            backgroundColor: '#ffffff',
          },
          {
            label: 'Добавить',
            class: ['v-table-button--custom'],
            type: 'changeUrl',
            url: 'realty/add',
            backgroundColor: '#fff',
          },
        ],
      },
      head: [
        {
          title: 'Наименование',
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
          alias: 'r.name',
          isShow: true,
          width: '40',
          value: 'name',
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
            position: 'left',
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
          width: '90',
          alias: 'r.address',
          value: 'address',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Ответственный',
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
          alias: 'sas.name',
          value: 'account_name',
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
          value: 'object_name',
          alias: 'o.name',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [_.cloneDeep(formRealtyAddEdit), _.cloneDeep(formRealtyAddEdit)],
        clearStore: true,
        activeTab: null,
        formData: {},
      },
      filters: _.cloneDeep(filters),
    },
    {
      selector: '#mainTable',
      options: {
        selecting: true,
        search: {},
        headerFixed: true,
        url: 'get/pagination/realty_archive_object',
        title: 'Архив',
        // contextMenu: contextMenuPersonal,
      },
      type: 'TableDefault',
      panel: {
        buttons: [
          {
            label: 'Обновить',
            class: ['v-table-button--custom'],
            url: '$IconEdit',
            function: null,
            backgroundColor: '#ffffff',
          },
          {
            label: 'Добавить',
            class: ['v-table-button--custom'],
            type: 'changeUrl',
            url: 'realty/add',
            backgroundColor: '#fff',
          },
        ],
      },
      head: [
        {
          title: 'Наименование',
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
          alias: 'r.name',
          isShow: true,
          width: '40',
          value: 'name',
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
            position: 'left',
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
          width: '90',
          alias: 'r.address',
          value: 'address',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Ответственный',
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
          alias: 'sas.name',
          value: 'account_name',
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
          value: 'object_name',
          alias: 'o.name',
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
      },
      detail: {
        type: 'popup', // String 'popup' or 'page'
        classes: [''], // List class
        width: '1000px',
        method: 'get',
        alias: 'personal',
        url: '/get/form/',
        name: 'Персонал',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [_.cloneDeep(formRealtyAddEdit), _.cloneDeep(formRealtyAddEdit)],
        clearStore: true,
        activeTab: null,
        formData: {},
      },
      filters: _.cloneDeep(filters),
    },
  ],
}
