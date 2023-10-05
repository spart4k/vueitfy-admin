import { defineComponent, onMounted, ref } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'

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
    const dataFrom = ref({})
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('taskModule/getTask', 1),
      successMessage: 'Вы успешно авторизовались',
    })
    // const formatDate = (date) => {
    //   const newDate = new Date(date)
    //   const resDate = newDate.
    // }
    onMounted(async () => {
      const { data } = await makeRequest()
      dataFrom.value = data
    })
    return { loading, dataFrom }
  },
})
export default task
