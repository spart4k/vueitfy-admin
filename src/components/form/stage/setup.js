import { ref } from 'vue'
import FormDefault from '@/components/form/default/index.vue'
import FormList from '@/components/form/list/index.vue'
import { useRouter } from 'vue-router/composables'

import useRequest from '@/compositions/useRequest'
import store from '@/store'

export default {
  name: 'Form-Stage',
  components: {
    FormDefault,
    FormList,
  },
  props: {
    stages: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const activeTab = ref(1)
    const nextStage = async ({ formData, action }) => {
      console.log(action)
      if (action.request) {
        console.log('request')
        const { makeRequestStage } = useRequest({
          context,
          request: () =>
            store.dispatch(action.module, { url: action.url, body: formData }),
          successMessage: 'Сохранено',
        })
        const data = await makeRequestStage()
        console.log(data)
      }
      activeTab.value++
      if (formData) {
        props.stages[activeTab.value].formData = formData
      }
    }

    const prevStage = () => {
      console.log(activeTab.value)
      activeTab.value--
    }
    return {
      activeTab,
      nextStage,
      prevStage,
    }
  },
}
