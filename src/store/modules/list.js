//import
import { getList } from '@/api/list'
//import axios from 'axios'

const list = {
  namespaced: true,
  actions: {
    async get(_, data) {
      const result = await getList(data)
      return result
    },
  },
}

export default list
