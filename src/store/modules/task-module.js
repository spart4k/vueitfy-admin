// import TaksService from '@/api/TaksService.js'

import { getTask, setTask } from '@/api/TaskService'
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
  },
}

export default taskModule
