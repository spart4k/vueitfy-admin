import { computed } from 'vue'
import store from '@/store'

export default {
  name: 'Notifies',
  setup() {
    const notifier = computed(() => store.state.notifier)
    return {
      notifier,
    }
  },
}
