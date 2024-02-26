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
      const result = await getKeys(url)

      if (wrap) {
        return { data: { [wrap]: result } }
      } else {
        return result
      }
    },
    async checkEveryDayPayment(_, { url }) {
      const result = await checkEveryDayPayment(url)

      return result
    },
    async getObject(_, { url }) {
      const { data } = await getObject(url)
      //
      return data
    },
    async create(_, { url, body }) {
      const result = await create(url, body)
      return result
    },
    async createData(_, { url, body }) {
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
