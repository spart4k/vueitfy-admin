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
import { watch, getCurrentInstance } from 'vue'

export default {
  name: 'Navbar-View1',
  components: {
    //LayoutDefault,
    Theme,
  },
  setup() {
    const { $vuetify } = getCurrentInstance().proxy
    watch(
      () => $vuetify.theme.dark,
      () => {
        localStorage.setItem('darkTheme', $vuetify.theme.dark)
      }
    )
    return {}
  },
}
</script>

<style lang="scss" scoped>
.testRed {
  font-size: $fontSizeTest;
}
</style>
