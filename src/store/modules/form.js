//import
import { getForm } from '@/api/form'
//import axios from 'axios'

const form = {
  namespaced: true,
  actions: {
    async get(_, url) {
      const result = await getForm(url)
      return result
    },
  },
}

export default form
