//import
import { getList, getDetail } from '@/api/table'
//import axios from 'axios'

const auth = {
  namespaced: true,
  actions: {
    async get(_, { url, data }) {
      console.log(data)
      const result = await getList(url, data)
      console.log(result)
      return result
    },
    async getDetail(_, url) {
      console.log(url)
      const result = await getDetail(url)
      return result
    },
  },
}

export default auth
