//import axios from 'axios'

//export default class Cities {
//  constructor(url) {
//    this.url = url
//  }

//  async getApi(url, paramsQuery) {
//    try {
//      const { data } = await axios.post(`${url}`, paramsQuery, {
//        headers: {
//          'Content-Type': 'text/plain',
//        },
//      })
//      return data
//    } catch (error) {
//      return error
//    }
//  }
//}

//import { get } from '@/api/axios'
import { post } from '@/api/axios'

export const getList = (url, body, params) => post(url, body, params)

//export const getDetail = (url) => get(url)
