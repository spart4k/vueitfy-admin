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
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

function changeSort(config, tab) {
  // let btn = config.panel.buttons.find((x) => x.function === changeSort)
  // let heading = config.head.find((x) => x.changeable)
  if (tab.value === 2) {
    config.head = holdPaymentsConfigHead
    config.options.url = 'get/pagination/hold_payments'
  } else if (tab.value === 1) {
    config.head = debetorConfigHead
    config.options.url = 'get/pagination/personal_debit'
  }
}

const debetorConfigHead = [
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
    title: 'Руководитель',
    type: 'default',
    align: 'center',
    fixed: {
      value: false,
      position: undefined,
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
    value: 'account_name',
    alias: 'sa.fio',
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
        type: 'string',
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
        type: 'string',
        default: '',
        value: '',
        isShow: false,
      },
    ],
    isShow: true,
    width: '90',
    alias: 'pers.name',
    value: 'personal_name',
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
    alias: 'o.name',
    value: 'object_name',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'Остаток',
    type: 'default',
    align: 'center',
    fixed: {
      value: false,
      position: undefined,
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
    value: 'remainder',
    alias: 'd.remainder',
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
        url: '$IconSetting',
        function: null,
        label: 'Редактировать',
      },
      {
        type: 'button',
        url: '$IconSetting',
        function: null,
        label: 'Удалить',
      },
    ],
  },
]

const holdPaymentsConfigHead = [
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
        type: 'string',
        default: '',
        value: '',
        isShow: false,
      },
    ],
    alias: 'hp.id',
    isShow: true,
    width: '40',
    value: 'id',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'В/В',
    type: 'default',
    align: 'center',
    fixed: {
      value: false,
      position: undefined,
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
    value: 'vid_vedomost',
    alias: 'vv.name',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'Остаток',
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
    width: '90',
    alias: 'hp.remainder',
    value: 'remainder',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'Сумма',
    type: 'default',
    align: 'center',
    fixed: {
      value: false,
      position: undefined,
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
    value: 'sum',
    alias: 'hp.sum',
    search: {
      field: '',
      isShow: true,
    },
  },
  {
    title: 'Дата назн',
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
    width: '90',
    alias: 'hp.date_target',
    value: 'date_target',
    search: {
      field: '',
      isShow: true,
    },
  },
  // {
  //   title: 'Действия',
  //   type: 'actions',
  //   align: 'center',
  //   fixed: {
  //     value: false,
  //     position: 'right',
  //   },
  //   isShow: true,
  //   width: '100',
  //   value: 'actions',
  //   actions: [
  //     {
  //       type: 'button',
  //       url: '$IconSetting',
  //       function: consoleText,
  //       label: 'Редактировать',
  //     },
  //     {
  //       type: 'button',
  //       url: '$IconSetting',
  //       function: consoleButton,
  //       label: 'Удалить',
  //     },
  //   ],
  // },
]

const tablePersonalDebt = {
  path: 'edit',
  id: uuidv4(),
  name: 'Задолженность',
  type: 'TableDefault',
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
      url: 'get/pagination/personal_debit',
      urlDetail: 'personal_id',
      alias: 'd.debtor_id',
      title: 'This is an about page1',
      noTableAction: true,
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
        {
          label: 'Переплата',
          class: ['v-table-button--custom'],
          url: '$IconEdit',
          type: 'switch',
          value: 1,
          refreshTable: true,
          backgroundColor: '#ffffff',
          values: [
            {
              label: 'Задолженность',
              value: 1,
              action: changeSort,
            },
            {
              label: 'Переплата',
              value: 2,
              action: changeSort,
            },
          ],
        },
        // {
        //   label: 'Скачать',
        //   class: ['v-table-button--custom'],
        //   function: consolePanel,
        //   backgroundColor: '#fff',
        // },
      ],
    },
    head: debetorConfigHead,
    data: {
      rows: [],
      totalRows: null,
      pageLength: 20,
      currentPage: 1,
      totalPages: null,
      footer: null,
    },
    detail: undefined,
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
    ],
  },
  isShow: {
    value: true,
    condition: [
      {
        permissions: [16, 19, 7, 13, 9],
        type: false,
      },
      {
        mainData: 'direction_json',
        value: [1, 6],
        type: true,
      },
    ],
  },
}

export default tablePersonalDebt
