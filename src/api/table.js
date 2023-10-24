import { post, get } from '@/api/axios'

export const getList = (url, data) => post(url, data)

export const getDetail = (url) => get(url)

export const saveFile = (data, config) => post(data.url, data.data, config)
