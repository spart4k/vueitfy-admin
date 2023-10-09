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
    })

    // const { makeRequest: makePostRequest } = useRequest({
    //   context,
    //   request: () =>
    //     store.dispatch('taskModule/setPartTask', { wdwd: 1, ffff: 2 }),
    // })

    const formatDate = (date) => {
      return moment(date, 'dd MMMM HH:mm').locale('ru')
    }

    onMounted(async () => {
      const dataFrom = await makeRequest()
      data.value = dataFrom
    })

    // const pushData = (data) => {
    //   console.log(data)
    // }
    return { loading, data, formatDate }
  },

  // methods: {
  //   sendData() {
  //     this.$refs.FirstPopupView.prepareCaseAndPush()
  //   },
  // },
})
export default task
