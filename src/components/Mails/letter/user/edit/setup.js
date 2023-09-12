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
    const content = ref()
    const user = ref([
      {
        name: 'Азаров Михаил',
        avatar: 'https://cdn.vuetifyjs.com/images/john.png',
      },
    ])
    return {
      content,
      user,
    }
  },
}
export default edit
