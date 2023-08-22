import Vue from 'vue'
import App from './App.vue'
import router from './router'
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
  render: (h) => h(App),
}).$mount('#app')
