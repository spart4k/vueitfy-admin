import { defineComponent } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'

const task = defineComponent({
  name: 'Task',
  components: {
    FirstPopupView,
  },
  props: {},
  setup() {
    return {}
  },
})
export default task
