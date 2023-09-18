//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import MailsLetter from '../letter/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
const container = defineComponent({
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
    edit: {
      type: Boolean,
      default: false,
    },
    activeMail: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
})
export default container
