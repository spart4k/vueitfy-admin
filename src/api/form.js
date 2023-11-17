import { get, post } from '@/api/axios'

export const getForm = (url) => get(url)

export const update = ({ url, body }) => post(url, body)

export const create = ({ url, body }) => post(url, body)

export const del = ({ url, id }) => del(`${url}/${id}`)
