//import
import { getForm, update, create, del } from '@/api/form'
//import axios from 'axios'

const form = {
  namespaced: true,
  actions: {
    async get(_, url) {
      const result = await getForm(url)
      return result
    },
    async update(_, params) {
      const result = await update(params)
      return result
    },
    async create(_, params) {
      const result = await create(params)
      return result
    },
    async del(_, params) {
      const result = await del(params)
      return result
    },
  },
}

export default form
