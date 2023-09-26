import axios from 'axios'
import setupInterceptors from './utils/interceptor'

export const instance = setupInterceptors(axios.create())

const sendData = ({ data }) => data

export const get = (endpoint, params = {}) =>
  instance.get(endpoint, { params }).then(sendData)

export const getBlob = (endpoint, params = {}) =>
  instance
    .get(`${process.env.VUE_APP_API_URL}/${endpoint}`, {
      params,
      responseType: 'blob',
    })
    .then(sendData)

export const post = (endpoint, data = {}, params = {}) =>
  instance
    .post(`${process.env.VUE_APP_API_URL}/${endpoint}`, data, params)
    .then(sendData)

export const put = (endpoint, data = {}) =>
  instance
    .put(`${process.env.VUE_APP_API_URL}/${endpoint}`, data)
    .then(sendData)

export const del = (endpoint, data = {}) =>
  instance
    .delete(`${process.env.VUE_APP_API_URL}/${endpoint}`, { data })
    .then(sendData)
