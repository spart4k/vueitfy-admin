import { ref, computed } from 'vue'
import { useStore } from '@/store'
import useMobile from '../Adaptive/checkMob.js'
// import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'topBar',
  setup() {
    const isMobile = useMobile()
    //const isOpenMenu = useMenuMobile()
    const messages = ref(0)
    const search = ref('')

    const store = useStore()
    const isOpenMenu = computed(() => store.state.navmenu)

    const itemSecondMenu = ref({
      edit: {
        icon: '$IconEdit',
        color: '#109CF1',
        tooltip: 'Новое письмо',
      },
      phonebook: {
        icon: '$IconGuide',
        color: '#109CF1',
        tooltip: 'Справочник',
      },
      tech: {
        icon: '$IconTechSupport',
        color: '#109CF1',
        tooltip: 'Тех Поддержка',
      },
      exit: {
        icon: '$IconExit',
        color: '#F7685B',
        tooltip: 'Выйти',
      },
    })

    const setNavmenu = () => {
      store.commit('setNavmenu', !isOpenMenu.value)
    }

    return {
      isMobile,
      messages,
      search,
      itemSecondMenu,
      isOpenMenu,
      setNavmenu,
    }
  },
}
