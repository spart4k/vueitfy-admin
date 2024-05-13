import { stringAction } from '@/utils/actions'
import { v4 as uuidv4 } from 'uuid'

import formHabitationAddEdit from './form-habitation-add-edit'

export const config = {
  id: uuidv4(),
  path: 'habitation-edit',
  name: 'Проживающие',
  type: 'TableDefault',
  routeParam: 'habitation_id',
  active: false,
  config: {
    selector: '#mainTable',
    options: {
      selecting: true,
      search: {
        function: null,
      },
      headerFixed: true,
      //url: 'https://dummyjson.com/users',
      url: 'get/pagination/habitation_history',
      urlDetail: 'habitation_id',
      alias: 'hh.habitation_id',
      title: 'This is an about page1',
    },
    panel: {
      buttons: [
        {
          label: 'Обновить',
          class: ['v-table-button--custom'],
          url: '$IconEdit',
          function: null,
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
        title: 'Линейщик',
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
        value: 'personal_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата заселения',
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
        value: 'date_in',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата выселения',
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
        value: 'date_out',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Причина',
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
        value: 'why',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Коммент',
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
        value: 'comment',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Регистрация',
        align: 'center',
        type: 'checkbox',
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
        value: 'with_check_in',
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
    // detail: {
    //   type: 'popup', // String 'popup' or 'page'
    //   getOnClose: true,
    //   classes: [''], // List class
    //   width: '800px',
    //   method: 'get',
    //   alias: 'documents',
    //   url: '/get/form/',
    //   requestId: 'habitation_history_id',
    //   name: 'Проживание',
    //   bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    //   activeTab: null,
    //   tabs: [],
    // },
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        skipValidation: true,
      }),
    ],
  },
}
