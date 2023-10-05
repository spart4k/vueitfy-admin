//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { useStore } from '@/store'
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
    const edit = ref(false)
    const store = useStore()
    const newMessage = ref({
      text: '',
      subject: '',
      files: null,
    })
    const answerToMail = () => {
      router
        .replace({
          query: { ...route.query, ...{ compose: 'answer' } },
        })
        .catch(() => {})
      // edit.value = true
    }

    const deleteItem = (index) => {
      newMessage.value.files.splice(index, 1)
    }

    const createMail = async () => {
      const message = newMessage.value.text
        .replaceAll('class="ql-align-center"', 'style="text-align: center"')
        .replaceAll('class="ql-align-right"', 'style="text-align: right"')
      const requestData = {
        from: 'slepoybanditka@yandex.ru',
        to: ['slepoybanditka@yandex.ru'],
        subject: newMessage.value.subject,
        message: message,
        // files: newMessage.value.files,
      }
      const response = await store.dispatch('mail/sendMessage', requestData)
      console.log(response)
    }

    watch(
      () => props?.data?.id,
      () => {
        edit.value = false
      }
    )
    return {
      newMessage,
      edit,

      deleteItem,
      createMail,
      answerToMail,
    }
  },
}
export default letterExpanded
