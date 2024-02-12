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
import Notifier from '@/components/Notifies'

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
    const initTheme = () => {
      $vuetify.theme.dark = JSON.parse(localStorage.getItem('darkTheme'))
    }
    onMounted(() => {
      initTheme()
    })
  },
}
</script>
