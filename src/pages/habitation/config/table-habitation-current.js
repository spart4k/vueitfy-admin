import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  textBlock,
} from '@/utils/fields.js'
import { stringAction } from '@/utils/actions'
import {
  required,
  hasDate,
  hasTime,
  nameLength,
  minLength,
  numeric,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'habitation-edit',
  name: 'Проживалки',
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
      alias: 'z.habitation_id',
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
      getOnClose: true,
      classes: [''], // List class
      width: '500px',
      method: 'get',
      alias: 'documents',
      url: '/get/form/',
      requestId: 'habitation_id',
      name: 'Проживание',
      bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
      activeTab: null,
      tabs: [],
    },
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
