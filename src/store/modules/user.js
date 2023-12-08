const user = {
  namespaced: true,
  state: {
    user: {
      id: 25,
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
}

export default user
