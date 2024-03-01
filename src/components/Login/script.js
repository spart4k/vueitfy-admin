// import Alert from '@/components/Alert'
import Vue, { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
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
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
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
        value: '',
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
        value: '',
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
      //
      const fields = {}
      listFields.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          //
          Vue.set(fields, el.name, {})
        } else return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      //
      return fields
    }
    const tryLoading = ref(false)
    const auth = async () => {
      if (!validate()) return
      try {
        const result = await makeRequest()

        if (result.status === 403) {
          // vForm.password.$errors.push(result.data.message)
        }

        router.push('/main')
      } catch (err) {
        return err
      }
      // await makeRequestMe()
    }
    const showField = (type, field) => field.type === type
    const {
      formData,
      //showField,
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
      tryLoading,
    }
  },
}
