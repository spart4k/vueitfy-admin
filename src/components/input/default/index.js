//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)

import template from './template.js'

const inputDefault = {
  name: 'v-input-default',
  components: {

  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    clearing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    valuePass() {
      this.$emit('input', this.value)
    },
    clearField() {
      this.$emit('clearfield')
    }
  },
  computed: {
  },
  mounted() {
  },
  template
}

export default inputDefault
// Vue.component('message', message)