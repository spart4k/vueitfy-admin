//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import { ref } from 'vue'
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
  },
  setup() {
    const popupCase = ref(false)
    return {
      popupCase,
    }
  },
}

export default controls
