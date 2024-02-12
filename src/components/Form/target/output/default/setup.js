import Row from '../row/index.vue'

export default {
  name: 'Form-Target-Output',
  props: {
    services: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Row,
  },
  setup() {},
}
