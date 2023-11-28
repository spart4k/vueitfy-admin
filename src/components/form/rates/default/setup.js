import { ref } from 'vue'
import tab from '../tab/index.vue'
import { stringAction } from '@/utils/actions'

export default {
  name: 'Rates',
  components: { tab },
  setup() {
    const activeTab = ref(0)
    const actions = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ])
    const loading = ref(false)
    const tabs = ref([
      {
        id: 0,
        name: 'Активные',
      },
      {
        id: 1,
        name: 'Не выставленный',
      },
      {
        id: 2,
        name: 'Не активные',
      },
    ])
    return {
      tabs,
      activeTab,
      actions,
      loading,
    }
  },
}
