import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'

const ThirdPopupView = defineComponent({
  name: 'ThirdPopupView',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
  },
  props: {},
  setup() {
    const infoObj = {
      pasp: {
        key: 'key',
        value: 'value',
      },
    }
    const confirmDocs = ref([])
    const editedDocs = ref({})
    return { infoObj, confirmDocs, editedDocs }
  },
})
export default ThirdPopupView
