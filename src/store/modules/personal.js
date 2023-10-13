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
    async getKeys(_, { object, personal }) {
      const result = await getKeys(object, personal)
      return result
    },
  },
}

export default personal
