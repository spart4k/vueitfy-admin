import { ref } from 'vue'
import FormDefault from '@/components/form/default/index.vue'

export default {
  name: 'Form-Stage',
  components: {
    FormDefault,
  },
  props: {
    stages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const activeTab = ref(null)
    const nextStage = () => {
      activeTab.value++
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
