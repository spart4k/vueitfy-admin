import { get, post, put, del } from '@/api/axios'

export const getBoxes = (data) => post('mail/box', data)

export const getFolders = () => get('mail/folders')

export const getTags = () => get('mail/tags')

export const getNotRead = () => get('mail/not_read')

export const createBox = (data) => post('mail/box/new', data)

export const createFolder = (data) => post('mail/folder', data)

export const editBox = (data, params) => put(`mail/box/${params}`, data)

export const editFolder = (data, params) => put(`mail/folder/${params}`, data)

export const deleteBox = (data) => del(`mail/box/${data}`)

export const deleteFolder = (data) => del(`mail/folder/del/${data}`)

export const getBoxMails = (data, params) => post(`mail/box/${params}`, data)

export const getFolderMails = (data, params) =>
  post(`mail/folder/${params}`, data)

export const changeMail = (data, params) => put(`mail/${params}`, data)

export const changeLettersContainer = (data, type, id) =>
  put(`mail/change/${type}/${id}`, data)

export const filterMail = (data) => post('mail/filter/mail', data)

export const countFilter = (data, type) => post(`mail/count/${type}`, data)

export const getMail = (id) => get(`mail/${id}`)

export const getSendedMessage = (id) => get(`mail/send_message/${id}`)

export const sendMessage = (data, config) =>
  post('mail/send_message', data, config)

export const getSendedMessages = (data, params) =>
  post(`mail/send_messages/${params}`, data)

export const getDeletedMessages = (data, params) =>
  post(`mail/del/${params}`, data)
