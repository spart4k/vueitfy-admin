import { computed, defineComponent } from '@vue/composition-api'
//import { useStore } from '@/store'

import Nav from '@/layouts/sidebar/sidebar.vue'
import Topbar from '@/layouts/topbar/topbar.vue'
//import useMobile from '../Adaptive/checkMob.js'

//import useMenuMobile from '../Adaptive/CloseOpenMenu.js'
//import Alert from '@/components/Alert'

const layout = defineComponent({
  name: 'Layout',
  components: {
    //Alert,
    Nav,
    Topbar,
  },
  setup(_, ctx) {
    console.log(ctx)
    const isMobile = false
    const store = ctx.root.$store
    const isOpenMenu = computed(() => store.state.navmenu)

    //const el = ref()
    //const items = ref([
    //  { title: 'Главная', icon: 'mdi-cog', route: '/', group: true },
    //  { title: 'Города', icon: 'mdi-cog', route: '/cities', group: true },
    //  {
    //    title: 'Услуги',
    //    icon: 'mdi-cog',
    //    route: '/services',
    //    group: true,
    //  },
    //  {
    //    title: 'Специализации',
    //    icon: 'mdi-hard-hat',
    //    route: '/specializations',
    //    group: true,
    //  },
    //  {
    //    title: 'Клиенты',
    //    icon: 'mdi-cog',
    //    route: '/classes',
    //    group: true,
    //  },
    //  {
    //    title: 'Мастера',
    //    icon: 'mdi-cog',
    //    route: '/categories',
    //    group: true,
    //  },
    //  {
    //    title: 'Бронирование',
    //    icon: 'mdi-cog',
    //    route: '/categories',
    //    group: true,
    //  },
    //  {
    //    title: 'Расписание',
    //    icon: 'mdi-cog',
    //    route: '/categories',
    //    group: true,
    //  },
    //  { title: 'Жалобы', icon: 'mdi-cog', route: '/categories', group: true },
    //  { title: 'Счета', icon: 'mdi-cog', route: '/categories', group: true },
    //  {
    //    title: 'Уведомления',
    //    icon: 'mdi-cog',
    //    route: '/categories',
    //    group: true,
    //  },
    //])

    //console.log('items')
    //console.log(items)

    //const username = () => {
    //  el.$store.state.auth.user
    //}

    //const logout = () => {
    //  el.$store.dispatch('auth/logout')
    //  el.$router.push('/login')
    //}
    return {
      //items,
      //username,
      //logout,
      isMobile,
      isOpenMenu,
    }
  },
})
export default layout