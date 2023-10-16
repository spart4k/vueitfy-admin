import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router/composables'
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
    const messages = ref(0)

    const pageName = computed(() => {
      let name = ''
      props.navData.forEach((item, index) => {
        if (item.link === route.path) {
          name = item.name
        } else if (item.child_json) {
          JSON?.parse(item?.child_json).forEach((navItem) => {
            if (navItem.link === route.path) name = navItem.name
          })
        }
      })
      return name
    })

    const store = useStore()
    const openMenu = computed(() => store?.state?.openMenu)

    const itemSecondMenu = ref({
      edit: {
        icon: '$IconEdit',
        color: 'primary',
        tooltip: 'Новое письмо',
      },
      phonebook: {
        icon: '$IconGuide',
        color: 'primary',
        tooltip: 'Справочник',
      },
      tech: {
        icon: '$IconTechSupport',
        color: 'primary',
        tooltip: 'Тех Поддержка',
      },
      exit: {
        icon: '$IconExit',
        color: 'error',
        tooltip: 'Выйти',
      },
    })

    const showNotification = () => {
      messages.value += 1
    }

    const setNavmenu = () => {
      store.commit('changeMenuStatus', !openMenu.value)
    }

    return {
      isMobile,
      messages,
      pageName,
      itemSecondMenu,

      showNotification,
      setNavmenu,
    }
  },
}
