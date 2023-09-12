//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
import MailsLetterUser from '../user/index.vue'
const letterExpanded = {
  name: 'LetterExpanded',
  components: {
    MailsLetterUser,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
}
export default letterExpanded
