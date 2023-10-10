//import
import { getList } from '@/api/list'
//import axios from 'axios'

const list = {
  namespaced: true,
  actions: {
    async get(_, url) {
      console.log(url)
      const result = await getList(url)
      return result
    },
  },
}

export default list
