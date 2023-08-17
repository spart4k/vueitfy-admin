<template>
  <div class="about">
    <h1>This is an about page1</h1>
   <div class="">
     <TableDefault @changeheadershow="changeheadershow" :options="tableConfig"/>
   </div>
  </div>
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
      function: searchInputing
    },
    headerFixed: true
  },
  panel: {
    buttons: [
      {
        label: "Обновить",
        class: ['v-table-button--custom'],
        urlIcon: 'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/modify-icon.png',
        function: consolePanel,
        backgroundColor: '#ffffff'
      },
      {
        label: 'Добавить',
        class: ['v-table-button--custom'],
        urlIcon: 'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/modify-icon.png',
        function: consolePanel,
        backgroundColor: '#fff'
      },
      {
        label: 'Скачать',
        class: ['v-table-button--custom'],
        function: consolePanel,
        backgroundColor: '#fff'
      }
    ]
  },
  head: [
    {
      title: 'Сотрудник',
      type: 'default',
      align: 'center',
      fixed: true,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '5%',
      value: 'employee',
      search: {
        field: ''
      }
    },
    {
      title: 'Отдел',
      type: 'default',
      align: 'center',
      fixed: true,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '5%',
      value: 'department',
      search: {
        field: ''
      }
    },
    {
      title: 'Ставка',
      type: 'default',
      align: 'left',
      fixed: false,
      sorts: [
        {
          type: 'number',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '5%',
      value: 'cost',
      search: {
        field: ''
      }
    },
    {
      title: 'Дата принятие',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'date',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '20%',
      value: 'date',
      search: {
        field: ''
      }
    },
    {
      title: 'Образование',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '10%',
      value: 'universe',
      search: {
        field: ''
      }
    },
    {
      title: 'Автомобиль',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '10%',
      value: 'car',
      search: {
        field: ''
      }
    },
    {
      title: 'universe1',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '10%',
      value: 'universe1',
      search: {
        field: ''
      }
    },
    {
      title: 'universe2',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '10%',
      value: 'universe2',
      search: {
        field: ''
      }
    },
    {
      title: 'universe3',
      type: 'default',
      align: 'center',
      fixed: false,
      sorts: [
        {
          type: 'string',
          default: 'asc',
          value: undefined,
          isShow: false,
        }
      ],
      isShow: true,
      width: '100px',
      value: 'universe3',
      search: {
        field: ''
      }
    },
    {
      title: 'Действия',
      type: 'actions',
      align: 'center',
      fixed: false,
      isShow: true,
      width: '100px',
      value: 'actions',
      actions: [
        {
          type: 'button',
          urlIcon: 'https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/modify-icon.png',
          function: consoleText,
          label: 'Редактировать'
        },
        {
          type: 'button',
          urlIcon: 'https://icons.veryicon.com/png/o/miscellaneous/operation-scenarios-menu-overview/action-delete-2.png',
          function: consoleButton,
          label: 'Удалить'
        }
      ]
    },
  ],
  data: {
    rows: [],
    totalRows: null,
    pageLength: null,
    currentPage: null,
    totalPages: null
  }
}

import Vue from 'vue'
import TableDefault from "@/components/Table/default/index.vue";

export default {
  name: "Table-View",

  components: {
    TableDefault,
  },
  data() {
    return {
      count: 0,
      tableConfig: tableConfigData,
      employees: [
        { employee: "Иван Иванов", department: "Отдел продаж", cost: 2000, date: new Date("2021-01-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анна Смирнова", department: "Отдел маркетинга", cost: 2500, date: new Date("2020-12-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Петр Петров", department: "Отдел разработки", cost: 3000, date: new Date("2021-02-28"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Елена Ковалева", department: "Отдел кадров", cost: 2200, date: new Date("2021-03-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алексей Соколов", department: "Отдел продаж", cost: 2100, date: new Date("2020-11-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Мария Васильева", department: "Отдел маркетинга", cost: 2400, date: new Date("2021-04-08"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Сергей Игнатьев", department: "Отдел разработки", cost: 3200, date: new Date("2021-02-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анастасия Зайцева", department: "Отдел кадров", cost: 2300, date: new Date("2020-10-05"), car: "A123BC", universe: "Высшее образование", univers1: "Высшее образование", univers2: 'univers1123132', univers3: 'univers451' },
        { employee: "Дмитрий Морозов", department: "Отдел продаж", cost: 2050, date: new Date("2021-01-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Екатерина Соловьева", department: "Отдел маркетинга", cost: 2600, date: new Date("2020-09-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Артем Федоров", department: "Отдел разработки", cost: 2800, date: new Date("2021-03-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Ольга Ефимова", department: "Отдел кадров", cost: 2150, date: new Date("2021-04-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Александра Кузнецова", department: "Отдел продаж", cost: 2250, date: new Date("2020-08-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Игорь Сорокин", department: "Отдел маркетинга", cost: 2450, date: new Date("2020-11-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Максим Костин", department: "Отдел разработки", cost: 3300, date: new Date("2021-02-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Дарья Яковлева", department: "Отдел кадров", cost: 2350, date: new Date("2020-12-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Кирилл Макаров", department: "Отдел продаж", cost: 1950, date: new Date("2021-03-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алиса Николаева", department: "Отдел маркетинга", cost: 2700, date: new Date("2020-10-20"), car: "A123BC", universe: "Высшее образование" , universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451'},
        { employee: "Роман Орлов", department: "Отдел разработки", cost: 2900, date: new Date("2021-01-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Галина Андреева", department: "Отдел кадров", cost: 2300, date: new Date("2021-04-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Иван Иванов", department: "Отдел продаж", cost: 2000, date: new Date("2021-01-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анна Смирнова", department: "Отдел маркетинга", cost: 2500, date: new Date("2020-12-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Петр Петров", department: "Отдел разработки", cost: 3000, date: new Date("2021-02-28"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Елена Ковалева", department: "Отдел кадров", cost: 2200, date: new Date("2021-03-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алексей Соколов", department: "Отдел продаж", cost: 2100, date: new Date("2020-11-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Мария Васильева", department: "Отдел маркетинга", cost: 2400, date: new Date("2021-04-08"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Сергей Игнатьев", department: "Отдел разработки", cost: 3200, date: new Date("2021-02-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анастасия Зайцева", department: "Отдел кадров", cost: 2300, date: new Date("2020-10-05"), car: "A123BC", universe: "Высшее образование", univers1: "Высшее образование", univers2: 'univers1123132', univers3: 'univers451' },
        { employee: "Дмитрий Морозов", department: "Отдел продаж", cost: 2050, date: new Date("2021-01-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Екатерина Соловьева", department: "Отдел маркетинга", cost: 2600, date: new Date("2020-09-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Артем Федоров", department: "Отдел разработки", cost: 2800, date: new Date("2021-03-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Ольга Ефимова", department: "Отдел кадров", cost: 2150, date: new Date("2021-04-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Александра Кузнецова", department: "Отдел продаж", cost: 2250, date: new Date("2020-08-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Игорь Сорокин", department: "Отдел маркетинга", cost: 2450, date: new Date("2020-11-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Максим Костин", department: "Отдел разработки", cost: 3300, date: new Date("2021-02-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Дарья Яковлева", department: "Отдел кадров", cost: 2350, date: new Date("2020-12-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Кирилл Макаров", department: "Отдел продаж", cost: 1950, date: new Date("2021-03-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алиса Николаева", department: "Отдел маркетинга", cost: 2700, date: new Date("2020-10-20"), car: "A123BC", universe: "Высшее образование" , universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451'},
        { employee: "Роман Орлов", department: "Отдел разработки", cost: 2900, date: new Date("2021-01-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Галина Андреева", department: "Отдел кадров", cost: 2300, date: new Date("2021-04-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Иван Иванов", department: "Отдел продаж", cost: 2000, date: new Date("2021-01-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анна Смирнова", department: "Отдел маркетинга", cost: 2500, date: new Date("2020-12-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Петр Петров", department: "Отдел разработки", cost: 3000, date: new Date("2021-02-28"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Елена Ковалева", department: "Отдел кадров", cost: 2200, date: new Date("2021-03-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алексей Соколов", department: "Отдел продаж", cost: 2100, date: new Date("2020-11-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Мария Васильева", department: "Отдел маркетинга", cost: 2400, date: new Date("2021-04-08"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Сергей Игнатьев", department: "Отдел разработки", cost: 3200, date: new Date("2021-02-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анастасия Зайцева", department: "Отдел кадров", cost: 2300, date: new Date("2020-10-05"), car: "A123BC", universe: "Высшее образование", univers1: "Высшее образование", univers2: 'univers1123132', univers3: 'univers451' },
        { employee: "Дмитрий Морозов", department: "Отдел продаж", cost: 2050, date: new Date("2021-01-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Екатерина Соловьева", department: "Отдел маркетинга", cost: 2600, date: new Date("2020-09-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Артем Федоров", department: "Отдел разработки", cost: 2800, date: new Date("2021-03-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Ольга Ефимова", department: "Отдел кадров", cost: 2150, date: new Date("2021-04-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Александра Кузнецова", department: "Отдел продаж", cost: 2250, date: new Date("2020-08-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Игорь Сорокин", department: "Отдел маркетинга", cost: 2450, date: new Date("2020-11-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Максим Костин", department: "Отдел разработки", cost: 3300, date: new Date("2021-02-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Дарья Яковлева", department: "Отдел кадров", cost: 2350, date: new Date("2020-12-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Кирилл Макаров", department: "Отдел продаж", cost: 1950, date: new Date("2021-03-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алиса Николаева", department: "Отдел маркетинга", cost: 2700, date: new Date("2020-10-20"), car: "A123BC", universe: "Высшее образование" , universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451'},
        { employee: "Роман Орлов", department: "Отдел разработки", cost: 2900, date: new Date("2021-01-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Галина Андреева", department: "Отдел кадров", cost: 2300, date: new Date("2021-04-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Иван Иванов", department: "Отдел продаж", cost: 2000, date: new Date("2021-01-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анна Смирнова", department: "Отдел маркетинга", cost: 2500, date: new Date("2020-12-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Петр Петров", department: "Отдел разработки", cost: 3000, date: new Date("2021-02-28"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Елена Ковалева", department: "Отдел кадров", cost: 2200, date: new Date("2021-03-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алексей Соколов", department: "Отдел продаж", cost: 2100, date: new Date("2020-11-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Мария Васильева", department: "Отдел маркетинга", cost: 2400, date: new Date("2021-04-08"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Сергей Игнатьев", department: "Отдел разработки", cost: 3200, date: new Date("2021-02-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Анастасия Зайцева", department: "Отдел кадров", cost: 2300, date: new Date("2020-10-05"), car: "A123BC", universe: "Высшее образование", univers1: "Высшее образование", univers2: 'univers1123132', univers3: 'univers451' },
        { employee: "Дмитрий Морозов", department: "Отдел продаж", cost: 2050, date: new Date("2021-01-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Екатерина Соловьева", department: "Отдел маркетинга", cost: 2600, date: new Date("2020-09-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Артем Федоров", department: "Отдел разработки", cost: 2800, date: new Date("2021-03-20"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Ольга Ефимова", department: "Отдел кадров", cost: 2150, date: new Date("2021-04-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Александра Кузнецова", department: "Отдел продаж", cost: 2250, date: new Date("2020-08-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Игорь Сорокин", department: "Отдел маркетинга", cost: 2450, date: new Date("2020-11-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Максим Костин", department: "Отдел разработки", cost: 3300, date: new Date("2021-02-15"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Дарья Яковлева", department: "Отдел кадров", cost: 2350, date: new Date("2020-12-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Кирилл Макаров", department: "Отдел продаж", cost: 1950, date: new Date("2021-03-01"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Алиса Николаева", department: "Отдел маркетинга", cost: 2700, date: new Date("2020-10-20"), car: "A123BC", universe: "Высшее образование" , universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451'},
        { employee: "Роман Орлов", department: "Отдел разработки", cost: 2900, date: new Date("2021-01-05"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
        { employee: "Галина Андреева", department: "Отдел кадров", cost: 2300, date: new Date("2021-04-10"), car: "A123BC", universe: "Высшее образование", universe1: "Высшее образование", universe2: 'universe1123132', universe3: 'universe451' },
      ],
      output: []
    }
  },
  methods: {
    initData() {
      //for (let i = 0; i < 20; i++) {

      //}
      this.employees.map((el) => el.id = this.generateId())
      //this.tableConfig.data = this.employees
      this.tableConfig.data.rows = this.employees.slice(0, 20)
      console.log(this.window)
      //this.tableConfig.data.map((el) => )
      const structuredArray = []
      this.tableConfig.data.rows.forEach((row) => {
        if (this.tableConfig.options.selecting) {
          Vue.set(row, 'selected', false);
        }
        structuredArray.push({
          row,
          child: {
            isShow: false,
            data: row
          }
        })
      })
      this.tableConfig.data.rows = structuredArray
      //this.employees.forEach((row, rowIndex) => {
      //  output.push([])
      //  for(let i = 0; i < chunkSize; i++) {
      //    //output[i] = this.employees.slice(i*chunkSize, i*chunkSize+chunkSize);
      //    output[rowIndex].push([])
      //    if (i === 0) {
      //      output[rowIndex][0] = row
      //    }
      //    // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
      //  }
      //  this.tableConfig.data = output
      //})
      //for(let i = 0; i < chunkSize; i++) {
      //  //output[i] = this.employees.slice(i*chunkSize, i*chunkSize+chunkSize);
      //  output.push([])
      //  // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
      //}
    },
    generateId() {
      return "id" + Math.random().toString(16).slice(2)
    },
    changeheadershow(options) {
      const { headerEl, value } = options

      headerEl.isShow = value
    },
  },
  mounted() {
    console.log(TableDefault)
    this.initData()
  }
};
</script>
