//import
import { login, me } from '@/api/login'
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
      localStorage.setItem('token', token)
    },
  },
  actions: {
    async auth({ commit }, data) {
      //try {
      const result = await login(data)
      commit('auth/setToken', result.AccessToken, { root: true })
      return result
    },
    async checkMe({ commit }) {
      try {
        const result = await me()
        commit('user/setUserInfo', result, { root: true })
      } catch (e) {
        return e
      }
    },
  },
}

export default auth
