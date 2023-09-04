import Vue from 'vue'
import Vuex from 'vuex'

// import states from './modules/navmenu.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navmenu: false,
    collapse: false,
  },
  mutations: {
    setNavmenu(state, value) {
      state.navmenu = value
    },
    collapseNavmenu(state, value) {
      state.collapse = value
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
