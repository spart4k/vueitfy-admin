//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
const user = defineComponent({
  name: 'User',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
export default user
