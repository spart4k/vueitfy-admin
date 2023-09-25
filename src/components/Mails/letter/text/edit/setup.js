//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref } from 'vue'
// import { tableApi } from '@/api'
import { VueEditor } from 'vue2-editor'
const edit = {
  name: 'Edit',
  props: {},
  components: {
    VueEditor,
  },
  setup() {
    const files = ref([])
    const deleteItem = (index) => {
      setTimeout(() => {
        files.value.splice(index, 1)
      }, 0)
    }
    return {
      files,
      deleteItem,
    }
  },
}
export default edit
