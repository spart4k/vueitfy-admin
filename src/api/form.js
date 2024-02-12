import { get, post, del, put } from '@/api/axios'

export const getForm = (url) => get(url)

export const update = ({ url, body }) => post(url, body)

export const create = ({ url, body }) => post(url, body)

export const putForm = ({ url, body }) => put(url, body)

export const loadParser = ({ url, body }) => post(url, body)

export const remove = ({ url, id }) => del(`${url}/${id}`)

export const bindZayavka = (data) => put('task/update/dop_data', data)
