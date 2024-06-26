import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'
import user from './modules/user'
import auth from './modules/auth'
import notifies from './modules/notifies'
import mail from './modules/mail'
import navmenu from './modules/navmenu.js'
import table from './modules/table'
import form from './modules/form'
import list from './modules/list'
import personal from './modules/personal'
import taskModule from './modules/task-module'
import selects from './modules/selects'
import file from './modules/file'
import storage from './modules/storage'
import account from './modules/account'
import personal_target from './modules/personal_target'
import payments from './modules/payments'
// import states from './modules/navmenu.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    openMenu: true,
    miniMenu: false,
    preferencesDrawer: false,
    preferences: {
      contrast: 'light',
      theme: 'blue',
    },
    formStorage: {},
  },
  mutations: {
    changeFormStorage(state, obj) {
      Vue.set(state.formStorage, obj.key, obj.value)
    },
    clearFormStorage(state) {
      state.formStorage = {}
    },
    changeMenuStatus(state, value) {
      state.openMenu = value
    },
    changeMenuSize(state, value) {
      state.miniMenu = value
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
  modules: {
    user,
    auth,
    notifies,
    mail,
    table,
    form,
    list,
    personal,
    account,
    taskModule,
    navmenu,
    selects,
    file,
    storage,
    personal_target,
    payments,
  },
})

export default store
export const useStore = () => {
  return store
}
