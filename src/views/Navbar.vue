<template>
  <div>
    <div class="">navbar</div>
    <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
    <ChangeColor />
    <v-navigation-drawer value="true" fixed right temporary>
      <v-list-item>
        <v-select label="color theme" :items="themeOptions" v-model="theme" />
      </v-list-item>
      <v-list-item>
        <v-select
          label="contrast"
          :items="contrastOptions"
          v-model="contrast"
        />
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script>
//import LayoutDefault from '@/layouts/default/index'
import ChangeColor from '@/layouts/Theme/ChangeTheme.js'
import store from '../store/index'
export default {
  name: 'Navbar-View',
  components: {
    //LayoutDefault,
    ChangeColor,
  },
  themeOptions: [
    {
      text: 'blue',
      value: 'blue',
    },
    {
      text: 'green',
      value: 'green',
    },
  ],
  contrastOptions: [
    {
      text: 'dark',
      value: 'dark',
    },
    {
      text: 'light',
      value: 'light',
    },
  ],
  computed: {
    // Open/close this whole drawer menu
    open: {
      get() {
        return store.state.preferencesDrawer
      },
      set(value) {
        store.commit('setPreferencesDrawer', value)
      },
    },
    theme: {
      get() {
        return store.state.preferences.theme
      },
      set(theme) {
        store.commit('setTheme', theme)
      },
    },
    contrast: {
      get() {
        return store.state.preferences.contrast
      },
      set(contrast) {
        store.commit('setContrast', contrast)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.testRed {
  font-size: $fontSizeTest;
}
</style>
