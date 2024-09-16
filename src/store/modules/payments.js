//import
import { getOutput, updateOutput, checkDebit } from '@/api/payments'
//import axios from 'axios'

const account = {
  namespaced: true,
  actions: {
    // async get(_, { value: id }) {
    //   const result = await getOutput(id)
    //   return result
    // },
    async getOutput(_, url) {
      const result = await getOutput(url)
      return result
    },
    async updateOutput(_, body) {
      const result = await updateOutput(body)
      return result
    },
    async checkDebit(_, params) {
      const { url } = params
      const result = await checkDebit(url)
      return result
    },
  },
}

export default account
