import Qs from 'qs'
import store from '@/store'
import { refresh } from '../login'
import router from '@/router'
import { useRouter } from 'vue-router/composables'

const setup = (axios) => {
  const axiosApiInstance = axios.create()

  const setToken = (config) => {
    const token = localStorage.getItem('token')
    if (token && token.length > 0) {
      const header = 'Authorization'
      config.headers[header] = `Bearer ${token}`
    }
  }
  axios.interceptors.request.use((config) => {
    setToken(config)
    config.paramsSerializer = (params) =>
      Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      })
    return config
  })
  axios.interceptors.response.use(
    (response) => {
      if (!response.data) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Ошибка сервера',
          timeout: 1000,
        })
      }
      return response
    },
    async (error) => {
      const originalRequest = error.config
      // Do something with response error
      if (error?.response?.status === 403) {
        if (router.currentRoute.path !== '/login') {
          store.commit('notifies/showMessage', {
            color: 'error',
            content: 'Авторизуйтесь',
            timeout: 1000,
          })
          router.push('/login')
        }
      } else if (error?.response?.status === 401) {
        const data = await store.dispatch('auth/refresh', { is_refresh: false })
        if (data.code === 1) {
          setToken(originalRequest)
          return axiosApiInstance(originalRequest)
        }
      }
      return Promise.reject(error)
    }
  )

  return axios
}

export default setup
