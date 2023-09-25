//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import MailsLetter from '../letter/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
const container = {
  name: 'Container',
  components: {
    MailsLetter,
    MailsLetterExpanded,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    selectedMails: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {}
  },
}
export default container
