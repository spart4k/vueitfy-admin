//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = defineComponent({
  name: 'Edit',
  props: {},
  components: {
    VueEditor,
  },
  setup() {
    return {}
  },
})
export default edit
