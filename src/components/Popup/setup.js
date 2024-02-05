//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue'
// import Task from '@/components/Task/frame-view/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
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
    // const route = useRoute()
    // const closexcz = () => {
    //   emit('close')
    // }
    const handlerEscape = (event) => {
      const key = event.key
      if (key === 'Escape') {
        emit('close')
      }
    }
    onMounted(() => {
      document.addEventListener('keydown', handlerEscape)
      console.log('OPEN POPUP')
      // setTimeout(() => {
      //   getCurrentInstance().proxy.closexcz()
      // }, 3000)
    })
    onUnmounted(() => {
      document.removeEventListener('keydown', handlerEscape)
    })
    return {}
  },
}
export default popup
