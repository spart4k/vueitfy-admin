const user = {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}

export default user
