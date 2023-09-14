<template>
  <div>
    <div class="">navbar</div>
    <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
    <Theme />
  </div>
</template>

<script>
//import LayoutDefault from '@/layouts/default/index'
// import store from '../store/index'
import Theme from '../layouts/Theme/theme.vue'

export default {
  name: 'Navbar-View1',
  components: {
    //LayoutDefault,
    Theme,
  },
}
</script>

<style lang="scss" scoped>
.testRed {
  font-size: $fontSizeTest;
}
</style>
