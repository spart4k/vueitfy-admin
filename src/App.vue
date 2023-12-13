<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <Notifier />
    <portal-target name="filter" />
    <portal-target name="table-detail" />
    <portal-target name="table-detail2" />
  </v-app>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import BlankLayout from '@/layouts/default/index.vue'
import LoginLayout from '@/layouts/login'
import Notifier from '@/components/notifies'

export default {
  name: 'App',
  components: {
    BlankLayout,
    LoginLayout,
    Notifier,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'blank-layout'
    },
  },
  setup() {
    const { $vuetify } = getCurrentInstance().proxy
    const themeValue = ref($vuetify.theme.dark)
    const initTheme = () => {
      let darkTheme = localStorage.getItem('darkTheme')
      if (darkTheme) {
        $vuetify.theme.dark = darkTheme
      }
    }
    onMounted(() => {
      console.log(themeValue.value)
      initTheme()
    })
  },
}
</script>
