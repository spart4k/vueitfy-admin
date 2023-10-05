//import
import { getList, getDetail } from '@/api/table'
//import axios from 'axios'

const auth = {
  namespaced: true,
  actions: {
    async get(_, { url, data }) {
      const result = await getList(url, data)
      return result
    },
    async getDetail(_, url) {
      const result = await getDetail(url)
      return result
    },
  },
}

export default auth