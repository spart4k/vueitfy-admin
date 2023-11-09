//import
import { setFile } from '@/api/storage'
//import axios from 'axios'

const storage = {
  namespaced: true,
  actions: {
    async loadFile(_, { url, data }) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
      console.log(data)
      const params = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const result = await setFile(url, data, params)
      return result
    },
  },
}

export default storage
