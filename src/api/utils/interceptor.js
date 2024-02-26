import Qs from 'qs'
import store from '@/store'
import { refresh } from '../login'
import router from '@/router'
import { useRouter } from 'vue-router/composables'

const setup = (axios) => {
  axios.interceptors.request.use((config) => {
    //config.headers['Content-Type'] = ''
    const token = localStorage.getItem('token')
    if (token && token.length > 0) {
      //const header = process.env.VUE_APP_ENVIRONMENT === 'staging' ? 'XAuth' : 'Authorization'
      const header = 'Authorization'
      config.headers[header] = `Bearer ${token}`
    }
    config.paramsSerializer = (params) =>
      Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      })
    return config
  })
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalConfig = error.config
      // Do something with response error

      if (
        error?.response?.status === 403 &&
        error?.response?.data?.message === 'invalid credentials'
      ) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Не верный логин или пароль',
          timeout: 1000,
        })
        return Promise.reject(error.response)
      }
      if (error?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        // await refresh()
        //

        if (router.currentRoute.path !== '/login') {
          store.commit('notifies/showMessage', {
            color: 'error',
            content: 'Авторизуйтесь',
            timeout: 1000,
          })
          router.push('/login')
        }
        // const router = useRouter()
        // router.push('/login')
        // return axios(originalConfig)
        //
      }
      return Promise.reject(error)
    }
  )

  return axios
}

export default setup
