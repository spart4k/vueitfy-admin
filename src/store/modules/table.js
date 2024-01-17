//import
import {
  getList,
  getDetail,
  getImportX5,
  getLoadX5,
  sendPage,
} from '@/api/table'
import { putForm } from '@/api/form'
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
    async getImportX5(_, data) {
      const result = await getImportX5(data)
      return result
    },
    async getLoadX5(_, data) {
      const result = await getLoadX5(data)
      return result
    },
    async sendPage(_, data) {
      const result = await sendPage(data)
      return result
    },
    async loadStatus({ commit }, data) {
      const result = await putForm(data)
      console.log(result)
      if (result.code === 1) {
        commit(
          'notifies/showMessage',
          {
            color: 'success',
            content: `
                Успешно обновлено: ${result.count_update}
                Обработано ошибок: ${result.count_error}
              `,
            timeout: 2000,
          },
          {
            root: true,
          }
        )
      }
      return result
    },
  },
}

export default auth
