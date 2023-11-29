import { get, post, del } from '@/api/axios'

export const getForm = (url) => get(url)

export const update = ({ url, body }) => post(url, body)

export const create = ({ url, body }) => post(url, body)

export const remove = ({ url, id }) => del(`${url}/${id}`)
