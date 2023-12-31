//import
import {
  getCard,
  getKeys,
  checkEveryDayPayment,
  getObject,
  create,
  putForm,
} from '@/api/personal'
//import axios from 'axios'

const account = {
  namespaced: true,
  actions: {
    async getCard(_, { value: id }) {
      const result = await getCard(id)
      return result
    },
    async getKeys(_, { url, wrap, body }) {
      console.log(url)
      const result = await getKeys(url)
      console.log(result, wrap, body)
      if (wrap) {
        return { data: { [wrap]: result } }
      } else {
        return result
      }
    },
    async checkEveryDayPayment(_, { url }) {
      const result = await checkEveryDayPayment(url)
      console.log(result)
      return result
    },
    async getObject(_, { url }) {
      console.log(url)
      const { data } = await getObject(url)
      // console.log(result)
      return data
    },
    async create(_, { url, body }) {
      console.log(_, url, body)
      const result = await create(url, body)
      return result
    },
    async createData(_, { url, body }) {
      console.log(_, url, body)
      const result = await create(url, body)
      return result
    },

    async putForm(_, params) {
      const result = await putForm(params)
      return result
    },
  },
}

export default account
