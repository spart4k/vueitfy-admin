import { defineComponent } from 'vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocScan from '@/components/Task/el/DocScan/index.vue'

const firstPopupView = defineComponent({
  name: 'FirstPopupView',
  components: {
    TextInfo,
    DocScan,
  },
  props: {},
  setup() {
    return {}
  },
})
export default firstPopupView
