import { post } from '@/api/axios'

export const setFile = (url, data, params) => post(url, data, params)
