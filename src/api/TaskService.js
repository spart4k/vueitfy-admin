import { get, post, put } from '@/api/axios'

export const getTask = (url) => get(url)
export const setTask = (url, data) => post(url, data)
export const setBid = (url, data) => post(url, data)
export const changeStatusAndData = (url, data) => put(url, data)
export const setFile = (url, data) => post(url, data)
export const updateDataFile = (url, data) => post(url, data)
export const startProcess = (url, data) => post(url, data)

export const putTask = (url, data) => put(url, data)
