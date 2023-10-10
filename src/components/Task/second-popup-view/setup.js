import { defineComponent } from 'vue'
import FileReader from '@/components/Task/el/FileReader/index.vue'

const SecondPopupView = defineComponent({
  name: 'SecondPopupView',
  components: {
    FileReader,
  },
  props: {},
  setup() {
    return {}
  },
})
export default SecondPopupView
