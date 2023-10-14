import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import useMobile from '../Adaptive/checkMob.js'

// import { navmenuApi } from '@/api'
// import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'dataNavbar',
  setup() {
    const router = useRouter()
    const dataNavbar = ref([
      {
        icon: `$IconMain`,
        name: 'Главная',
        link: '/main',
      },
      {
        icon: `$IconTable`,
        name: 'Основные таблицы',
        navlink: [
          {
            name: 'Логи',
            link: '/table',
          },
          {
            name: 'Для ОБД',
            link: '/navbar',
          },
          {
            name: 'Планнинг',
            link: '/navbar',
          },
          {
            name: 'Штатное расписание',
            link: '/testform',
          },
          {
            name: 'Почта',
            link: '/mails',
          },
          {
            name: 'Командировка',
            link: '/',
          },
          {
            name: 'График',
            link: '/',
          },
          {
            name: 'Аккаунт',
            link: '/',
          },
          {
            name: 'Персонал',
            link: '/personal',
          },
          {
            name: 'Документы',
            link: '/',
          },
          {
            name: 'Назначения',
            link: '/appointments',
          },
          {
            name: 'Импорт с Х5',
            link: '/',
          },
          {
            name: 'Табель',
            link: '/',
          },
          {
            name: 'Табель логистика',
            link: '/',
          },
          {
            name: 'Штрафы/Ошибки',
            link: '/',
          },
          {
            name: 'Начисления',
            link: '/paymentview',
          },
          {
            name: 'Заявки на доп.услуги',
            link: '/',
          },
          {
            name: 'Заявки магнитов',
            link: '/shop-request-magnit',
          },
          {
            name: 'Табель магниты',
            link: '/',
          },
          {
            name: 'Заявки на расход',
            link: '/',
          },
          {
            name: 'Карта',
            link: '/',
          },
          {
            name: 'Объекты',
            link: '/',
          },
          {
            name: 'Проживание',
            link: '/',
          },
          {
            name: 'Тарифы объектов',
            link: '/',
          },
          {
            name: 'Офисы',
            link: '/',
          },
          {
            name: 'Задачи',
            link: '/tasks',
          },
          {
            name: 'Инструкции',
            link: '/',
          },
          {
            name: 'Личные ключи',
            link: '/user-keys',
          },
        ],
      },
      {
        icon: '$IconOtchet',
        name: 'Отчеты',
        navlink: [
          {
            name: 'Задолжность',
            link: '/',
          },
          {
            name: 'Банковские карты',
            link: '/',
          },
          {
            name: 'Отчет "Магнит"',
            link: '/shop-request-magnit-report',
          },
          {
            name: 'Ошибки',
            link: '/',
          },
          {
            name: 'Взыскания',
            link: '/',
          },
          {
            name: 'ТМЦ',
            link: '/',
          },
          {
            name: 'Перемещения',
            link: '/',
          },
        ],
      },
      {
        icon: '$IconSystem',
        name: 'Система',
        navlink: [
          {
            name: 'Представления',
            link: '/',
          },
          {
            name: 'Панель навигации',
            link: '/',
          },
          {
            name: 'Loggin',
            link: '/',
          },
          {
            name: 'Менеджер файлов',
            link: '/',
          },
        ],
      },
      {
        icon: '$IconGraphic',
        name: 'Графики',
        navlink: [
          {
            name: 'По сумме',
            link: '/',
          },
        ],
      },
      {
        icon: '$IconSetting',
        name: 'Настройки',
        navlink: [
          {
            name: 'Расход категорий',
            link: '/',
          },
          {
            name: 'Расход вид',
            link: '/',
          },
          {
            name: 'Дисцип.Взыскания',
            link: '/',
          },
          {
            name: 'Нагрузка',
            link: '/',
          },
          {
            name: 'Статусы',
            link: '/',
          },
          {
            name: 'Статьи расходов',
            link: '/',
          },
          {
            name: 'Объекты',
            link: '/',
          },
          {
            name: 'Банки',
            link: '/',
          },
          {
            name: 'Должности',
            link: '/',
          },
          {
            name: 'Каналы продвижения',
            link: '/',
          },
          {
            name: 'Гражданство',
            link: '/',
          },
          {
            name: 'Направления',
            link: '/',
          },
          {
            name: 'Роли',
            link: '/',
          },
          {
            name: 'Услуги',
            link: '/',
          },
          {
            name: 'Ведомость вид',
            link: '/',
          },
          {
            name: 'Кластеры',
            link: '/',
          },
          {
            name: 'Регионы',
            link: '/',
          },
          {
            name: 'Вимды задач',
            link: '/',
          },
          {
            name: 'Ошибки системы',
            link: '/',
          },
          {
            name: 'Ошибки ман-в',
            link: '/',
          },
        ],
      },
    ])
    const store = useStore()
    const isMobile = useMobile()
    const openMenu = computed(() => store?.state?.openMenu)
    const miniMenu = computed(() => store?.state?.miniMenu)

    window.addEventListener('click', ($event) => {
      if ($event.target.className === 'v-overlay__scrim') {
        store.commit('changeMenuStatus', false)
      }
    })

    const setRouterPath = (val) => {
      if (val) router.push(val).catch(() => {})
    }

    const changeMenuStatus = () => {
      store.commit('changeMenuStatus', !openMenu.value)
    }

    const changeMenuSize = () => {
      store.commit('changeMenuSize', !miniMenu.value)
    }

    watch(
      () => isMobile.value,
      () => {
        if (isMobile.value) {
          store.commit('changeMenuStatus', false)
          store.commit('changeMenuSize', false)
        } else if (!isMobile.value) {
          store.commit('changeMenuStatus', true)
          store.commit('changeMenuSize', false)
        }
      }
    )

    onMounted(() => {
      if (isMobile.value) {
        store.commit('changeMenuStatus', false)
        store.commit('changeMenuSize', false)
      }
    })

    return {
      dataNavbar,
      isMobile,
      store,

      openMenu,
      miniMenu,
      changeMenuStatus,
      changeMenuSize,
      setRouterPath,
    }
  },
}
