import { post, get, put } from '@/api/axios'

export const getList = (url, data, params) => post(url, data, params)

export const getDetail = (url) => get(url)

export const getImportX5 = (data) => post('set/x5/import', data)

export const getLoadX5 = (data) => post('set/x5/load', data)

export const createPrepayment = (data) => post('create/prepayment', data)

export const sendPage = (page, data) => post(`accounting/${page}/export`, data)
