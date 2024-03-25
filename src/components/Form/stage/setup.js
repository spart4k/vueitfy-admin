import Vue, { onUnmounted, onMounted, ref } from 'vue'
import FormDefault from '@/components/Form/default/index.vue'
import FormList from '@/components/Form/list/index.vue'
import FormDocuments from '@/components/Form/documents/default/index.vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useStage from '@/compositions/useStage'

import useRequest from '@/compositions/useRequest'
import store from '@/store'

export default {
  name: 'Form-Stage',
  components: {
    FormDefault,
    FormList,
    FormDocuments,
  },
  props: {
    stages: {
      type: Array,
      default: () => [],
    },
    tab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const loading = ref(false)
    const activeTab = ref(null)

    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        return store.dispatch(params.module, {
          url: params.url,
          id: store.state.formStorage.id,
          body: params?.formData,
        })
      },
    })

    const { clickHandler } = useStage({
      context,
      loading,
      activeTab,
      createForm,
      form: props.tab,
    })

    const nextStage = async ({ formData, action }) => {
      if (action?.request) {
        const { makeRequestStage } = useRequest({
          context,
          request: () =>
            store.dispatch(action.module, { url: action.url, body: formData }),
          successMessage: 'Сохранено',
        })
        const data = await makeRequestStage()
      }
      activeTab.value++
      if (formData) {
        props.stages[activeTab.value].formData = formData
      }
    }

    const prevStage = () => {
      activeTab.value--
    }

    const setStageData = (val) => {
      Vue.set(props.tab, 'stageData', val)
    }

    onMounted(() => {
      if (props?.tab?.setRoute && route.name !== props?.tab?.setRoute)
        router.push({ name: props.tab.setRoute })
    })

    return {
      activeTab,
      nextStage,
      prevStage,
      setStageData,
      clickHandler,
      loading,
    }
  },
}
