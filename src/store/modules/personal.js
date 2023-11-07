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
    async getKeys(_, { url }) {
      console.log(url)
      const result = await getKeys(url)
      console.log(result)
      return { data: { print_form_key: result } }
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
  },
}

export default personal
