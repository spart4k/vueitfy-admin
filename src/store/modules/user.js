export default {
  namespaced: true,
  state: {
    permission: 255,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}
