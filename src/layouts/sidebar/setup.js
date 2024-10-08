import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import useMobile from '../Adaptive/checkMob.js'
import { version } from '@/../package.json'

// import { navmenuApi } from '@/api'
// import useMenuMobile from '../Adaptive/CloseOpenMenu.js'

export default {
  name: 'dataNavbar',
  props: {
    navData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const navbarCurrentRoute = ref([])
    const instantNav = ref(false)
    const isMobile = useMobile()
    const isMobileDevice = useMobile()
    const openMenu = computed(() => store?.state?.openMenu)
    const miniMenu = computed(() => store?.state?.miniMenu)
    // const version = process.env.npm_package_version
    // Then we set the value in the --vh custom property to the root of the document

    const setRouterPath = (val) => {
      if (val) router.push(val).catch(() => {})
    }

    const changeMenuStatus = () => {
      store.commit('changeMenuStatus', !openMenu.value)
    }

    const changeMenuSize = () => {
      store.commit('changeMenuSize', !miniMenu.value)
      if (!miniMenu) openCurrentRoute()
    }

    window.addEventListener('click', ($event) => {
      if ($event.target.className === 'v-overlay__scrim' && openMenu.value) {
        // store.commit('changeMenuStatus', false)
      }
    })

    const userInfo = computed(() => store.state.user)

    const openCurrentRoute = () => {
      navbarCurrentRoute.value = []
      instantNav.value = true
      props.navData.forEach((item, index) => {
        if (item.child) {
          item?.child.forEach((navItem) => {
            if (navItem.link === route.path)
              navbarCurrentRoute.value.push(index)
          })
        }
      })
      setTimeout(() => {
        instantNav.value = false
      }, 0)
    }

    onMounted(() => {
      if (isMobile.value) {
        store.commit('changeMenuStatus', false)
        store.commit('changeMenuSize', false)
      } else if (!isMobile.value) {
        store.commit('changeMenuStatus', true)
        store.commit('changeMenuSize', false)
      }
      openCurrentRoute()
    })

    return {
      navbarCurrentRoute,
      isMobile,
      isMobileDevice,
      store,
      instantNav,

      openMenu,
      miniMenu,
      openCurrentRoute,
      changeMenuStatus,
      changeMenuSize,
      setRouterPath,
      userInfo,
      version,
    }
  },
}
