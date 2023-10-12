import { post } from '@/api/axios'

export const create = (data, folder, params) =>
  post('file/save/' + folder, data, params)
