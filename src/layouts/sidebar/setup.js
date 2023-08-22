import { ref } from 'vue'

export default {
  name: 'dataNavbar',
  setup() {
    const dataNavbar = ref({
      MainTable: {
        id: 1,
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.66667 15V9.67442C5.66667 9.18422 6.08453 8.78683 6.6 8.78683H9.4C9.91547 8.78683 10.3333 9.18422 10.3333 9.67442V15M7.45911 1.16424L1.39244 5.26691C1.14623 5.43341 1 5.70295 1 5.99026V13.6686C1 14.4039 1.6268 15 2.4 15H13.6C14.3732 15 15 14.4039 15 13.6686V5.99026C15 5.70295 14.8538 5.43341 14.6076 5.26691L8.54089 1.16425C8.21706 0.945252 7.78294 0.945251 7.45911 1.16424Z" stroke="currentColor" stroke-linecap="round"/></svg>`,
        name: 'Основные таблицы',
        navlink: [
          {
            id: 1,
            name: 'Логи',
            link: '',
          },
          {
            id: 2,
            name: 'Для ОБД',
            link: '',
          },
          {
            id: 3,
            name: 'Планнинг',
            link: '',
          },
          {
            id: 4,
            name: 'Штатное расписание',
            link: '',
          },
          {
            id: 5,
            name: 'Командировка',
            link: '',
          },
          {
            id: 6,
            name: 'График',
            link: '',
          },
          {
            id: 7,
            name: 'Аккаунт',
            link: '',
          },
          {
            id: 8,
            name: 'Персонал',
            link: '',
          },
          {
            id: 9,
            name: 'Персонал',
            link: '',
          },
          {
            id: 10,
            name: 'Документы',
            link: '',
          },
          {
            id: 11,
            name: 'Назначения',
            link: '',
          },
          {
            id: 12,
            name: 'Импорт с Х5',
            link: '',
          },
          {
            id: 13,
            name: 'Табель',
            link: '',
          },
          {
            id: 14,
            name: 'Табель логистика',
            link: '',
          },
          {
            id: 15,
            name: 'Штрафы/Ошибки',
            link: '',
          },
          {
            id: 16,
            name: 'Начисления',
            link: '',
          },
          {
            id: 17,
            name: 'Заявки на доп.услуги',
            link: '',
          },
          {
            id: 18,
            name: 'Заявки магнитов',
            link: '',
          },
          {
            id: 19,
            name: 'Табель магниты',
            link: '',
          },
          {
            id: 20,
            name: 'Заявки на расход',
            link: '',
          },
          {
            id: 21,
            name: 'Карта',
            link: '',
          },
          {
            id: 22,
            name: 'Объекты',
            link: '',
          },
          {
            id: 23,
            name: 'Проживание',
            link: '',
          },
          {
            id: 24,
            name: 'Тарифы объектов',
            link: '',
          },
          {
            id: 25,
            name: 'Офисы',
            link: '',
          },
          {
            id: 26,
            name: 'Задачи',
            link: '',
          },
          {
            id: 27,
            name: 'Инструкции',
            link: '',
          },
        ],
      },
      Otchets: {
        isOpen: false,
        id: 2,
        icon: '',
        name: 'Отчеты',
        navlink: [
          {
            id: 28,
            name: 'Задолжность',
            link: '',
          },
          {
            id: 29,
            name: 'Банковские карты',
            link: '',
          },
          {
            id: 30,
            name: 'Отчет "Магнит"',
            link: '',
          },
          {
            id: 31,
            name: 'Ошибки',
            link: '',
          },
          {
            id: 32,
            name: 'Взыскания',
            link: '',
          },
          {
            id: 33,
            name: 'ТМЦ',
            link: '',
          },
          {
            id: 34,
            name: 'Перемещения',
            link: '',
          },
        ],
      },
      System: {
        isOpen: false,
        id: 3,
        icon: '',
        name: 'Система',
        navlink: [
          {
            id: 35,
            name: 'Представления',
            link: '',
          },
          {
            id: 36,
            name: 'Панель навигации',
            link: '',
          },
          {
            id: 37,
            name: 'Loggin',
            link: '',
          },
          {
            id: 38,
            name: 'Менеджер файлов',
            link: '',
          },
        ],
      },
      Graph: {
        id: 4,
        icon: '',
        name: 'Графики',
        isOpen: false,
        navlink: [
          {
            id: 39,
            name: 'По сумме',
            link: '',
          },
        ],
      },
      Spravochnik: {
        id: 5,
        icon: '',
        name: 'Настройки',
        isOpen: false,
        navlink: [
          {
            id: 40,
            name: 'Расход категорий',
            link: '',
          },
          {
            id: 41,
            name: 'Расход вид',
            link: '',
          },
          {
            id: 42,
            name: 'Дисцип.Взыскания',
            link: '',
          },
          {
            id: 43,
            name: 'Нагрузка',
            link: '',
          },
          {
            id: 44,
            name: 'Статусы',
            link: '',
          },
          {
            id: 45,
            name: 'Статьи расходов',
            link: '',
          },
          {
            id: 46,
            name: 'Объекты',
            link: '',
          },
          {
            id: 47,
            name: 'Банки',
            link: '',
          },
          {
            id: 48,
            name: 'Должности',
            link: '',
          },
          {
            id: 49,
            name: 'Каналы продвижения',
            link: '',
          },
          {
            id: 50,
            name: 'Гражданство',
            link: '',
          },
          {
            id: 51,
            name: 'Направления',
            link: '',
          },
          {
            id: 52,
            name: ['Роли'],
            link: [''],
          },
          {
            id: 53,
            name: 'Услуги',
            link: '',
          },
          {
            id: 54,
            name: 'Ведомость вид',
            link: '',
          },
          {
            id: 55,
            name: 'Кластеры',
            link: '',
          },
          {
            id: 56,
            name: 'Регионы',
            link: '',
          },
          {
            id: 57,
            name: 'Вимды задач',
            link: '',
          },
          {
            id: 58,
            name: 'Ошибки системы',
            link: '',
          },
          {
            id: 59,
            name: 'Ошибки ман-в',
            link: '',
          },
        ],
      },
    })

    const testRef = ref(false)
    const Huy = (el) => {
      el.isOpen = true
      console.log(!el.isOpen)
    }
    return {
      dataNavbar,

      testRef,
      Huy,
    }
  },
}
