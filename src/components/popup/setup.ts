//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
import Task from '@/components/Task/index.vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
const popup = defineComponent({
  name: 'Popup',
  components: {
    Task,
  },
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },
    targetPortal: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    return {}
  },
})
export default popup
