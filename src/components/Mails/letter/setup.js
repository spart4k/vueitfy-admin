//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
import MailsLetterUser from './user/index.vue'
const letter = {
  name: 'Letter',
  props: {},
  components: {
    MailsLetterUser,
  },
  setup() {
    return {}
  },
}
export default letter
