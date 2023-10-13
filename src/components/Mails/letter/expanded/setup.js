//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, watch, unref } from 'vue'
import { useRoute } from 'vue-router/composables'
import { useStore } from '@/store'
import _ from 'lodash'
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
    const { emit } = context
    const edit = ref(false)
    const loading = ref(false)
    const store = useStore()
    const newMessage = ref({
      text: '',
      subject: '',
      files: [],
      users: [],
    })
    const answerToMail = (val) => {
      emit('setRouterPath', [{ key: 'compose', value: 'answer' }])
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
          forwarded: false,
        }
        if (route?.query?.compose === 'answer') {
          requestData.forwarded = true
          requestData.forwardedId = props?.data?.id
          // requestData.forwardedFiles = props.data.attachment_filename
          // if (props.data.text) {
          //   requestData.message = `${message}<p>-------- Пересылаемое сообщение --------</p>${props.data.text}`
          // } else {
          //   requestData.message = `${message}<p>-------- Пересылаемое сообщение --------</p>${props.data.message_text}`
          // }
        }
        loading.value = true
        const response = await store.dispatch('mail/sendMessage', requestData)
        loading.value = false
        if (response) {
          if (response.success) {
            if (route?.query?.compose === 'new') {
              emit('setRouterPath', null, null, { filter: 'all' })
              emit('getMails')
            } else if (route?.query?.compose === 'answer') {
              newMessage.value = {
                text: '',
                subject: '',
                files: [],
                users: [],
              }
              emit('setRouterPath', null, ['compose'])
            }
          }
          store.commit('notifies/showMessage', {
            color: response.success ? 'success' : 'error',
            content: response.success
              ? unref('Письмо успешно отправленно')
              : unref(response.message),
          })
        }
      }
    }

    const deleteUser = (index) => {
      newMessage.value.users.splice(index, 1)
    }

    watch(
      () => props?.data?.id,
      () => {
        newMessage.value = {
          text: '',
          subject: '',
          files: [],
          users: [],
        }
      }
    )

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
      loading,

      deleteItem,
      deleteUser,
      createMail,
      answerToMail,
    }
  },
}
export default letterExpanded
