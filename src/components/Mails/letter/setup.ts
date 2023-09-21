//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from 'vue'
// import { tableApi } from '@/api'
import MailsLetterUser from './user/index.vue'
const letter = defineComponent({
  name: 'Letter',
  props: {
    companyColor: {
      type: String,
      default: '#000000'
    },
    data: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
    selectedMails: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    MailsLetterUser,
  },
  setup() {
    return {}
  },
})
export default letter
