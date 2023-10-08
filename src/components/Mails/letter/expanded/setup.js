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
      files: [],
      users: [],
    })
    const answerToMail = (val) => {
      router
        .replace({
          query: { ...route.query, ...{ compose: 'answer' } },
        })
        .catch(() => {})
      newMessage.value.subject = `re: ${val.subject}`
      newMessage.value.users = [val.message_from]
    }

    const deleteItem = (index) => {
      newMessage.value.files.splice(index, 1)
    }

    const createMail = async () => {
      if (newMessage?.value?.users?.length) {
        const message = newMessage.value.text
          .replaceAll('class="ql-align-center"', 'style="text-align: center"')
          .replaceAll('class="ql-align-right"', 'style="text-align: right"')
        const userArray = []
        newMessage.value.users.forEach((item) => {
          userArray.push(item.email)
        })
        const requestData = {
          from: 'slepoybanditka@yandex.ru',
          to: userArray,
          subject: newMessage.value.subject,
          message: message,
          files: newMessage.value.files,
        }
        if (route?.query?.compose === 'answer') {
          requestData.forwarded = true
          requestData.forwardedFiles = props.data.attachment_filename
          console.log(props.data)
          if (props.data.text) {
            requestData.message = `${message}<p>-------- Пересылаемое сообщение --------</p>${props.data.text}`
          } else {
            requestData.message = `${message}<p>-------- Пересылаемое сообщение --------</p>${props.data.message_text}`
          }
        }
        await store.dispatch('mail/sendMessage', requestData)
      }
    }

    const deleteUser = (index) => {
      newMessage.value.users.splice(index, 1)
    }

    watch(
      () => newMessage.value.users.length,
      (newCount, oldCount) => {
        if (newCount > oldCount) {
          if (!newMessage.value.users[newMessage.value.users.length - 1].id) {
            newMessage.value.users[newMessage.value.users.length - 1] = {
              name: newMessage.value.users[newMessage.value.users.length - 1],
              email: newMessage.value.users[newMessage.value.users.length - 1],
              avatar: null,
            }
          }
        }
      }
    )

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
      deleteUser,
      createMail,
      answerToMail,
    }
  },
}
export default letterExpanded
