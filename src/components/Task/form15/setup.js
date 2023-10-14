import { defineComponent } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'

const Form15 = defineComponent({
  name: 'Form15',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const infoObj = {
      creator: {
        key: 'Создатель',
        value: 'Чеботарёв',
      },
    }
    return { infoObj }
  },
})
export default Form15
