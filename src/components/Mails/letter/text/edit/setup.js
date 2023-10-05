//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { ref } from 'vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = {
  name: 'Edit',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VueEditor,
  },
  setup() {
    return {}
  },
}
export default edit
