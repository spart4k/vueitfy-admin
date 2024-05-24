import { stringAction } from '@/utils/actions'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  id: uuidv4(),
  path: 'history',
  name: 'История',
  type: 'TableDefault',
  routeParam: 'history_id',
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
      url: 'get/pagination/corp_card_history',
      urlDetail: 'card_id',
      alias: 'tcb.card_id',
      title: 'This is an about page1',
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
    panel: {
      buttons: [
        {
          label: 'Обновить',
          class: ['v-table-button--custom'],
          url: '$IconEdit',
          function: null,
          backgroundColor: '#ffffff',
        },
      ],
    },
    head: [
      {
        title: 'ID',
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
        alias: 'tcb.id',
        value: 'id',
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
            type: 'text',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '90',
        alias: 'sa.name',
        value: 'account_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата выдачи',
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
        alias: 'tcb.date_start',
        value: 'date_start',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата изъятия',
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
        alias: 'tcb.date_end',
        value: 'date_end',
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

export default config
