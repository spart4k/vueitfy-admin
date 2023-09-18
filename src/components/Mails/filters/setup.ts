//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
import { defineComponent, ref, computed } from 'vue'
// import { useRouter } from 'vue-router';
import Popup from '../../popup/index.vue'
const filters = defineComponent({
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
    const dayOfWeek = ref(['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'])
    // const route = useRouter()
    // console.log('11111', $route)
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
    return {
      caseColor,
      openPicker,
      popupCase,

      dayOfWeek,

      createFolder,
      closePopup,
    }
  },
})
export default filters
