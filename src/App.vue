<template>
  <v-app>
    <LayoutDefault v-if="false">
      <router-view />
      <portal-target name="filter" />
      <portal-target name="table-detail" />
    </LayoutDefault>
    <LayoutDefault v-else>
      <router-view />
    </LayoutDefault>
  </v-app>
</template>

<script>
import LayoutDefault from '@/layouts/default/index.vue'
//import LoginDefault from '@/layouts/login'
export default {
  name: 'App',
  components: {
    LayoutDefault,
    //LoginDefault,
  },
  data: () => ({
    //
  }),
  mounted() {
    console.log('theme', this.$vuetify.theme)
  },
}
</script>
