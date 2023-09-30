import { defineComponent } from 'vue'
import TextInfo from './el/TextInfo/index.vue'
import DocScan from './el/DocScan/index.vue'

const task = defineComponent({
  name: 'Task',
  components: {
    TextInfo,
    DocScan,
  },
  props: {},
  setup() {
    return {}
  },
})
export default task
