//import
import {
  getList,
  getDetail,
  getImportX5,
  getLoadX5,
  sendPage,
  createPrepayment,
} from '@/api/table'
import { putForm } from '@/api/form'
//import axios from 'axios'

const auth = {
  namespaced: true,
  state: {
    popup: [],
  },
  mutations: {
    openPopup(state, component) {
      state.popup.push(component)
    },
    closePopup(state) {
      state.popup.pop()
    },
  },
  actions: {
    async get(_, { url, data, params }) {
      const result = await getList(url, data, params)
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
    async createPrepayment(_, data) {
      const result = await createPrepayment(data)
      return result
    },
    async sendPage(_, data) {
      const body = {
        data: data.content,
      }
      const result = await sendPage(data.page, body)
      return result
    },
    async sendHyu(_, data) {
      const result = await fetch('http://localhost:5500/get/hui', {
        method: 'GET',
        body: {
          hyu: 'hyu',
        },
      })
      console.log(result)
    },
    async loadStatus({ commit }, data) {
      const result = await putForm(data)
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
