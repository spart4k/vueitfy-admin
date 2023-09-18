//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
const controls = defineComponent({
  name: 'Controls',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
    }
  },
})

export default controls
