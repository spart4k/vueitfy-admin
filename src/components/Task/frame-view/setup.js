import { defineComponent, onMounted, ref } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'
import moment from 'moment'

import store from '@/store'
import useRequest from '@/compositions/useRequest'

const task = defineComponent({
  name: 'Task',
  components: {
    FirstPopupView,
    SecondPopupView,
  },

  props: {},
  setup(_) {
    const context = {
      root: {
        store,
        _,
      },
    }
    const data = ref({})
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('taskModule/getTask', 1),
      successMessage: 'Вы успешно авторизовались',
    })

    const formatDate = (date) => {
      return moment(date, 'dd MMMM HH:mm').locale('ru')
    }

    onMounted(async () => {
      const dataFrom = await makeRequest()
      data.value = dataFrom
    })
    return { loading, data, formatDate }
  },
})
export default task
