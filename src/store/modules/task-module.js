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

    async setPartTask(_, url) {
      const result = await setTask('task/change_status' + url)
      console.log(result)
      return result
    },
  },
}

export default taskModule
