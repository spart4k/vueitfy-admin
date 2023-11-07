import { post } from '@/api/axios'

export const setFile = (url, data) => post(url, data)
