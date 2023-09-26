//import
import { login } from '@/api/login'

const auth = {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setToken(state, user) {
      console.log('mutation user')
      state.user = user
    },
  },
  actions: {
    async auth(_, data) {
      const token = await login(data)
      console.log(token)
    },
  },
}

export default auth
