<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault
      @changeheadershow="changeheadershow"
      :options="tableConfig"
      :filtersConfig="filtersConfig"
    />
  </div>
  <!--</Layout>-->
</template>

<script>
import { required, hasDate, hasTime } from '@/utills/validation.js'

function consoleText(row) {
  console.log(row, 2)
  //return 'test'
}

function consoleButton(row) {
  console.log(row, 1)
}

function consolePanel() {
  console.log('panel,button')
}

function searchInputing(field) {
  console.log(field)
}

const tableConsumptionConfig = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'http://10.63.1.132:5000/get/pagination/personal',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
    ],
  },
  //head: [
  //  {
  //    title: 'ID',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '40',
  //    value: 'id',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Сотрудник',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '90',
  //    value: 'firstName',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Отдел',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'company.department',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Email',
  //    type: 'default',
  //    align: 'left',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'number',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'email',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Телефон',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'phone',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Образование',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '200',
  //    value: 'university',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Пол',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '100',
  //    value: 'gender',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Мак адрес',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '130',
  //    value: 'macAddress',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Домен',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'domain',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'День рождения',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'birthDate',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Действия',
  //    type: 'actions',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'right',
  //    },
  //    isShow: true,
  //    width: '100',
  //    value: 'actions',
  //    actions: [
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleText,
  //        label: 'Редактировать',
  //      },
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleButton,
  //        label: 'Удалить',
  //      },
  //    ],
  //  },
  //],
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
      title: 'Статус',
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
      alias: 'ps.status',
      value: 'status_name',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'ФИО',
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
      alias: 'p.name',
      value: 'name',
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
      value: 'telefon',
      alias: 'p.telefon',
      search: {
        field: '',
        isShow: true,
      },
    },
    {
      title: 'Примечание',
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
      value: 'comment',
      alias: 'p.comment',
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
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
        },
      ],
    },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: 10,
    currentPage: 1,
    totalPages: null,
  },
}

const tableConfigData = {
  selector: '#mainTable',
  options: {
    selecting: true,
    search: {
      function: searchInputing,
    },
    headerFixed: true,
    //url: 'https://dummyjson.com/users',
    url: 'http://10.63.1.132:5000/get/pagination/payment',
    title: 'This is an about page1',
  },
  panel: {
    buttons: [
      {
        label: 'Обновить',
        class: ['v-table-button--custom'],
        url: '$IconEdit',
        function: consolePanel,
        backgroundColor: '#ffffff',
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        url: '$IconSetting',
        function: consolePanel,
        backgroundColor: '#fff',
      },
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff',
      },
    ],
  },
  //head: [
  //  {
  //    title: 'ID',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '40',
  //    value: 'id',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Сотрудник',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '90',
  //    value: 'firstName',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Отдел',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'left',
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'company.department',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Email',
  //    type: 'default',
  //    align: 'left',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'number',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'email',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Телефон',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'phone',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Образование',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '200',
  //    value: 'university',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Пол',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '100',
  //    value: 'gender',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Мак адрес',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '130',
  //    value: 'macAddress',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Домен',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'string',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'domain',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'День рождения',
  //    type: 'default',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: undefined,
  //    },
  //    sorts: [
  //      {
  //        type: 'date',
  //        default: 'asc',
  //        value: 'asc',
  //        isShow: false,
  //      },
  //    ],
  //    isShow: true,
  //    width: '150',
  //    value: 'birthDate',
  //    search: {
  //      field: '',
  //      isShow: true,
  //    },
  //  },
  //  {
  //    title: 'Действия',
  //    type: 'actions',
  //    align: 'center',
  //    fixed: {
  //      value: false,
  //      position: 'right',
  //    },
  //    isShow: true,
  //    width: '100',
  //    value: 'actions',
  //    actions: [
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleText,
  //        label: 'Редактировать',
  //      },
  //      {
  //        type: 'button',
  //        url: '$IconSetting',
  //        function: consoleButton,
  //        label: 'Удалить',
  //      },
  //    ],
  //  },
  //],
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
      title: 'Сотрудник',
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
      title: 'object_name',
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
      title: 'hour',
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
      title: 'date_target',
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
      title: 'total',
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
          function: consoleText,
          label: 'Редактировать',
        },
        {
          type: 'button',
          url: '$IconSetting',
          function: consoleButton,
          label: 'Удалить',
        },
      ],
    },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: 10,
    currentPage: 1,
    totalPages: null,
  },
  detail: {
    type: 'popup', // String 'popup' or 'page'
    class: [''], // List class
    width: '800px',
    bootstrapClass: [''], // List class from bootstrap ( col-6, pa-2... )
    tabs: [
      {
        id: 0,
        name: 'Основные',
        type: 'FormDefault',
        active: false,
        fields: [
          {
            id: 0,
            label: 'Время создания',
            name: 'date_created',
            value: '',
            type: 'date',
            subtype: 'datetime',
            readonly: false,
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
          },
          {
            id: 1,
            label: 'Время создания',
            name: 'time_created',
            value: '',
            type: 'string',
            readonly: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
          },
          {
            id: 2,
            label: 'Цвет',
            name: 'color',
            value: '',
            type: 'select',
            readonly: false,
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'label',
              value: 'value',
            },
            items: [
              {
                id: 0,
                label: 'Зеленый',
                value: 'green',
              },
              {
                id: 1,
                label: 'Красный',
                value: 'red',
              },
              {
                id: 2,
                label: 'Желтый',
                value: 'yellow',
              },
              {
                id: 3,
                label: 'Оранжевый',
                value: 'orange',
              },
            ],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
          },
          {
            id: 3,
            label: 'Объект',
            name: 'object',
            value: '',
            type: 'autocomplete',
            subtype: 'multiple',
            readonly: false,
            placeholder: '',
            class: [''],
            selectOption: {
              text: 'label',
              value: 'value',
            },
            items: [],
            page: 1,
            search: '',
            url: 'http://10.63.1.132:5000/get/pagination_list/object',
            loading: false,
            position: {
              cols: 12,
              sm: 8,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
          },
          {
            id: 4,
            label: 'Описание',
            name: 'description',
            value: '',
            type: 'textarea',
            readonly: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 12,
            },
            validations: { required },
            bootstrapClass: [''],
            disable: false,
          },
          {
            id: 5,
            label: 'Время создания',
            name: 'datetime',
            value: '',
            type: 'datetime',
            subtype: 'datetime',
            readonly: false,
            menu: false,
            placeholder: '',
            class: [''],
            position: {
              cols: 12,
              sm: 4,
            },
            validations: { hasDate, hasTime },
            bootstrapClass: [''],
            disable: false,
          },
        ],
      },
      {
        id: 1,
        name: 'Расход',
        type: 'TableDefault',
        active: false,
        config: tableConsumptionConfig,
      },
    ],
    activeTab: null,
  },
}

import Vue from 'vue'
import TableDefault from '@/components/Table/default/index.vue'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Table-View',

  components: {
    TableDefault,
    //Layout,
  },
  data() {
    return {
      count: 0,
      tableConfig: tableConfigData,
      output: [],
      filtersConfig: [
        {
          id: 0,
          name: 'object_name',
          value: '',
          type: 'select',
          subtype: 'multiple',
          items: [],
          url: 'http://10.63.1.132:5000/get/pagination_list/object',
          bind: '',
          label: 'name',
          alias: 'p.object_id',
          page: 1,
        },
        //{
        //  id: 2,
        //  name: 'device',
        //  value: '',
        //  type: 'select',
        //  endpoint: '',
        //  bind: '',
        //  label: '',
        //},
        //{
        //  id: 3,
        //  name: 'checkbox',
        //  value: '',
        //  type: 'checkbox',
        //  endpoint: '',
        //  bind: '',
        //  label: 'Имеет бригадира',
        //},
        {
          id: 4,
          name: 'Date_range',
          value: '',
          type: 'date',
          subtype: 'range',
          endpoint: '',
          bind: '',
          label: 'Range',
          menu: false,
          alias: 'p.date_target',
        },
        {
          id: 5,
          name: 'date_target',
          value: '',
          type: 'date',
          subtype: 'single',
          endpoint: '',
          bind: '',
          label: 'Одиночная дата',
          menu: false,
          alias: 'p.date_target',
        },
        {
          id: 5,
          name: 'date_target',
          value: '',
          type: 'date',
          subtype: 'period',
          endpoint: '',
          bind: '',
          label: 'Одиночная дата',
          menu: false,
          alias: 'p.date_target',
        },
        //{
        //  id: 6,
        //  name: 'Period',
        //  value: '',
        //  type: 'Date',
        //  subtype: 'period',
        //  period: 'month',
        //  endpoint: '',
        //  bind: '',
        //  label: 'Период ( Месяц )',
        //  menu: false,
        //},
      ],
    }
  },
  methods: {
    initData() {
      //for (let i = 0  i < 20  i++) {

      //}
      this.employees.map((el) => (el.id = this.generateId()))
      //this.tableConfig.data = this.employees
      this.tableConfig.data.rows = this.employees.slice(0, 20)
      console.log(this.window)
      //this.tableConfig.data.map((el) => )
      const structuredArray = []
      this.tableConfig.data.rows.forEach((row) => {
        if (this.tableConfig.options.selecting) {
          Vue.set(row, 'selected', false)
        }
        structuredArray.push({
          row,
          child: {
            isShow: false,
            data: row,
          },
        })
      })
      this.tableConfig.data.rows = structuredArray
      //this.employees.forEach((row, rowIndex) => {
      //  output.push([])
      //  for(let i = 0  i < chunkSize  i++) {
      //    //output[i] = this.employees.slice(i*chunkSize, i*chunkSize+chunkSize)
      //    output[rowIndex].push([])
      //    if (i === 0) {
      //      output[rowIndex][0] = row
      //    }
      //    // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
      //  }
      //  this.tableConfig.data = output
      //})
      //for(let i = 0  i < chunkSize  i++) {
      //  //output[i] = this.employees.slice(i*chunkSize, i*chunkSize+chunkSize)
      //  output.push([])
      //  // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
      //}
    },
    generateId() {
      return 'id' + Math.random().toString(16).slice(2)
    },
    changeheadershow(options) {
      const { headerEl, value } = options

      headerEl.isShow = value
    },
  },
  async mounted() {
    console.log(TableDefault)
    //const data = await fetch(
    //  'http://10.63.1.132:5000/view/table/shop_request_magnit',
    //  {
    //    method: 'get',
    //    mode: 'same-origin',
    //    headers: {
    //      'Access-Control-Allow-Origin': '*',
    //      //'Content-Type': 'test/html', // 'Content-Type': 'application/x-www-form-urlencoded',
    //    },
    //  }
    //)
    //console.log(data)
    //this.initData()
  },
}
</script>
