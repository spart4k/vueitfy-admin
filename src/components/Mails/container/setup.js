//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router/composables'
// import { tableApi } from '@/api'
import MailsLetter from '../letter/index.vue'
import MailsLetterExpanded from '../letter/expanded/index.vue'
const container = {
  name: 'Container',
  components: {
    MailsLetter,
    MailsLetterExpanded,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
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
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const { emit } = context
    const activeMail = ref({})
    const setActiveMail = async (val) => {
      emit('setActiveMail', val)
      activeMail.value = val
      if (!val.is_read) {
        const request = {
          content: {
            is_read: true,
          },
          id: val.id,
        }
        await store.dispatch('mail/changeMail', request)
        val.is_read = true
        emit('decreaseUnreadMailsCount')
      }
    }
    onMounted(() => {
      const mail = props.data
        .find((x) => x.id === Number(route?.query?.box))
        .mails.find((x) => x.id === Number(route?.query?.mail))
      activeMail.value = mail
    })
    return {
      activeMail,

      setActiveMail,
    }
  },
}
export default container
