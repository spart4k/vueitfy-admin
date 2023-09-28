//import
import { login, me } from '@/api/login'
//import axios from 'axios'

const auth = {
  namespaced: true,
  state: {
    user: {},
    token: '',
  },
  mutations: {
    setToken(state, token) {
      console.log('mutation user')
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
      console.log(result)
      //commit('auth/setToken', result.AccessToken)
    },
  },
}

export default auth
