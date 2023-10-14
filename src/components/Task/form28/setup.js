import { defineComponent } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'

const Form28 = defineComponent({
  name: 'Form28',
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
      ved_type: {
        key: 'Вид ведомости',
        value: 'Чеботарёв',
      },
      employee: {
        key: 'Сотрудник',
        value: 'Чеботарёв',
      },
      position: {
        key: 'Должность',
        value: 'Чеботарёв',
      },
      object: {
        key: 'Объект',
        value: 'Чеботарёв',
      },
      details: {
        key: 'Реквизиты',
        value: 'Питание',
      },
      trip_ticket: {
        key: 'Путевой лист',
        value: 'Чеботарёв',
      },
    }
    return { infoObj }
  },
})
export default Form28
