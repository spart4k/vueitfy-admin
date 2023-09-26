//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { ref } from '@vue/composition-api'
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
    tagsData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {}
  },
}
export default container
