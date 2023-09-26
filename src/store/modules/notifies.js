const notifier = {
  namespaced: true,
  state: {
    content: 'ыфвф',
    color: 'success',
    timeout: null,
    isShow: true,
  },
  mutations: {
    showMessage(state, { content, color, timeout }) {
      state.content = content
      state.color = color
      state.timeout = timeout
    },
  },
}

export default notifier
