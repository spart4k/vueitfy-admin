import Vue, { ref, onMounted } from 'vue'
import { useStore } from '@/store'

import Sidebar from '@/layouts/sidebar/sidebar.vue'
import Topbar from '@/layouts/topbar/topbar.vue'
import useMobile from '../Adaptive/checkMob.js'

//import useMenuMobile from '../Adaptive/CloseOpenMenu.js'
//import Alert from '@/components/Alert'

export default {
  name: 'Layout',
  components: {
    //Alert,
    Sidebar,
    Topbar,
  },
  setup() {
    const isMobile = useMobile()
    const store = useStore()
    const navData = ref()

    onMounted(async () => {
      const account = await store.dispatch('auth/checkMe')
      console.log(account)
      navData.value = await store.dispatch('navmenu/getNavmenu')
      console.log(navData.value)
    })

    return {
      navData,
      isMobile,
    }
  },
}
