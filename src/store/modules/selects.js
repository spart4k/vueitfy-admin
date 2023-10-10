//import
import { getList } from '@/api/selects'
//import axios from 'axios'

const selects = {
  namespaced: true,
  actions: {
    async getList(_, url, body) {
      console.log(url)
      const result = await getList(url, body)
      return result
    },
  },
}

export default selects
