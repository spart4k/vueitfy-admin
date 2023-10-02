//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
// import { tableApi } from '@/api'
import MailsLetterUser from '../user/index.vue'
import MailsLetterUserEdit from '../user/edit/index.vue'
import MailsLetterTextEdit from '../text/edit/index.vue'
import MailsLetterText from '../text/index.vue'
import MailsLetterDate from '../date/index.vue'
const letterExpanded = {
  name: 'LetterExpanded',
  components: {
    MailsLetterUser,
    MailsLetterUserEdit,
    MailsLetterTextEdit,
    MailsLetterText,
    MailsLetterDate,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const answerToMail = () => {
      router
        .replace({
          path: 'mails',
          query: { ...route.query, ...{ compose: 'answer' } },
        })
        .catch(() => {})
    }
    const createMail = () => {
      console.log('newMail')
    }
    return {
      createMail,
      answerToMail,
    }
  },
}
export default letterExpanded
