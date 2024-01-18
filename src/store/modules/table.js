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
      const result = await sendPage(data.page, data.content)
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
                <p>Успешно обновлено: ${result.count_update}<br/>
                Обработано ошибок: ${result.count_error}<p>
              `,
            timeout: 100000,
            style: 'width: 100px',
          },
          {
            root: true,
          }
        )
      } else if (!result) {
        commit(
          'notifies/showMessage',
          {
            color: 'error',
            content: `Ошибка`,
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
