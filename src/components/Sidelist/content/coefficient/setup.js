import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import Autocomplete from '@/components/Autocomplete'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'
import SidelistSearch from '@/components/Sidelist/content/search/index.vue'

console.log('Autocomplete', Autocomplete)

export default {
  name: 'CheckList',
  components: {
    SidelistHeader,
    SidelistSearch,
    Autocomplete,
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
    const loading = ref(false)
    const search = ref('')
    const data = ref([])
    const panel = ref([])
    const mask = ref('#.#')

    const edit = ref({
      name: '',
      coefficient: null,
      items: [],
    })

    const getData = async () => {
      loading.value = true
      const requestData = {
        url: 'get/coefficient/objects',
        data: {
          period: props.date.date,
          search: search.value,
        },
      }
      data.value = await store.dispatch('table/get', requestData)
      data.value.forEach((item, index) => {
        Vue.set(data.value[index], 'content', [])
        Vue.set(data.value[index], 'loaded', false)
        Vue.set(data.value[index], 'isEdit', false)
      })
      loading.value = false
    }

    const getObjectPersonal = async (id, index) => {
      const requestData = {
        url: 'get/coefficient/personals',
        data: {
          period: props.date.date,
          search: search.value,
          object_id: id,
        },
      }
      const responseData = await store.dispatch('table/get', requestData)
      data.value[index].content = responseData
      data.value[index].content.forEach((item, i) => {
        Vue.set(data.value[index].content[i], 'isEdit', false)
      })
      data.value[index].loaded = true
    }

    onMounted(() => {
      getData()
    })

    watch(
      () => panel.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (!data.value[index].content.length)
          getObjectPersonal(data.value[index].id, index)
      },
      { deep: true }
    )
    return {
      loading,
      data,
      search,
      panel,
      edit,
      mask,
    }
  },
}
