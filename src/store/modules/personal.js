//import
import {
  getCard,
  getKeys,
  checkEveryDayPayment,
  getObject,
  create,
  createForm,
  updateForm,
  getDocuments,
  updateDocumentsFields,
} from '@/api/personal'
//import axios from 'axios'

const personal = {
  namespaced: true,
  actions: {
    async getCard(_, { value: id }) {
      const result = await getCard(id)
      return result
    },
    async getDocuments(_, id) {
      const result = await getDocuments(id)
      return result
    },
    async updateDocumentsFields(_, { url, body }) {
      const result = await updateDocumentsFields(url, body)
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
    async createForm(_, params) {
      const result = await createForm(params)
      return result
    },
    async updateForm(_, params) {
      const result = await updateForm(params)
      return result
    },
    async createData(_, { url, body }) {
      console.log('createData', _, url, body)
      const result = await create(url, body)
      return result
    },
  },
}

export default personal
