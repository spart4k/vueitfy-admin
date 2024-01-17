import { post, get } from '@/api/axios'

export const getList = (url, data) => post(url, data)

export const getDetail = (url) => get(url)

export const getImportX5 = (data) => post('set/x5/import', data)

export const getLoadX5 = (data) => post('set/x5/load', data)

export const sendPage = (data) => post('accounting/payment/export', data)
