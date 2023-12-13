export default {
  namespaced: true,
  state: {
    permission: 1,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}
