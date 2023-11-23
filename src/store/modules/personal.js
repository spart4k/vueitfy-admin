//import
import {
  getCard,
  getKeys,
  checkEveryDayPayment,
  getObject,
} from '@/api/personal'
//import axios from 'axios'

const personal = {
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
    async create(obj, obk2) {
      console.log(obj, obk2)
    },
  },
}

export default personal
