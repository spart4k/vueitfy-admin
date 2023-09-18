//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
import { defineComponent, ref } from 'vue'
// import { tableApi } from '@/api'
import MailsFilters from '../filters/index.vue'
import MailsControls from '../controls/index.vue'
import MailsContainer from '../container/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
const mails = defineComponent({
  name: 'Mails',
  components: {
    MailsFilters,
    MailsControls,
    MailsContainer,
    MailsLetterExpanded,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const activeMail = ref({})
    const setActiveMail = (val) => {
      activeMail.value = Object.assign({}, val)
      // $router.push({
      //   path: 'mails',
      //   query: { filter: 'unread' },
      // })
    }
    return {
      setActiveMail,
      activeMail,
    }
  },
})
export default mails
