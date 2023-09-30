import { defineComponent } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'

const task = defineComponent({
  name: 'Task',
  components: {
    FirstPopupView,
    SecondPopupView,
  },
  props: {},
  setup() {
    return {}
  },
})
export default task
