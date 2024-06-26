import axios from 'axios'
import setupInterceptors from './utils/interceptor'

export const instance = setupInterceptors(axios.create())

const sendData = ({ data }) => data

export const get = (endpoint, params = {}) =>
  instance
    .get(`${process.env.VUE_APP_API_URL}/${endpoint}`, { params })
    .then(sendData)

export const getBlob = (endpoint, params = {}) =>
  instance
    .get(`${process.env.VUE_APP_API_URL}/${endpoint}`, {
      params,
      responseType: 'blob',
    })
    .then(sendData)

export const post = (endpoint, data = {}, params = {}) => {
  return instance
    .post(`${process.env.VUE_APP_API_URL}/${endpoint}`, data, params)
    .then(sendData)
}

export const putFile = (endpoint, data = {}, params = {}) => {
  return instance
    .post(`${process.env.VUE_APP_STORE_LOAD}/${endpoint}`, data, params)
    .then(sendData)
}

export const put = (endpoint, data = {}) => {
  return instance
    .put(`${process.env.VUE_APP_API_URL}/${endpoint}`, data)
    .then(sendData)
}

export const del = (endpoint, data = {}) =>
  instance
    .delete(`${process.env.VUE_APP_API_URL}/${endpoint}`, { data })
    .then(sendData)
