import _ from 'lodash'

import formMvdAddEdit from './config/form-mvd-add-edit'

export const config = {
  title: 'МВД',
  selector: '#mainTable',
  type: 'TableDefault',
  options: {
    selecting: true,
    search: {
      //   function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/mvd_spr',
    title: 'МВД',
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
              text: 'Вы подтверждаете удаление МВД?',
              function: (context) => {
                context.store.dispatch('form/update', {
                  url: 'set/data/mvd_spr',
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
        // function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        type: 'changeUrl',
        url: 'mvd/add',
        backgroundColor: '#fff',
      },
    ],
    date: true,
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '20',
      alias: 'id',
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '90',
      alias: 'name',
      value: 'name',
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
    width: '1000px',
    method: 'get',
    alias: 'bank',
    url: '/get/form/',
    name: 'МВД',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [_.cloneDeep(formMvdAddEdit), _.cloneDeep(formMvdAddEdit)],
    activeTab: null,
  },
}

export default config
