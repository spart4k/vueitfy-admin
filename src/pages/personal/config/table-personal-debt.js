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
import TableDefault from '@/components/Table/default/index.vue'

function changeSort() {
  let btn = tablePersonalDebt.config.panel.buttons.find(
    (x) => x.function === changeSort
  )
  let heading = tablePersonalDebt.config.head.find((x) => x.changeable)
  if (btn.label === 'Объекты') {
    btn.label = 'ФИО'
    heading.title = 'Объект'
    heading.alias = 'o.name'
    heading.value = 'object_name'
    heading.routeName = 'pivot-edit-object'
    heading.routeParam = 'object_id'
    heading.type = 'download'
    tablePersonalDebt.config.options.url =
      'get/pagination_pivot/personal_target_object'
  } else if (btn.label === 'ФИО') {
    btn.label = 'Объекты'
    heading.title = 'ФИО'
    heading.alias = 'p.name'
    heading.value = 'personal_name'
    heading.routeName = 'pivot-edit-personal'
    heading.routeParam = 'personal_id'
    heading.type = 'default'
    tablePersonalDebt.config.options.url =
      'get/pagination_pivot/personal_target_personal'
  }
}

const tablePersonalDebt = {
  path: 'edit',
  id: uuidv4(),
  name: 'Задолженность',
  type: TableDefault,
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
          isSwitch: true,
          function: changeSort,
          backgroundColor: '#ffffff',
        },
      ],
    },
    head: [
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
        permissions: [16, 19],
        type: false,
      },
    ],
  },
}

export default tablePersonalDebt
