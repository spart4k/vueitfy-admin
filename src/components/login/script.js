// import Alert from '@/components/Alert'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import { required } from '@/utills/validation'
import store from '@/store'
//import axios from 'axios'
//import { login } from '@/api/login'

export default {
  name: 'login',
  components: {},
  setup(_, ctx) {
    const root = getCurrentInstance()
    console.log(root)
    console.log(ctx)
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        _,
      },
    }
    //const loading = ref(null)

    const { formData, validate, formErrors, vForm, touchedForm, getData } =
      useForm({
        fields: {
          login: { validations: { required } },
          password: { validations: { required } },
        },
      })
    const { loading, makeRequest } = useRequest({
      context,
      request: () => store.dispatch('auth/auth', { ...getData() }),
      successMessage: 'Успешно',
    })
    const auth = async () => {
      //console.log(...getData())
      validate()
      //console.log(...getData())
      loading.value = true
      //await store.dispatch('auth/auth', formData)
      await makeRequest()
      router.push('/')
      loading.value = false
    }

    return {
      auth,
      // valid,
      // firstname,
      // password,
      // nameRules,
      // passwordRules,
      // route,
      // canSend,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      loading,
      makeRequest,
    }
  },
}
