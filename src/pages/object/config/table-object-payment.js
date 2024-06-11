import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  colorPicker,
  textBlock,
} from '@/utils/fields.js'
import filters from '../filters'
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  name: 'Расход',
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
      url: 'get/pagination/payment',
      urlDetail: 'personal_id',
      alias: 'p.personal_id',
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
        {
          label: 'Добавить',
          class: ['v-table-button--custom'],
          url: '$IconSetting',
          function: null,
          backgroundColor: '#fff',
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
        title: 'ID',
        type: 'default',
        align: 'center',
        fixed: {
          value: true,
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
        alias: 'p.id',
        isShow: true,
        width: '40',
        value: 'id',
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
          position: undefined,
        },
        sorts: [
          {
            type: 'number',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        value: 'date_target',
        alias: 'p.date_target',
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
        title: 'Часы',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: [
          {
            type: 'number',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        value: 'hour',
        alias: 'p.hour',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Должность',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
        },
        sorts: [
          {
            type: 'date',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        alias: 'd.name',
        value: 'doljnost_name',
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
            type: 'date',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        isShow: true,
        width: '150',
        alias: 'p.total',
        value: 'total',
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
    ],
    data: {
      rows: [],
      totalRows: null,
      pageLength: 20,
      currentPage: 1,
      totalPages: null,
      footer: null,
    },
    detail: undefined,
    filters,
  },
}
