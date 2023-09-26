<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <Notifier />
    <portal-target name="filter" />
    <portal-target name="table-detail" />
  </v-app>
</template>

<script>
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

  data: () => ({
    //
  }),
  mounted() {
    console.log('theme', this.$vuetify.theme)
  },
}
</script>
