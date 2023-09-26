const user = {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      console.log('mutation user')
      state.user = user
    },
  },
}

export default user
