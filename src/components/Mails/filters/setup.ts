//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
// import Vue, { onMounted, ref, computed, watch } from 'vue'
// import { tableApi } from '@/api'
// import vButton from '@/components/button/index.vue'
// import { useRouter } from 'vue-router'
// import { useRouter, useRoute } from 'vue-router'
import { ref, computed, defineComponent, onMounted } from '@vue/composition-api'
import Popup from '../../popup/index.vue'
import { mailsApi } from '@/api'
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
    const folderData = ref([])
    const boxData = ref([])
    const dayOfWeek = ref(['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'])
    const boxPanel = ref()
    const folderPanel = ref()
    const newCase = ref({
      name: '',
      color: getComputedStyle(document.documentElement).getPropertyValue(
        '--v-primary-base'
      ),
      loading: false,
      type: '',
    })
    // const currentFilter = computed(() => $route.value.params)
    const openPicker = ref(false)
    const popupCase = ref(false)
    const openCreatePopup = (val) => {
      popupCase.value = true
      newCase.value.type = val
    }
    const closePopup = () => {
      popupCase.value = false
      openPicker.value = false
      newCase.value = {
        name: '',
        color: getComputedStyle(document.documentElement).getPropertyValue(
          '--v-primary-base'
        ),
        loading: false,
        type: '',
      }
    }
    const setRouterPath = (val) => {
      router.push({ path: 'mails', query: val }).catch(() => {})
      // context.emit('resetActiveMail')
    }
    const createNewFolder = async () => {
      if (newCase.value.name.length) {
        newCase.value.loading = true
        if (newCase.value.type === 'folder') {
          const requestData = {
            name: newCase.value.name,
            accountid: 25,
            color: newCase.value.color,
          }
          const newObject = await mailsApi.createFolder(requestData)
          folderData.value.push(newObject[0])
        } else if (newCase.value.type === 'box') {
          const requestData = {
            name: newCase.value.name,
            accountjson: JSON.stringify([25]),
            color: newCase.value.color,
          }
          const newObject = await mailsApi.createFolder(requestData)
          boxData.value.push(newObject[0])
        }
        closePopup()
      }
    }
    onMounted(async () => {
      folderData.value = await mailsApi.getFolders()
      boxData.value = await mailsApi.getBoxes({ accountId: 25 })
      if (route.query.filter === 'box') {
        boxPanel.value = 0
      }
      if (route.query.filter === 'folder') {
        folderPanel.value = 0
      }
    })
    return {
      newCase,
      openPicker,
      popupCase,

      folderData,
      boxData,

      dayOfWeek,

      boxPanel,
      folderPanel,

      createNewFolder,
      openCreatePopup,
      closePopup,
      setRouterPath,
    }
  },
})
export default filters
