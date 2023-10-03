//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref, computed } from 'vue'
import _ from 'lodash'
// import { tableApi } from '@/api'
import Popup from '../../popup/index.vue'
const controls = {
  name: 'Controls',
  components: {
    Popup,
  },
  props: {
    selectedAllMails: {
      type: Boolean,
      default: false,
    },
    selectedMails: {
      type: Array,
      default: () => [],
    },
    filterData: {
      type: Object,
      default: () => {},
    },
    allMails: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const popupCase = ref(false)
    const intersection = computed(() => {
      const array = {
        full: [],
        tags: [],
        folders: [],
        read: [],
      }
      props.selectedMails.forEach((item) => {
        array.full.push(props.allMails.arrayFull.find((e) => e.id === item))
      })
      array.full.forEach((item) => {
        array.tags.push(JSON.parse(item.tags))
        array.folders.push(JSON.parse(item.folders))
        array.read.push(item.is_read)
      })
      array.tags = _.intersection(...array.tags)
      array.folders = _.intersection(...array.folders)
      array.read = array.read.filter((e) => e === true)
      return array
    })
    return {
      popupCase,
      intersection,
    }
  },
}

export default controls
