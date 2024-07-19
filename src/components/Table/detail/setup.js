import { ref, computed, onUnmounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

import FormDefault from '@/components/Form/default/index.vue'
import FormStage from '@/components/Form/stage/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import FormRates from '@/components/Form/rates/default/index.vue'
import FormExpenses from '@/components/Form/expenses/index.vue'
import TableFixed from '@/components/Table/fixed/index.vue'
import FormOutputCorrect from '@/components/Form/output/correct/index.vue'
// import TableDefault from '@/components/Table/default/index.vue'
import FrameView from '@/components/Task/frame-view/index.vue'
import _ from 'lodash'

//import { form, list } from '@/api/index.js'
import store from '@/store'

export default {
  name: 'Table-Detail',
  components: {
    FormDefault,
    TableFixed,
    FormStage,
    FrameView,
    FormRates,
    FormExpenses,
    FormDocuments,
    FormOutputCorrect,
  },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Object,
      default: () => {},
    },
    formDataParent: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const { id } = route?.params
    const loading = ref(false)
    const { detail } = props
    const syncForm = ref({})
    const activeTab = ref(0)
    const directions = computed(() =>
      JSON.parse(store.state.user.direction_json)
    )
    const permission = computed(() => store.state.user.permission_id)
    const mainData = ref({})
    const checkIncludesPermissions = (el) => {
      if (!el.permissions) return true

      return el.permissions.includes(permission.value)
    }
    const checkIncludesDirections = (el) => {
      //return el.direction_id.includes(directions.value)
      if (!el.direction_id) return true
      else {
        return !!_.intersection(el.direction_id, directions.value).length
      }
    }
    const checkMainData = (el) => {
      console.log(JSON.stringify(mainData.value), 'checkdata')
      //return el.direction_id.includes(directions.value)
      if (!el.mainData) return true
      else {
        if (el.mainData === 'direction_json') {
          return !!_.intersection(el.value, mainData.value.direction_json)
            .length
        } else {
          return mainData.value[el.mainData] === el.value
        }
      }
    }
    const availableTabs = computed(() => {
      return detail.tabs.filter((item) => {
        return (
          (route.meta.mode && route.meta.mode.includes(item.path)) ||
          (!route.meta.mode && !item.path)
        )
      })
    })

    const propsContent = ref(props.content)

    const availableTabsAll = computed(() => {
      return availableTabs.value.filter((tab) => {
        if (!tab.isShow) return tab
        else {
          return tab.isShow.condition.every((el) => {
            console.log(checkMainData(el))
            return (
              el.type === checkIncludesPermissions(el) &&
              checkIncludesDirections(el) &&
              checkMainData(el)
            )
          })
          // if ()
        }
      })
    })

    const getMainData = (data) => {
      console.log('data', data)
    }
    const setFormData = (formData) => {
      console.log(JSON.stringify(formData), 'formData', { ...formData })
      // mainData.value = Object.assign(mainData.value, formData)
      mainData.value = {
        ...mainData.value,
        ...formData,
      }
    }
    onUnmounted(() => {
      if (detail?.clearStore) store.commit('clearFormStorage')
    })
    return {
      loading,
      syncForm,
      propsContent,
      detail,
      id,
      availableTabs,
      activeTab,
      availableTabsAll,
      setFormData,
      getMainData,
      mainData,
    }
  },
}
