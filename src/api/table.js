import { post, get } from '@/api/axios'

export const getList = (url, data) => post(url, data)

export const getDetail = (url) => get(url)

export const getImportX5 = (data) => post('set/x5/import', data)
