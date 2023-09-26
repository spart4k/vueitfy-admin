// import Alert from '@/components/Alert'
//import Vue from 'vue'
//import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import { required } from '@/utills/validation'
import store from '@/store'
//import axios from 'axios'
//import { login } from '@/api/login'

export default {
  name: 'login',
  components: {},
  setup() {
    //const router = useRouter()
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: {
        login: { validations: { required } },
        password: { validations: { required } },
      },
    })
    const auth = async () => {
      validate()
      //console.log(...getData())
      await store.dispatch('auth/auth', formData)
      //const data = await login.auth('http://10.63.1.132:5000/sign_in', {
      //  login: 'aa',
      //  password: '11',
      //})
      //router.push('/')
      //console.log(data)
      //store.commit('user/setUser', {
      //  name: 'Aleksey',
      //  login: 'Spartak',
      //  token: data.AccessToken,
      //})
      //axios.defaults.headers.common['Authorization'] =
      //  'Bearer ' + data.AccessToken
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
    }
  },
}
