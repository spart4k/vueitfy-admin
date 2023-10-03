// import Alert from '@/components/Alert'
//import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import { required } from '@/utils/validation'
import store from '@/store'
//import axios from 'axios'
//import { login } from '@/api/login'

export default {
  name: 'login',
  components: {},
  setup(_) {
    //const root = getCurrentInstance()
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
      successMessage: 'Вы успешно авторизовались',
    })
    const { makeRequest: makeRequestMe } = useRequest({
      context,
      request: () => store.dispatch('auth/checkMe'),
    })
    const auth = async () => {
      if (!validate()) return
      await makeRequest()
      router.push('/')
      await makeRequestMe()
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
      makeRequestMe,
    }
  },
}
