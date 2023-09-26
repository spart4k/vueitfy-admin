import Qs from 'qs'
import store from '@/store'

const setup = (axios) => {
  axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'text/plain'
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

  return axios
}

export default setup
