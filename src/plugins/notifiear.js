import Vue from 'vue'
import store from '@/store'

const notifier = {
  install(app) {
    app.prototype.$notifier = {
      showMessage({ content = '', color = '' }) {
        store.commit('notifier/showMessage', { content, color })
      },
    }
  },
}

Vue.use(notifier)
