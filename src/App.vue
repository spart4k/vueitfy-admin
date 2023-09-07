<template>
  <v-app>
    <LayoutDefault>
      <router-view />
      <portal-target name="filter" />
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
}
</script>
