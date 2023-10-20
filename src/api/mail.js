import { get, post, put, del } from '@/api/axios'

export const getBoxes = () => get('mail/get_box')

export const getFolders = () => get('mail/get_folders')

export const getTags = () => get('mail/tags')

export const getNotRead = () => get('mail/count_messages/not_read')

export const getMail = (id) => get(`mail/get_message/${id}`)

export const getSendedMessage = (id) => get(`mail/get_send_message/${id}`)

export const createBox = (data) => post('mail/create_box', { body: data })

export const createFolder = (data) => post('mail/create_folder', { body: data })

export const sendMessage = (data, config) =>
  post('mail/send_message', data, config)

export const getSendedMessages = (data, params) =>
  post(`mail/get_send_messages/box/${params}`, { body: data })

export const getDeletedMessages = (data, params) =>
  post(`mail/get_messages/del/${params}`, { body: data })

export const getBoxMails = (data, params) =>
  post(`mail/get_messages/box/${params}`, { body: data })

export const getFolderMails = (data, params) =>
  post(`mail/get_messages/folder/${params}`, { body: data })

export const filterMail = (data) => post('mail/update_messages', { body: data })

export const countFilter = (data, type) =>
  post(`mail/count/${type}`, { body: data })

export const editBox = (data, params) =>
  put(`mail/update_box/${params}`, { body: data })

export const editFolder = (data, params) =>
  put(`mail/update_folder/${params}`, { body: data })

export const changeMail = (data, params) =>
  put(`mail/update_message/${params}`, { body: data })

export const changeLettersContainer = (data, type, id) =>
  put(`mail/change/${type}/${id}`, { body: data })

export const deleteBox = (data) => del(`mail/box/${data}`)

export const deleteFolder = (data) => del(`mail/folder/${data}`)
