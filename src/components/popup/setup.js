//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { defineComponent } from 'vue'
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
  setup() {
    return {}
  },
}
export default popup
