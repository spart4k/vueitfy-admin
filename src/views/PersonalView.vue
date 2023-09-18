<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in tabs" :key="item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="(item, tabIndex) in tabs" :key="item">
        <TableDefault
          :key="tabIndex"
          @changeheadershow="changeheadershow"
          :options="tableConfig"
          :filtersConfig="filtersConfig"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
  <!--</Layout>-->
</template>

<script>
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

const tableConfigData = {
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
      tabs: [
        {
          name: 'Основные',
        },
        {
          name: 'Пассив',
        },
        {
          name: 'Архив',
        },
        {
          name: 'На добавлении',
        },
        {
          name: 'Перемещения',
        },
        {
          name: 'Личные ключи',
        },
      ],
      activeTab: null,
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
