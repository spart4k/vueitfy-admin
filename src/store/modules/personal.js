//import
import { getCard } from '@/api/personal'
//import axios from 'axios'

const personal = {
  namespaced: true,
  actions: {
    async get(_, id) {
      const result = await getCard(id)
      return result
    },
  },
}

export default personal
