//import
import { create } from '@/api/files'
//import axios from 'axios'

const file = {
  namespaced: true,
  actions: {
    async create(_, { data, folder, params }) {
      console.log(data, folder, params)
      const result = await create(data, folder, params)
      return result
    },
  },
}

export default file
