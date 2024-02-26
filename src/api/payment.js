import axios from 'axios'
import store from '../store'

export default class Cities {
  constructor(url) {
    this.url = url
  }

  async getList(url, paramsQuery) {
    try {
      const { data } = await axios.post(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      return data
    } catch (error) {
      return error
    }
  }

  async getDetail(url, paramsQuery) {
    try {
      const { data } = await axios.get(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      return data
    } catch (error) {
      return error
    }
  }

  async getApi(url, paramsQuery) {
    try {
      const { data } = await axios.post(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      return data
    } catch (error) {
      return error
    }
  }
}
