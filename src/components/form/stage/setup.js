import { ref } from 'vue'
import FormDefault from '@/components/form/default/index.vue'
import FormList from '@/components/form/list/index.vue'

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
  setup(props) {
    const activeTab = ref(null)
    const nextStage = (formData) => {
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
