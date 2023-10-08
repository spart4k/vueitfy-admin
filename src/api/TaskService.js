import { get, post } from '@/api/axios'

export const getTask = (url) => get(url)
export const setTask = (url) => post(url)
