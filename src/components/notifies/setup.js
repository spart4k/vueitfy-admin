import { computed } from 'vue'
import store from '@/store'

export default {
  name: 'Notifies',
  setup() {
    const notifies = computed(() => store.state.notifies)
    const hideMessage = () => {
      store.commit('notifies/hideMessage')
    }
    return {
      notifies,
      hideMessage,
    }
  },
}
