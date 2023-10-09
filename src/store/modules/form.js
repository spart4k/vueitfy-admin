//import
import { getForm, update } from '@/api/form'
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
  },
}

export default form
