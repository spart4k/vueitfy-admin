import { post, putFile } from '@/api/axios'

export const setFile = (url, data, params) => post(url, data, params)

export const putFiles = (data, params) =>
  putFile(`${data.folder}/${data.fileName}`, data, params)
