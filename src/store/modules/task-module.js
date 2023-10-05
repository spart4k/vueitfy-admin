// import TaksService from '@/api/TaksService.js'

import { getTask } from '@/api/TaskService'
//import axios from 'axios'

const taskModule = {
  namespaced: true,
  actions: {
    async getTask(_, url) {
      const result = await getTask('task/get/' + url)
      console.log(result)
      return result
    },
  },
}

export default taskModule
