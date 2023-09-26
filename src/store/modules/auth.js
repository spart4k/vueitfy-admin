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
    async auth({ commit }, data) {
      //try {
      const result = await login(data)
      commit('auth/setToken', result.AccessToken)
      //  commit(
      //    'notifies/showMessage',
      //    {
      //      color: 'success',
      //      content: 'Вы успешно авторизовались',
      //    },
      //    { root: true }
      //  )
      //  return result
      //}
    },
  },
}

export default auth
