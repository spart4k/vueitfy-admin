import _ from 'lodash'

import formCustomAddEdit from './config/custom-zone-add-edit'

export const config = {
  title: 'Зоны',
  selector: '#mainTable',
  type: 'TableDefault',
  options: {
    selecting: true,
    search: {
      //   function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/x5_zone',
    title: 'Зоны',
    contextMenu: {
      actions: [
        {
          icon: '$IconDelete',
          label: 'Удалить',
          isShow: {
            condition: [
              {
                permissions: [4, 17],
                type: true,
              },
            ],
          },
          action: {
            type: 'confirm',
            dialog: {
              text: 'Вы подтверждаете удаление зоны?',
              function: async (context) => {
                await context.store.dispatch('form/delForm', {
                  url: `delete/x5/zone/${context.data.row.id}`,
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
        url: 'x5zone/add',
        backgroundColor: '#fff',
      },
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
          type: 'text',
          default: '',
          value: '',
          isShow: false,
        },
      ],
      isShow: true,
      width: '20',
      alias: 'z.id',
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
      alias: 'z.name',
      value: 'zone_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Территория',
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
      alias: 't.name',
      value: 'territories_name',
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
    alias: 'bank',
    url: '/get/form/',
    name: 'Зоны',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [_.cloneDeep(formCustomAddEdit), _.cloneDeep(formCustomAddEdit)],
    activeTab: null,
  },
}

export default config
