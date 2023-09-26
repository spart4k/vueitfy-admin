const notifies = {
  namespaced: true,
  state: {
    content: 'ыфвф',
    color: 'success',
    timeout: null,
    isShow: false,
  },
  mutations: {
    showMessage(state, { content, color, timeout }) {
      state.content = content
      state.color = color
      state.timeout = timeout
      state.isShow = true
    },
    hideMessage(state) {
      state.isShow = false
    },
  },
}

export default notifies
