//import
import { getList } from '@/api/selects'
//import axios from 'axios'

const selects = {
  namespaced: true,
  actions: {
    async getList(_, url, body) {
      const result = await getList(url, body)
      return result
    },
    async getListUpdate(_, { url, body }) {
      const { rows } = await getList(url, body)
      return rows
    },
  },
}

export default selects
