import { get, post, put, del } from '@/api/axios'

export const getBoxes = (data) => post('box', data)

export const getFolders = () => get('folders')

export const getTags = () => get('tags')

export const getNotRead = () => get('mails/not_read')

export const createBox = (data) => post('box/new', data)

export const createFolder = (data) => post('folder', data)

export const editBox = (data, params) => put(`box/${params}`, data)

export const editFolder = (data, params) => put(`folder/${params}`, data)

export const deleteBox = (data) => del(`box/${data}`)

export const deleteFolder = (data) => del(`folder/del/${data}`)

export const getBoxMails = (data, params) => post(`mail/box/${params}`, data)

export const getFolderMails = (data, params) =>
  post(`mail/folder/${params}`, data)

export const changeMail = (data, params) => put(`mail/${params}`, data)

export const deleteMails = (data) => put('mails/del', data)

export const changeLettersContainer = (data, type, id) =>
  put(`mails/change/${type}/${id}`, data)

export const changeLettersAll = (data) => put('mails/change/all', data)
