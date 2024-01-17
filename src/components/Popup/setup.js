//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { onMounted, onUnmounted } from 'vue'
import Task from '@/components/Task/frame-view/index.vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
const popup = {
  name: 'Popup',
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
  setup(_, ctx) {
    const { emit } = ctx
    const handlerEscape = (event) => {
      const key = event.key
      if (key === 'Escape') {
        emit('close')
      }
    }
    onMounted(() => {
      document.addEventListener('keydown', handlerEscape)
    })
    onUnmounted(() => {
      document.removeEventListener('keydown', handlerEscape)
    })
    return {}
  },
}
export default popup
