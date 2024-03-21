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
import { stringAction } from '@/utils/actions'
import { required, hasDate, hasTime, nameLength } from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  id: uuidv4(),
  path: 'edit',
  name: 'Назначения',
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
      url: 'get/pagination/object_target',
      urlDetail: 'id',
      alias: 'ot.object_id',
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
        //{
        //  label: 'Добавить',
        //  class: ['v-table-button--custom'],
        //  url: '$IconSetting',
        //  function: consolePanel,
        //  backgroundColor: '#fff',
        //},
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
        title: 'Сотрудник',
        type: 'default',
        align: 'center',
        sorts: [
          {
            type: 'string',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        alias: 'sa.name',
        isShow: true,
        width: '40',
        value: 'account_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Направление',
        type: 'default',
        align: 'center',
        sorts: [
          {
            type: 'string',
            default: '',
            value: '',
            isShow: false,
          },
        ],
        alias: 'd.name',
        isShow: true,
        width: '40',
        value: 'direction_name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Должность',
        type: 'default',
        align: 'center',
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
        value: 'permission_name',
        alias: 'sp.name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Д назнач',
        type: 'default',
        align: 'center',
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
        alias: 'ot.date_target_start',
        value: 'date_target_start',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Д оконч',
        type: 'default',
        align: 'center',
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
        alias: 'ot.date_target_end',
        value: 'date_target_end',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Назначил',
        type: 'default',
        align: 'center',
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
        alias: 'sat.name',
        value: 'target_name',
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
    detail: undefined,
    actions: [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'text',
        name: 'closePopup',
        action: 'closePopup',
        to: 'object',
        skipValidation: true,
      }),
    ],
  },
}
