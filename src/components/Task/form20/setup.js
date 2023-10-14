import { defineComponent } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'

const Form20 = defineComponent({
  name: 'Form20',
  components: {
    FormError,
    FormComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const {
      formData: keyForm,
      validate: keyFormValidate,
      formErrors: keyFormErrors,
    } = useForm({
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
    return { keyForm, keyFormErrors, keyFormValidate }
  },
})
export default Form20
