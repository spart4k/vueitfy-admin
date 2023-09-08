//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
import MailsFilters from '../filters/index.vue'
import MailsControls from '../controls/index.vue'
import MailsContainer from '../container/index.vue'
const mails = {
  name: 'Mails',
  components: {
    MailsFilters,
    MailsControls,
    MailsContainer,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  setup() {
    return {}
  },
}
export default mails
