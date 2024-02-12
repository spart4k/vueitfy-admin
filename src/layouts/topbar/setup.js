import { ref, computed, watch, getCurrentInstance } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import useMobile from '../Adaptive/checkMob.js'
// import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'topBar',
  props: {
    navData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const isMobile = useMobile()
    const route = useRoute()
    const router = useRouter()
    const messages = ref(0)
    const { $vuetify } = getCurrentInstance().proxy

    const pageName = computed(() => {
      let name = 'CRM'
      props.navData.forEach((item, index) => {
        if (route?.matched?.[0]?.path === item.link) {
          name = item.name
        } else if (item.child) {
          item?.child.forEach((navItem) => {
            if (route?.matched?.[0]?.path === navItem.link) name = navItem.name
          })
        }
      })
      return name
    })

    const store = useStore()
    const openMenu = computed(() => store?.state?.openMenu)
    const miniMenu = computed(() => store?.state?.miniMenu)
    const logout = async () => {
      console.log('logout')
      await store.dispatch('auth/logout')
      store.commit('auth/setToken', '')
      router.push('/login')
    }
    const itemSecondMenu = ref({
      // edit: {
      //   icon: '$IconEdit',
      //   color: 'primary',
      //   tooltip: 'Новое письмо',
      // },
      // phonebook: {
      //   icon: '$IconGuide',
      //   color: 'primary',
      //   tooltip: 'Справочник',
      // },
      // tech: {
      //   icon: '$IconTechSupport',
      //   color: 'primary',
      //   tooltip: 'Тех Поддержка',
      // },
      exit: {
        icon: '$IconExit',
        color: 'error',
        tooltip: 'Выйти',
        action: logout,
      },
    })

    const showNotification = () => {
      messages.value += 1
    }

    const setNavmenu = () => {
      store.commit('changeMenuStatus', !openMenu.value)
    }

    watch(
      () => $vuetify.theme.dark,
      () => {
        localStorage.setItem('darkTheme', $vuetify.theme.dark)
      }
    )

    return {
      isMobile,
      messages,
      openMenu,
      miniMenu,
      pageName,
      itemSecondMenu,

      showNotification,
      setNavmenu,
      logout,
    }
  },
}
