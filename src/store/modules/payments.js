//import
import { getOutput } from '@/api/payments'
//import axios from 'axios'

const account = {
  namespaced: true,
  actions: {
    // async get(_, { value: id }) {
    //   const result = await getOutput(id)
    //   return result
    // },
    async getOutput(_, url) {
      console.log(getOutput)
      const result = await getOutput(url)
      return result
    },
  },
}

export default account
