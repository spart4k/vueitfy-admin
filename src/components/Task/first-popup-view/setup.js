import { defineComponent } from 'vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocScan from '@/components/Task/el/DocScan/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'

const firstPopupView = defineComponent({
  name: 'FirstPopupView',
  components: {
    FormComment,
    TextInfo,
    DocScan,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const textInfo = {
      manager: props.data.entity.account_name,
      obj: props.data.entity.object_name,
    }
    return { textInfo }
  },
})
export default firstPopupView
