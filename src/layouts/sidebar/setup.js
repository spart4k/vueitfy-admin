import { ref, computed } from 'vue'
import { useStore } from '@/store'
import useMobile from '../Adaptive/checkMob.js'

// import { navmenuApi } from '@/api'
// import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'dataNavbar',
  setup() {
    const dataNavbarHard = ref({
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
        link_active: false,
        navlink: [
          {
            id: 1,
            name: 'Логи',
            link: '/table',
            active: false,
          },
          {
            id: 2,
            name: 'Для ОБД',
            link: '/navbar',
            active: false,
          },
          {
            id: 3,
            name: 'Планнинг',
            link: '/navbar',
            active: false,
          },
          {
            id: 4,
            name: 'Штатное расписание',
            link: '/testform',
          },
          {
            name: 'Почта',
            link: '/mails',
          },
          {
            id: 5,
            name: 'Командировка',
            link: '/',
            active: false,
          },
          {
            id: 6,
            name: 'График',
            link: '/',
            active: false,
          },
          {
            id: 7,
            name: 'Аккаунт',
            link: '/',
            active: false,
          },
          {
            id: 9,
            name: 'Персонал',
            link: '/personal',
            active: false,
          },
          {
            id: 10,
            name: 'Документы',
            link: '/',
            active: false,
          },
          {
            id: 11,
            name: 'Назначения',
            link: '/appointments',
          },
          {
            id: 12,
            name: 'Импорт с Х5',
            link: '/',
          },
          {
            id: 13,
            name: 'Табель',
            link: '/',
          },
          {
            id: 14,
            name: 'Табель логистика',
            link: '/',
          },
          {
            id: 15,
            name: 'Штрафы/Ошибки',
            link: '/',
          },
          {
            id: 16,
            name: 'Начисления',
            link: '/paymentview',
          },
          {
            id: 17,
            name: 'Заявки на доп.услуги',
            link: '/',
          },
          {
            id: 18,
            name: 'Заявки магнитов',
            link: '/',
          },
          {
            id: 19,
            name: 'Табель магниты',
            link: '/',
          },
          {
            id: 20,
            name: 'Заявки на расход',
            link: '/',
          },
          {
            id: 21,
            name: 'Карта',
            link: '/',
          },
          {
            id: 22,
            name: 'Объекты',
            link: '/',
          },
          {
            id: 23,
            name: 'Проживание',
            link: '/',
          },
          {
            id: 24,
            name: 'Тарифы объектов',
            link: '/',
          },
          {
            id: 25,
            name: 'Офисы',
            link: '/',
          },
          {
            id: 26,
            name: 'Задачи',
            link: '/',
          },
          {
            id: 27,
            name: 'Инструкции',
            link: '/',
          },
        ],
      },
      Otchets: {
        active: false,
        id: 3,
        icon: '$IconOtchet',
        name: 'Отчеты',
        disclosure: true,
        link_active: false,
        navlink: [
          {
            id: 28,
            name: 'Задолжность',
            link: '/',
            active: false,
          },
          {
            id: 29,
            name: 'Банковские карты',
            link: '/',
          },
          {
            id: 30,
            name: 'Отчет "Магнит"',
            link: '/',
          },
          {
            id: 31,
            name: 'Ошибки',
            link: '/',
          },
          {
            id: 32,
            name: 'Взыскания',
            link: '/',
          },
          {
            id: 33,
            name: 'ТМЦ',
            link: '/',
          },
          {
            id: 34,
            name: 'Перемещения',
            link: '/',
          },
        ],
      },
      System: {
        active: false,
        id: 4,
        icon: '$IconSystem',
        name: 'Система',
        disclosure: true,
        link_active: false,
        navlink: [
          {
            id: 35,
            name: 'Представления',
            link: '/',
            active: false,
          },
          {
            id: 36,
            name: 'Панель навигации',
            link: '/',
          },
          {
            id: 37,
            name: 'Loggin',
            link: '/',
          },
          {
            id: 38,
            name: 'Менеджер файлов',
            link: '/',
          },
        ],
      },
      Graph: {
        id: 5,
        icon: '$IconGraphic',
        name: 'Графики',
        disclosure: true,
        active: false,
        link_active: false,
        navlink: [
          {
            id: 39,
            name: 'По сумме',
            link: '/',
            active: false,
          },
        ],
      },
      Spravochnik: {
        id: 6,
        icon: '$IconSetting',
        name: 'Настройки',
        disclosure: true,
        active: false,
        link_acrtive: false,
        navlink: [
          {
            id: 40,
            name: 'Расход категорий',
            link: '/',
            active: false,
          },
          {
            id: 41,
            name: 'Расход вид',
            link: '/',
          },
          {
            id: 42,
            name: 'Дисцип.Взыскания',
            link: '/',
          },
          {
            id: 43,
            name: 'Нагрузка',
            link: '/',
          },
          {
            id: 44,
            name: 'Статусы',
            link: '/',
          },
          {
            id: 45,
            name: 'Статьи расходов',
            link: '/',
          },
          {
            id: 46,
            name: 'Объекты',
            link: '/',
          },
          {
            id: 47,
            name: 'Банки',
            link: '/',
          },
          {
            id: 48,
            name: 'Должности',
            link: '/',
          },
          {
            id: 49,
            name: 'Каналы продвижения',
            link: '/',
          },
          {
            id: 50,
            name: 'Гражданство',
            link: '/',
          },
          {
            id: 51,
            name: 'Направления',
            link: '/',
          },
          {
            id: 52,
            name: 'Роли',
            link: '/',
          },
          {
            id: 53,
            name: 'Услуги',
            link: '/',
          },
          {
            id: 54,
            name: 'Ведомость вид',
            link: '/',
          },
          {
            id: 55,
            name: 'Кластеры',
            link: '/',
          },
          {
            id: 56,
            name: 'Регионы',
            link: '/',
          },
          {
            id: 57,
            name: 'Вимды задач',
            link: '/',
          },
          {
            id: 58,
            name: 'Ошибки системы',
            link: '/',
          },
          {
            id: 59,
            name: 'Ошибки ман-в',
            link: '/',
          },
        ],
      },
    })
    const store = useStore()
    const isOpenMenu = computed(() => store.state.navmenu)
    const isСollapseMenu = computed(() => store.state.collapse)
    const isMobile = useMobile()
    const navLinks = ref([])
    // const getNavLink = async () => {
    //   const dataNavbar = await navmenuApi.get()
    //   dataNavbar.forEach((el) => {
    //     console.log(el.child_json.length)
    //     if (el.child_json.length > 0) {
    //       el.child_json = JSON.parse(el.child_json)
    //     }
    //   })
    //   navLinks.value = dataNavbar
    // }

    //$route.name для получения ссылки акутиыной в юрл

    //console.log('navLinks', navLinks.value)

    const setNavmenu = () => {
      store.commit('setNavmenu', !isOpenMenu.value)
    }

    const collapseNavmenu = () => {
      store.commit('collapseNavmenu', !isСollapseMenu.value)
    }

    // onMounted(async () => {
    //   await getNavLink()
    // })

    const activeFold = () => {
      //console.log(dataNavbarHard[1].navLinks[1].active, 'хуй')
    }

    return {
      dataNavbarHard,
      isMobile,
      isOpenMenu,
      isСollapseMenu,
      store,
      activeFold,
      // getNavLink,
      navLinks,
      setNavmenu,
      collapseNavmenu,
    }
  },
}
