//import
import { getCard, getKeys } from '@/api/personal'
//import axios from 'axios'

const personal = {
  namespaced: true,
  actions: {
    async getCard(_, { value: id }) {
      const result = await getCard(id)
      return result
    },
    async getKeys(_, { url }) {
      console.log(url)
      const result = await getKeys(url)
      return result
    },
  },
}

export default personal
