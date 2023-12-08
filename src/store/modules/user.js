export default {
  namespaced: true,
  state: {
    permission: 2,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}
