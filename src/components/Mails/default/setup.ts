//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
import { defineComponent, ref } from '@vue/composition-api'
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
  setup(props, context) {
    const router = context.root.$router
    const route = context.root.$route
    const setActiveMail = (val) => {
      const query = {
        mail: val.id
      }
      router.push({ path: 'mails', query: {...route.query, ...query}}).catch(() => {})
    }
    return {
      setActiveMail,
    }
  },
})
export default mails
