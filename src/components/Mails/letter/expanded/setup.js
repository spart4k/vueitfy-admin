//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, watch, unref, onMounted, computed } from 'vue'
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
    filterData: {
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
      box_id: null,
    })
    const validation = computed(() => {
      if (
        (newMessage.value.users.length && newMessage.value.box_id) ||
        !route?.query?.compose
      ) {
        return true
      }
      return false
    })
    const answerToMail = (val) => {
      emit('setRouterPath', [{ key: 'compose', value: 'answer' }])
      newMessage.value.subject = `re: ${val.subject}`
      newMessage.value.users = [val.message_from]
    }

    const closeLetter = () => {
      emit('setRouterPath', null, ['box', 'mail', 'compose'])
    }

    const addFiles = (val) => {
      Array.from(val).forEach((item) => {
        newMessage.value.files.push(item)
      })
    }

    const removeFile = (val) => {
      // const index = newMessage.value.files.findIndex(
      //   (x) => x.upload.uuid === val.upload.uuid
      // )
      // newMessage.value.files.splice(index, 1)
    }

    const createMail = async () => {
      if (newMessage?.value?.users?.length) {
        const message = newMessage.value.text
          .replaceAll('class="ql-align-center"', 'style="text-align: center"')
          .replaceAll('class="ql-align-right"', 'style="text-align: right"')
        const mails = []
        newMessage.value.users.forEach((item) => {
          if (item.email.includes('@')) mails.push(item.email)
        })
        const requestData = {
          box_id: newMessage.value.box_id,
          to: mails.toString(),
          subject: newMessage.value.subject,
          message: message,
          files: newMessage.value.files,
          forwarded: false,
          hasImg: false,
        }
        if (route?.query?.compose === 'answer') {
          requestData.forwarded = true
          requestData.forwardedId = props?.data?.id
        }
        if (message.includes('<img')) {
          requestData.hasImg = true
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
              resetNewMessage()
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

    const setBoxId = () => {
      if (props?.data?.box_id) newMessage.value.box_id = props?.data?.box_id
    }

    onMounted(() => {
      setBoxId()
    })

    const resetNewMessage = () => {
      newMessage.value = {
        text: '',
        subject: '',
        files: [],
        users: [],
        box_id: null,
      }
    }

    watch(
      () => [props?.data?.id, route?.query?.compose],
      () => {
        if (route?.query?.compose !== 'answer') {
          resetNewMessage()
          setBoxId()
          edit.value = false
        }
      }
    )

    watch(
      () => newMessage.value.users.length,
      (newCount, oldCount) => {
        if (newCount > oldCount) {
          if (!newMessage.value.users[newMessage.value.users.length - 1].id) {
            newMessage.value.users[newMessage.value.users.length - 1] = {
              fio: newMessage.value.users[newMessage.value.users.length - 1],
              email: newMessage.value.users[newMessage.value.users.length - 1],
              avatar: null,
            }
          }
        }
      }
    )

    return {
      newMessage,
      edit,
      loading,
      validation,

      addFiles,
      removeFile,
      deleteUser,
      createMail,
      answerToMail,
      closeLetter,
      setBoxId,
      resetNewMessage,
    }
  },
}
export default letterExpanded
