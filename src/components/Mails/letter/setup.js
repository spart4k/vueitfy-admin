//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { computed } from 'vue'
// import { tableApi } from '@/api'
import MailsLetterUser from './user/index.vue'
import MailsLetterDate from './date/index.vue'
const letter = {
  name: 'Letter',
  props: {
    companyColor: {
      type: String,
      default: '#000000',
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
    },
    tagsData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MailsLetterUser,
    MailsLetterDate,
  },
  setup(props, context) {
    const router = context.root.$router
    const route = computed(() => context.root.$route)
    const setActiveColorFilter = (val) => {
      router
        .push({
          path: 'mails',
          query: { ...route.value.query, ...{ color: val } },
        })
        .catch(() => {})
    }
    return {
      setActiveColorFilter,
    }
  },
}
export default letter
