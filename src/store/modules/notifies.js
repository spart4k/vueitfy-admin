const notifies = {
  namespaced: true,
  state: {
    content: '',
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
      const vm = this
      if (timeout) {
        setTimeout(() => {
          vm.commit('notifies/hideMessage')
        }, timeout)
      } else {
        setTimeout(() => {
          vm.commit('notifies/hideMessage')
        }, 3500)
      }
    },
    hideMessage(state) {
      state.isShow = false
    },
  },
}

export default notifies
