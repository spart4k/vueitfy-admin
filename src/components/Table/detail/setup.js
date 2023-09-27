import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'

import FormDefault from '@/components/form/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'

import { form, list } from '@/api/index.js'
import store from '@/store'

export default {
  name: 'Table-Detail',
  components: {
    FormDefault,
    TableDefault,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    console.log(form)
    const route = useRoute()
    const { url, alias } = props.detail
    const loading = ref(false)
    const syncForm = ref({})
    const getData = async () => {
      loading.value = true
      const params = ['vid_vedomost', 'status', 'direction']
      const queryString = '?lists=' + [...params]
      const lists = await list.get(
        `http://10.63.1.132:5000/get/lists${queryString}`,
        {
          method: 'get',
        }
      )
      for (let keyList in lists.data) {
        console.log(keyList)
      }
      console.log('store,dispatch')
      syncForm.value = await store.dispatch(
        'table/getDetail',
        `${url}${alias}/${route.params.id}`
      )
      console.log(lists)
      loading.value = false
    }
    onMounted(() => {
      // getData()
    })
    return {
      loading,
      syncForm,
      getData,
    }
  },
}
