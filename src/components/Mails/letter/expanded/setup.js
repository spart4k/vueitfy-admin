//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { defineComponent } from '@vue/composition-api'
// import { tableApi } from '@/api'
import MailsLetterUser from '../user/index.vue'
import MailsLetterUserEdit from '../user/edit/index.vue'
import MailsLetterTextEdit from '../text/edit/index.vue'
import MailsLetterText from '../text/index.vue'
const letterExpanded = {
  name: 'LetterExpanded',
  components: {
    MailsLetterUser,
    MailsLetterUserEdit,
    MailsLetterTextEdit,
    MailsLetterText,
  },
  props: {
    activeMail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const route = context.root.$route
    const router = context.root.$router
    const answerToMail = () => {
      router
        .push({
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
