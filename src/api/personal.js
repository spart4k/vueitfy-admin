import { get } from '@/api/axios'

export const getCard = (id) => get(`get/personal_bank/${id}`)

export const getKeys = (url) => get(`get/user_keys${url}`)

export const checkEveryDayPayment = (url) => get(`check/everyday${url}`)
