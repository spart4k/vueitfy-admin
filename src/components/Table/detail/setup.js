import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

import FormDefault from '@/components/form/default/index.vue'
import FormStage from '@/components/form/stage/index.vue'
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
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    //console.log(form)
    //const route = useRoute()
    //const { url, alias } = props.detail
    const route = useRoute()
    const router = useRouter()
    const { id } = route?.params
    const loading = ref(false)
    const syncForm = ref({})
    const availableTabs = computed(() => {
      return props.detail.tabs.filter((item) => {
        return (
          (route.meta.mode && route.meta.mode.includes(item.path)) ||
          (!route.meta.mode && !item.path)
        )
      })
    })
    onUnmounted(() => {
      if (props?.detail?.clearStore) store.commit('clearFormStorage')
    })
    return {
      loading,
      syncForm,
      //getData,
      TableDefault,
      id,
      availableTabs,
    }
  },
}
