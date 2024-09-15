//import
import { login, me, logout, refresh } from '@/api/login'
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
      commit('auth/setToken', result.access_token, { root: true })
      return result
    },
    async checkMe({ commit }) {
      try {
        const result = await me()
        commit('user/setUserInfo', result.user_data, { root: true })
        return result
      } catch (e) {
        return e
      }
    },
    async logout({ commit }) {
      try {
        const result = await logout()
        commit('auth/setToken', '', { root: true })
        return result
      } catch (e) {
        return e
      }
    },
    async refresh({ commit }, data) {
      //try {
      try {
        const result = await refresh(data)
        commit('auth/setToken', result.access_token, { root: true })
        return result
      } catch (e) {
        return e
      }
    },
  },
}

export default auth
