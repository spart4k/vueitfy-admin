import _ from 'lodash'

import formTerritoriesAddEdit from './config/form-territories-add-edit'

export const config = {
  title: 'Территории',
  selector: '#mainTable',
  type: 'TableDefault',
  options: {
    selecting: true,
    search: {
      //   function: searchInputing,
    },
    headerFixed: true,
    url: 'get/pagination/x5_territories',
    title: 'Территории',
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
              text: 'Вы подтверждаете удаление территории?',
              function: async (context) => {
                await context.store.dispatch('form/delForm', {
                  url: `delete/x5/territories/${context.data.row.id}`,
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
        url: 'x5territories/add',
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
      alias: 'x5.id',
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
      alias: 'x5.name',
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
    name: 'Зоны',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      _.cloneDeep(formTerritoriesAddEdit),
      _.cloneDeep(formTerritoriesAddEdit),
    ],
    activeTab: null,
  },
}

export default config
