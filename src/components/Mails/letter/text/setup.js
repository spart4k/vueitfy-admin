//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import MailsLetterFiles from '../files/index.vue'
const text = {
  name: 'Mail-text',
  components: {
    MailsLetterFiles,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
}
export default text
