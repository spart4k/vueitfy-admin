import { ref } from 'vue'
import useMobile from '../Adaptive/checkMob.js'
import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'dataNavbar',
  setup() {
    const isOpenMenu = useMenuMobile()

    const dataNavbar = ref({
      Home: {
        id: 1,
        icon: `$IconMain`,
        name: 'Главная',
        link: '/main',
        disclosure: false,
      },
      MainTable: {
        id: 2,
        icon: `$IconTable`,
        name: 'Основные таблицы',
        active: false,
        disclosure: true,
        navlink: [
          {
            id: 1,
            name: 'Логи',
            link: '/table',
          },
          {
            id: 2,
            name: 'Для ОБД',
            link: '/navbar',
          },
          {
            id: 3,
            name: 'Планнинг',
            link: '/navbar',
          },
          {
            id: 4,
            name: 'Штатное расписание',
            link: '/',
          },
          {
            id: 5,
            name: 'Командировка',
            link: '/',
          },
          {
            id: 6,
            name: 'График',
            link: '/',
          },
          {
            id: 7,
            name: 'Аккаунт',
            link: '/',
          },
          {
            id: 8,
            name: 'Персонал',
            link: '/',
          },
          {
            id: 9,
            name: 'Персонал',
            link: '/',
          },
          {
            id: 10,
            name: 'Документы',
            link: '/',
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
        active: false,
        id: 3,
        icon: '$IconOtchet',
        name: 'Отчеты',
        disclosure: true,
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
        active: false,
        id: 4,
        icon: '$IconSystem',
        name: 'Система',
        disclosure: true,
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
        id: 5,
        icon: '$IconGraphic',
        name: 'Графики',
        disclosure: true,
        active: false,
        navlink: [
          {
            id: 39,
            name: 'По сумме',
            link: '',
          },
        ],
      },
      Spravochnik: {
        id: 6,
        icon: '$IconSetting',
        name: 'Настройки',
        disclosure: true,
        active: false,
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

    const Huy = (el) => {
      console.log(el)
      el.active = !el.active
      console.log('el after', el.active)
    }

    const activeLink = (id) => {
      // var allLink = document.querySelectorAll('.navlink__item')
      // console.log('allLink', allLink)
      // allLink.classList.remove('.activeLink')
      // var link = document.getElementById(`navlink__${id}`)
      // console.log('link', link)
      // link.classList.add('activeLink')
      console.log(id)
    }

    const isMobile = useMobile()

    return {
      dataNavbar,
      Huy,
      activeLink,
      isMobile,
      isOpenMenu,
    }
  },
}
