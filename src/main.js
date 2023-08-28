import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/styles/main.scss'
import PortalVue from 'portal-vue'

Vue.config.productionTip = false
Vue.use(PortalVue)

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount('#app')

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  s = s.replace(/^\./, '') // strip a leading dot
  var a = s.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}
