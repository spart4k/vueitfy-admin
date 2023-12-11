import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'

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
    content: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    //console.log(form)
    //const route = useRoute()
    //const { url, alias } = props.detail
    const route = useRoute()
    const { id } = route?.params
    const loading = ref(false)
    const syncForm = ref({})

    const detailTabs = props.detail.tabs

    const porpsContent = ref(props.content)
    console.log('porpsContent', porpsContent)
    // for (const detailItem of detailTabs) {
    //   if (detailItem.hasOwnProperty('content')) {
    //     console.log(detailItem)
    //     //porpsContent
    //     //detailItem.fields
    //     // for( const field of detailItem.fields) {
    //     //   field.value =
    //     // }
    //     detailItem.fields[0].value = porpsContent.account_name
    //     detailItem.fields[1].value = porpsContent.hour
    //     detailItem.fields[2].value = porpsContent.date
    //     console.log(detailItem)
    //   }
    // }
    // console.log(detailTabs)
    onMounted(() => {
      // currentTab.value = 5
    })
    return {
      loading,
      syncForm,
      //getData,
      TableDefault,
      porpsContent,
      id,
    }
  },
}
