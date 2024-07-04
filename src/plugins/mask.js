import Vue from 'vue'
import VueMask from 'v-mask'

Vue.use(VueMask, {
  placeholders: {
    Z: /[0-3]/,
    $: /[0-2]/,
    M: /[0-1]/,
  },
})
