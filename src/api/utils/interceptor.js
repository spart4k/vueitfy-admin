import Qs from 'qs'
import store from '@/store'
import { refresh } from '../login'
const setup = (axios) => {
  axios.interceptors.request.use((config) => {
    //config.headers['Content-Type'] = ''
    const token = store.state.auth.token
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
        error.response.status === 403 &&
        error.response.data.message === 'invalid credentials'
      ) {
        return
        //console.log('unauthorized, logging out ...')
      }
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        await refresh()
        return axios(originalConfig)
        //console.log('unauthorized, logging out ...')
      }
      return Promise.reject(error.response)
    }
  )

  return axios
}

export default setup
