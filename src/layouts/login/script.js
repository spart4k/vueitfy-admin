// import Alert from '@/components/Alert'
// import { ref, computed } from 'vue'
import useForm from '@/compositions/useForm'
import { OnlyPassword, required } from '@/utills/validation'
// import { useRoute } from 'vue-router'

export default {
  name: 'login',
  components: {},
  setup() {
    const { formData, validate, $errors, $v, $touched } = useForm({
      fields: {
        firstName: { validations: { required } },
        password: { validations: { required, OnlyPassword } },
      },
    })

    return {
      // valid,
      // firstname,
      // password,
      // nameRules,
      // passwordRules,
      // route,
      // canSend,
      formData,
      validate,
      $errors,
      $v,
      $touched,
    }
  },
}
