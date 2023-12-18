// import Alert from '@/components/Alert'
import Vue, { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import { required } from '@/utils/validation'
import store from '@/store'
//import axios from 'axios'
//import { login } from '@/api/login'
import { stringField } from '@/utils/fields'

export default {
  name: 'login',
  components: {},
  setup(_, ctx) {
    //const root = getCurrentInstance()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    //const loading = ref(null)

    const { loading, makeRequest } = useRequest({
      context,
      request: () => store.dispatch('auth/auth', { ...getDataForm() }),
      successMessage: 'Вы успешно авторизовались',
    })
    const { makeRequest: makeRequestMe } = useRequest({
      context,
      request: () => store.dispatch('auth/checkMe'),
    })
    const listFields = ref([
      stringField({
        label: 'Логин',
        subtype: 'text',
        name: 'login',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        bootstrapClass: [''],
        validations: { required },
      }),
      stringField({
        label: 'Пароль',
        subtype: 'password',
        name: 'password',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        bootstrapClass: [''],
        validations: { required },
      }),
    ])
    const fields = () => {
      // console.log('rebuild fields')
      const fields = {}
      listFields.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          // console.log('CONDITION TRUE', el.name)
          Vue.set(fields, el.name, {})
        } else return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      // console.log(fields)
      return fields
    }
    const handlerEnter = (event) => {
      const key = event.key
      console.log(key)
      if (key === 'Enter') {
        auth()
      }
    }
    const auth = async () => {
      console.log(validate())
      if (!validate()) return
      try {
        const result = await makeRequest()
        // console.log(result.status)
        // if (result.status === 403) {
        //   // vForm.password.$errors.push(result.data.message)
        //   console.log(vForm)
        // }
        router.push('/main')
      } catch (err) {
        console.log(err)
      }
      // await makeRequestMe()
    }
    onMounted(() => {
      document.addEventListener('keydown', handlerEnter)
    })
    onUnmounted(() => {
      document.removeEventListener('keydown', handlerEnter)
    })
    const {
      formData,
      showField,
      validate,
      formErrors,
      vForm,
      touchedForm,
      getDataForm,
    } = useForm({
      fields: fields(),
      context,
      loading,
    })
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
      fields,
      listFields,
      showField,
    }
  },
}
