//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import _ from 'lodash'
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
    const router = useRouter()
    const route = useRoute()
    const { emit } = context
    const setActiveColorFilter = (val) => {
      let colorArray = JSON.stringify([val])
      let filter = route?.query?.filter
      let id = route?.query?.id
      const newQuery = {}
      newQuery.filter = filter
      newQuery.color = colorArray
      if (id) newQuery.id = id
      if (route?.query?.color?.length) {
        if (!_.isEqual([val], JSON.parse(route?.query?.color))) {
          router.push({ query: newQuery }).catch(() => {})
          emit('getMails')
        }
      } else {
        router.push({ query: newQuery }).catch(() => {})
        emit('getMails')
      }
    }
    return {
      setActiveColorFilter,
    }
  },
}
export default letter
