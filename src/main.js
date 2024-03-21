/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/styles/main.scss'
import PortalVue from 'portal-vue'
import DatetimePicker from 'vuetify-datetime-picker'
import './plugins'

Vue.use(DatetimePicker)
// import VueCompositionApi from '@vue/composition-api'
//import mainJS from '@/trash/main.js'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.silent = true
Vue.use(PortalVue)
Vue.prototype.env = process.env

Vue.downloadFile = function (val) {
  console.log(val)
  const link = document.createElement('a')
  link.download = val
  link.href = process.env.VUE_APP_STORE + val
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

import TableDefault from '@/components/Table/default/index.vue'
Vue.component('TableDefault', TableDefault)

// Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  vuetify,
  axios,
  //mainJS,
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

let remove = [/\s+/g, /'(\\.|[^'])*'/g, /"(\\.|[^"])*"/g, /\d+/g]

let emptyArray = /\[,*\]/g

String.isArray = function (str) {
  for (let r of remove) str = str.replace(r, '')

  if (str[0] !== '[') return false

  while (str.match(emptyArray)) str = str.replace(emptyArray, '')

  return str.length === 0
}
