<template>
  <v-app>
    <LayoutDefault>
      <router-view />
      <portal-target name="filter" />
      <portal-target name="table-form" />
    </LayoutDefault>
  </v-app>
</template>

<script>
import LayoutDefault from '@/layouts/default/index.vue'
export default {
  name: 'App',
  components: {
    LayoutDefault,
  },
  data: () => ({
    //
  }),
  mounted() {
    console.log('theme', this.$vuetify.theme)
  },
}
</script>
