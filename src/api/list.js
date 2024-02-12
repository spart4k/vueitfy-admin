import { get, post } from '@/api/axios'

export const getList = (data) => post('get/lists', data)

//export const getDetail = (url) => get(url)
