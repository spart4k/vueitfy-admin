//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
import { ref } from 'vue'
import Popup from '../../popup/index.vue'
const filters = {
  name: 'Filters',
  components: {
    Popup,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const caseColor = ref(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--v-primary-base'
      )
    )
    const openPicker = ref(true)
    const popupCase = ref(false)
    const createFolder = () => {
      popupCase.value = true
    }
    const closePopup = () => {
      popupCase.value = false
      openPicker.value = false
      caseColor.value = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--v-primary-base')
    }
    return {
      caseColor,
      openPicker,
      popupCase,
      createFolder,
      closePopup,
    }
  },
}
export default filters
