import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'

const Form21 = defineComponent({
  name: 'Form21',
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
    const isBtnDisabled = ref(true)
    const isKeyConfrmed = ref(null)
    const { formData: keyForm } = useForm({
      fields: {
        key: {
          validations: { required },
          default: '',
        },
        name: {
          validations: { required },
          default: '',
        },
        trainee: {
          default: false,
        },
        comment: {
          default: '',
        },
      },
    })

    const confirmKey = () => {
      isKeyConfrmed.value = true
      isBtnDisabled.value = false
    }
    const rejectKey = () => {
      isKeyConfrmed.value = false
      isBtnDisabled.value = false
    }

    return { keyForm, isBtnDisabled, isKeyConfrmed, confirmKey, rejectKey }
  },
})
export default Form21
