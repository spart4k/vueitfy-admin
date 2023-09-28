//import
import { getList } from '@/api/list'
//import axios from 'axios'

const list = {
  namespaced: true,
  actions: {
    async get(_, url) {
      const result = await getList(url)
      console.log(result)
      return result
    },
  },
}

export default list
