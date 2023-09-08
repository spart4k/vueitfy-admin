import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'
// import states from './modules/navmenu.js'

Vue.use(Vuex)
console.log('vuetify', vuetify)
const store = new Vuex.Store({
  state: {
    navmenu: false,
    collapse: false,
    preferencesDrawer: false,
    preferences: {
      contrast: 'light',
      theme: 'blue',
    },
  },
  mutations: {
    setNavmenu(state, value) {
      state.navmenu = value
    },
    collapseNavmenu(state, value) {
      state.collapse = value
    },
    setTheme(state, theme) {
      Vue.set(state.preferences, 'theme', theme)
      vuetify.framework.theme.themes.dark =
        vuetify.userPreset.theme.themes[theme]
      vuetify.framework.theme.themes.light =
        vuetify.userPreset.theme.themes[theme]
    },
    // Now you can switch between the light and dark version of the green theme
    setContrast(state, contrast) {
      Vue.set(state.preferences, 'contrast', contrast)
      vuetify.framework.theme.dark = contrast === 'dark'
    },
  },
  actions: {},
  getters: {},
  modules: {},
})

export default store
export const useStore = () => {
  console.log(store, 'store')
  return store
}
