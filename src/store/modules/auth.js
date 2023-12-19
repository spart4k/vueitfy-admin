//import
import { login } from '@/api/login'
//import axios from 'axios'

const auth = {
  namespaced: true,
  state: {
    user: {},
    token: '',
    permision: {},
  },
  mutations: {
    setToken(state, token) {
      //state.user = user
      state.token = token
    },
  },
  actions: {
    async auth({ commit }, data) {
      //try {
      const result = await login(data)
      commit('auth/setToken', result.AccessToken, { root: true })
    },
    async checkMe() {
      //try {
      const result = await me()
      return result
      //commit('auth/setToken', result.AccessToken)
    },
  },
}

export default auth
