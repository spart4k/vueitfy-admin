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
  maxLength,
  numeric,
} from '@/utils/validation.js'
import { v4 as uuidv4 } from 'uuid'

export default {
  path: 'edit',
  id: uuidv4(),
  name: 'Трудоустройство',
  type: 'TableDefault',
  active: false,
  //   isShow: {
  //     value: true,
  //     condition: [
  //       {
  //         mainData: 'direction_json',
  //         value: [2],
  //         type: true,
  //       },
  //     ],
  //   },
  config: {
    selector: '#mainTable',
    options: {
      selecting: true,
      search: {
        function: null,
      },
      headerFixed: true,
      //url: 'https://dummyjson.com/users',
      url: 'get/pagination/employment_personal_history',
      urlDetail: 'personal_id',
      alias: 'hep.personal_id',
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
        alias: 'sy.name',
        value: 'name',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Юридическое название',
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
        alias: 'hep.legal_entity',
        value: 'legal_entity',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата трудоустройства',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
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
        value: 'date_start',
        alias: 'hep.date_start',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата увольнения',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
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
        value: 'date_end',
        alias: 'hep.date_end',
        search: {
          field: '',
          isShow: true,
        },
      },
      {
        title: 'Дата редактирования',
        type: 'default',
        align: 'center',
        fixed: {
          value: false,
          position: undefined,
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
        value: 'date_edit',
        alias: 'l.date_edit',
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
    detail: null,
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
