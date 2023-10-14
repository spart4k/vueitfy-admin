// import TaksService from '@/api/TaksService.js'

import { getTask, setTask, setFile, updateDataFile } from '@/api/TaskService'
//import axios from 'axios'

const taskModule = {
  namespaced: true,
  actions: {
    async getTask(_, url) {
      const result = await getTask('task/get/' + url)
      console.log(result)
      return result
    },

    async setPartTask(_, data) {
      const result = await setTask('task/change_status/' + data.id, data.data)
      console.log(result)
      return result
    },

    async setPersonalData(_, data) {
      const result = await setTask('set/data/personal', data.data)
      console.log(result)
      return result
    },

    async loadImage(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
      console.log(data)
      const result = await setFile(
        `file/save/${data.folder}/${data.fileName}`,
        data.file
      )
      return result
    },

    async setPersonalDocData(_, data) {
      const result = await setTask('set/data/personal_doc_data', data.data)
      console.log(result)
      return result
    },
    async updateFileData(_, data) {
      const result = await updateDataFile('set/data/personal_doc', data)
      console.log(result)
      return result
    },

    async setSaveDocs(_, data) {
      const result = await setTask('set/personal/save_docs', data.data)
      console.log(result)
      return result
    },
    async setDocInfo(_, data) {
      const result = await setTask('set/personal/save_docs', data.data)
      console.log(result)
      return result
    },
  },
}

export default taskModule
