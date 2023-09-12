//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
import MailsLetter from '../letter/index.vue'
const container = {
  name: 'Container',
  components: {
    MailsLetter,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
}
export default container
