import { get, post } from '@/api/axios'

export const getTask = (url) => get(url)
export const setTask = (url, data) => post(url, data)
export const setFile = (url, data) => post(url, data)
export const updateDataFile = (url, data) => post(url, data)
