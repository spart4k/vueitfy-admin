import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'CheckList',
  props: {
    date: {
      type: String,
    },
  },
  setup(props) {
    const stage = ref(0)
    const loading = ref(true)
    const data = ref({})

    const getData = async () => {
      loading.value = true
      data.value = await store.dispatch(
        'table/getDetail',
        `get/period/month?period=${props.date.date}`
      )
      loading.value = false
    }

    onMounted(() => {
      getData()
    })
    return {
      stage,
      loading,
      data,
    }
  },
}
