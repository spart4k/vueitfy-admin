import { get, post, put } from '@/api/axios'

export const getCard = (id) => get(`get/personal_bank/${id}`)

export const getDocuments = (id) => get(`get/personal/doc_data/${id}`)

export const updateDocumentsFields = (id, body) =>
  put(`update/personal/doc_data/${id}`, body)

export const getKeys = (url) => get(`get/user_keys${url}`)

export const checkEveryDayPayment = (url) => get(`check/everyday${url}`)

export const getObject = (url) => get(`get/objects${url}`)

export const create = (url, data) => post(url, data)

export const createForm = ({ url, body }) => post(url, body)

export const updateForm = ({ url, body }) => post(url, body)
