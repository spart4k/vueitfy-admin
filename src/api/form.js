import { get, post } from '@/api/axios'

export const getForm = (url) => get(url)

export const update = ({ url, body }) => post(url, body)
