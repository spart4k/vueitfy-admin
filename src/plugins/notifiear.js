import Vue from 'vue'
import store from '@/store'
console.log('notifiew')
const notifier = {
  install(app) {
    console.log(app.prototype)
    app.prototype.$notifier = {
      showMessage({ content = '', color = '' }) {
        store.commit('notifier/showMessage', { content, color })
      },
    }
  },
}

Vue.use(notifier)
