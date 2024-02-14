//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue'
// import Task from '@/components/Task/frame-view/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
import store from '@/store'
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
    const instance = getCurrentInstance()
    // const route = useRoute()
    const close = () => {
      emit('close')
    }
    const handlerEscape = (event) => {
      const key = event.key
      if (
        key === 'Escape' &&
        store.state.table.popup.at(-1)._uid === instance.proxy._uid
      ) {
        emit('close')
      }
    }
    onMounted(() => {
      document.addEventListener('keydown', handlerEscape)
      store.commit('table/openPopup', instance.proxy)
    })
    onUnmounted(() => {
      document.removeEventListener('keydown', handlerEscape)
      store.commit('table/closePopup')
    })
    return {
      close,
    }
  },
}
export default popup
