import {} from 'vue'
import FormDefault from '@/components/form/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'

export default {
  name: 'Table-Detail',
  components: {
    FormDefault,
    TableDefault,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    console.log(this)
  },
}
