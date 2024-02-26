//import
import { setFile, putFiles } from '@/api/storage'
//import axios from 'axios'

const storage = {
  namespaced: true,
  actions: {
    async loadFilePut(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
      const params = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const result = await putFiles(data, params)
      return result
    },
    async loadFile(_, { url, data }) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
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
