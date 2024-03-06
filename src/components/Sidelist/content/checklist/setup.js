import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'

export default {
  name: 'CheckList',
  components: {
    SidelistHeader,
  },
  props: {
    date: {
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const stage = ref(0)
    const loading = ref(true)
    const data = ref({
      content: {},
      period: {},
    })

    const getData = async () => {
      loading.value = true
      data.value.period = await store.dispatch(
        'table/getDetail',
        `get/period/month?period=${props.date.date}`
      )
      if (data.value.period?.code === 1) {
        data.value.content = await store.dispatch(
          'table/getDetail',
          `get/checklist/${data.value.period.data.id}`
        )
      }
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
