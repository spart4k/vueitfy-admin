//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'
import _ from 'lodash'
// import { tableApi } from '@/api'
import MailsLetterUser from './user/index.vue'
import MailsLetterDate from './date/index.vue'
import MailsLetterFiles from './files/index.vue'
const letter = {
  name: 'Letter',
  props: {
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
    MailsLetterFiles,
  },
  setup(props, context) {
    const route = useRoute()
    const { emit } = context
    const checkbox = ref(false)
    const iframe = ref(null)
    const style = '<style>*{overflow: hidden}</style>'
    const setActiveColorFilter = (val) => {
      if (
        !route?.query?.color?.length ||
        !_.isEqual([val], JSON.parse(route?.query?.color))
      ) {
        emit(
          'setRouterPath',
          null,
          null,
          {
            filter: route?.query?.filter,
            color: Number(val),
          },
          ['id']
        )
        emit('getMails')
      }
    }
    onMounted(() => {
      checkbox.value = props?.selectedMails?.includes(props.data.id)
      iframe.value.srcdoc = props?.data?.message_text + style
    })
    return {
      iframe,
      checkbox,
      setActiveColorFilter,
    }
  },
}
export default letter
