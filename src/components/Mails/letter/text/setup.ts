//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
const text = defineComponent({
  name: 'Text',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
export default text
