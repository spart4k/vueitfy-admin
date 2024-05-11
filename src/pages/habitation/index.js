import filters from './filters'

import formHabitationAddEdit from './config/form-habitation-add-edit'
import formOwnerAddEdit from './config/form-owner-add-edit'
import formRealtorAddEdit from './config/form-realtor-add-edit'

import tableHabitationCurrent from './config/table-habitation-current'

export const config = {
  title: 'Проживание',
  activeTab: 0,
  tabs: [
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableDefault',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/habitation',
        title: 'Проживание',
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
            url: 'habitation/add',
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
          width: '90',
          alias: 'h.id',
          value: 'id',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Имя',
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
          alias: 'h.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          alias: 'ci.name',
          value: 'city',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регион',
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
          width: '150',
          alias: 'gr.name',
          value: 'region',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Тип',
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
          alias: 'ht.name',
          value: 'habitation_type',
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
          alias: 'h.address',
          value: 'address',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Вместимость',
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
          alias: 'h.count_place',
          value: 'capacity',
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
        alias: 'documents',
        url: '/get/form/',
        name: 'Проживание',
        requestId: 'habitation_id',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [
          formHabitationAddEdit,
          Object.assign({}, formHabitationAddEdit),
          tableHabitationCurrent,
          Object.assign({}, tableHabitationCurrent),
        ],
        activeTab: null,
      },
      filters,
    },
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableDefault',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/realtor',
        title: 'Риэлторы',
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
            url: 'habitation-add-realtor',
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
          width: '90',
          alias: 'r.id',
          value: 'id',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Имя',
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
          alias: 'r.name',
          value: 'name',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регион',
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
          width: '150',
          alias: 'gr.name',
          value: 'region',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Телефон',
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
          width: '150',
          alias: 'r.telephone',
          value: 'telephone',
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
        alias: 'documents',
        url: '/get/form/',
        name: 'Риэлторы',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        requestId: 'realtor_id',
        tabs: [formRealtorAddEdit, Object.assign({}, formRealtorAddEdit)],
        activeTab: null,
      },
      filters,
    },
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableDefault',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/owner',
        title: 'Владельцы',
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
            url: 'habitation-add-owner',
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
          width: '90',
          alias: 'oh.id',
          value: 'id',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Имя',
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
          alias: 'oh.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          alias: 'sy.name',
          value: 'city',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регион',
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
          width: '150',
          alias: 'sy.name',
          value: 'region',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Телефон',
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
          width: '150',
          alias: 'oh.telephone',
          value: 'telephone',
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
        alias: 'documents',
        url: '/get/form/',
        name: 'Такси',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        requestId: 'owner_id',
        tabs: [formOwnerAddEdit, Object.assign({}, formOwnerAddEdit)],
        activeTab: null,
      },
      filters,
    },
    {
      title: 'Персонал',
      selector: '#mainTable',
      type: 'TableDefault',
      options: {
        selecting: true,
        search: {
          //   function: searchInputing,
        },
        headerFixed: true,
        url: 'get/pagination/habitation_archive',
        title: 'Архив',
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
          width: '90',
          alias: 'h.id',
          value: 'id',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Имя',
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
          alias: 'h.name',
          value: 'name',
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
              type: 'text',
              default: '',
              value: '',
              isShow: false,
            },
          ],
          isShow: true,
          width: '150',
          alias: 'ci.name',
          value: 'city',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Регион',
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
          width: '150',
          alias: 'gr.name',
          value: 'region',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Тип',
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
          alias: 'ht.name',
          value: 'habitation_type',
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
          alias: 'h.address',
          value: 'address',
          search: {
            field: '',
            isShow: true,
          },
        },
        {
          title: 'Вместимость',
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
          alias: 'h.count_place',
          value: 'capacity',
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
        alias: 'documents',
        url: '/get/form/',
        name: 'Такси',
        bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
        tabs: [formHabitationAddEdit, Object.assign({}, formHabitationAddEdit)],
        activeTab: null,
      },
      filters,
    },
  ],
}

export default config
