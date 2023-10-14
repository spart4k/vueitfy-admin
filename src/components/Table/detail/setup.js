import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'
//import { useRoute } from 'vue-router/composables'

import FormDefault from '@/components/form/default/index.vue'
import FormStage from '@/components/form/stage/index.vue'
import TableDefault from '@/components/Table/default/index.vue'
import FrameView from '@/components/Task/frame-view/index.vue'

//import { form, list } from '@/api/index.js'
//import store from '@/store'

export default {
  name: 'Table-Detail',
  components: {
    FormDefault,
    TableDefault,
    FormStage,
    FrameView,
  },
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    //console.log(form)
    //const route = useRoute()
    //const { url, alias } = props.detail
    console.log(TableDefault)
    console.log('1')
    const route = useRoute()
    const { id } = route?.params
    console.log(id)
    const loading = ref(false)
    const syncForm = ref({})
    onMounted(() => {
      // getData()
    })
    return {
      loading,
      syncForm,
      //getData,
      TableDefault,
      id,
    }
  },
}
