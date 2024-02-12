import axios from 'axios'
//import store from '../store'

export default class Cities {
  constructor(url) {
    this.url = url
  }

  async getList(url, paramsQuery) {
    try {
      const { data } = await axios.post(`${url}`, paramsQuery)

      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

}
