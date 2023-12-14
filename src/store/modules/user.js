export default {
  namespaced: true,
  state: {
    permission: 9,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}
