export default {
  namespaced: true,
  state: {},
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setUserInfo(state, user) {
      for (let key in user) {
        state[key] = user[key]
      }
    },
  },
}
