//import
import { getList, getDetail, saveFile } from '@/api/table'
//import axios from 'axios'

const auth = {
  namespaced: true,
  actions: {
    async get(_, { url, data }) {
      const result = await getList(url, data)
      return result
    },
    async getDetail(_, url) {
      const result = await getDetail(url)
      return result
    },
    async saveFile(_, data) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      console.log('data, config', data, config)
      const result = await saveFile(data, config)
      return result
    },
  },
}

export default auth
