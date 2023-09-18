//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
// import { useRouter } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
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
    const router = useRouter()
    const route = useRoute()

    // const router = useRouter()
    // const route = useRouter()
    console.log(router, route)
    const dayOfWeek = ref(['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'])
    const boxPanel = computed(() => {
      // if ($route) {
      //   return 0
      // }
      return null
    })
    const folderPanel = ref(0)
    const caseColor = ref(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--v-primary-base'
      )
    )
    // const currentFilter = computed(() => $route.value.params)
    const openPicker = ref(false)
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
    const setRouterPath = (val) => {
      console.log(val)
    }
    return {
      caseColor,
      openPicker,
      popupCase,

      dayOfWeek,

      boxPanel,
      folderPanel,

      createFolder,
      closePopup,
      setRouterPath,
    }
  },
}
export default filters
