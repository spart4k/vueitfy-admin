import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'

import FormDefault from '@/components/form/default/index.vue'
import TableDefault from '@/components/Table/default/index.vue'

import { form } from '@/api/index.js'

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
    const getData = async () => {
      loading.value = true
      const data = await form.get(
        `http://10.63.1.132:5000${url}${alias}/${route.params.id}`,
        {
          method: props.detail.method,
        }
      )
      loading.value = false
      console.log(data)
    }
    onMounted(() => {
      getData()
    })
  },
}
