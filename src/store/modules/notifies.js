const notifies = {
  namespaced: true,
  state: {
    content: '',
    color: 'success',
    timeout: null,
    isShow: false,
    component: null,
    data: null,
  },
  mutations: {
    showMessage(state, { content, color, timeout, component, data }) {
      state.content = content
      state.color = color
      state.timeout = timeout
      state.component = component
      state.isShow = true
      state.data = data
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
