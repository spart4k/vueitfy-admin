//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
// import { useRouter } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'
import { ref, computed, defineComponent } from '@vue/composition-api'
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
  setup(props, context) {
    const router = context.root.$router
    const route = context.root.$route
    const dayOfWeek = ref(['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'])
    const boxPanel = computed(() => {
      if (route.query.filter === 'box') {
        return 0
      }
      return null
    })
    const folderPanel = computed(() => {
      if (route.query.filter === 'folder') {
        return 0
      }
      return null
    })
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
      router.push({ path: 'mails', query: val }).catch(() => {})
      context.emit('resetActiveMail')
    }
    const createNewMail = () => {
      setRouterPath({ compose: 'new' })
      console.log(route)
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
      createNewMail,
    }
  },
})
export default filters
