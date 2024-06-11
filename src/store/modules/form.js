//import
import {
  getForm,
  update,
  create,
  remove,
  putForm,
  delForm,
  bindZayavka,
  loadParser,
  getPaymentList,
  getPaymentListObjects,
} from '@/api/form'
//import axios from 'axios'

const form = {
  namespaced: true,
  actions: {
    async get(_, url) {
      const result = await getForm(url)
      return result
    },
    async update(_, params) {
      const result = await update(params)
      return result
    },
    async putForm(_, params) {
      const result = await putForm(params)
      return result
    },
    async create(_, params) {
      const result = await create(params)
      return result
    },
    async del(_, params) {
      const result = await remove(params)
      return result
    },
    async delForm(_, params) {
      const result = await delForm(params)
      return result
    },
    async bindZayavka(_, params) {
      const result = await bindZayavka(params.body)
      return result
    },
    async loadParser(_, params) {
      const result = await loadParser(params)
      return result
    },
    async getPaymentList(_, params) {
      const result = await getPaymentList(params)
      return result
    },
    async getPaymentListObjects(_, params) {
      const result = await getPaymentListObjects(params)
      return result
    },
  },
}

export default form
