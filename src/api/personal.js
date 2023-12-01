import { get, post } from '@/api/axios'

export const getCard = (id) => get(`get/personal_bank/${id}`)

export const getKeys = (url) => get(`get/user_keys${url}`)

export const checkEveryDayPayment = (url) => get(`check/everyday${url}`)

export const getObject = (url) => get(`get/objects${url}`)

export const create = (url, data) => post(url, data)

export const createForm = ({ url, body }) => post(url, { data: body })
