import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

import FormDefault from '@/components/Form/default/index.vue'
import FormStage from '@/components/Form/stage/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import FrameView from '@/components/Task/frame-view/index.vue'

//import { form, list } from '@/api/index.js'
import store from '@/store'

export default {
  name: 'Table-Detail',
  components: {
    FormDefault,
    TableDefault,
    FormStage,
    FrameView,
    FormDocuments,
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
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const { id } = route?.params
    const loading = ref(false)
    const syncForm = ref({})
    const activeTab = ref(0)
    const permission = computed(() => store.state.user.permission_id)
    const checkIncludesPermissions = (el) => {
      if (!el.permissions) return true

      return el.permissions.includes(permission.value)
    }
    const availableTabs = computed(() => {
      return props.detail.tabs.filter((item) => {
        return (
          (route.meta.mode && route.meta.mode.includes(item.path)) ||
          (!route.meta.mode && !item.path)
        )
      })
    })

    const porpsContent = ref(props.content)

    const availableTabsAll = computed(() => {
      return availableTabs.value.filter((tab) => {
        if (!tab.isShow) return tab
        else {
          return tab.isShow.condition.some((el) => {
            return checkIncludesPermissions(el) === el.type
          })
          // if ()
        }
      })
    })

    onUnmounted(() => {
      if (props?.detail?.clearStore) store.commit('clearFormStorage')
    })
    return {
      loading,
      syncForm,
      porpsContent,
      id,
      availableTabs,
      activeTab,
      availableTabsAll,
    }
  },
}
