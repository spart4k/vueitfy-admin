import { get, post, put, del } from '@/api/axios'

export const getBoxes = () => get('mail/get_box/mail_folders')

export const getFolders = () => get('mail/get_box/account_folders')

export const getTags = () => get('mail/tags')

export const getNotRead = () => get('mail/count_messages/not_read')

export const getMail = (id) => get(`mail/get_message/${id}`)

export const getSendedMessage = (id) => get(`mail/get_send_message/${id}`)

export const createBox = (data) => post('mail/create_box', data)

export const createFolder = (data) => post('mail/create_folder', data)

export const sendMessage = (data, config) =>
  post('mail/send_message', data, config)

export const getSendedMessages = (data, params) =>
  post(`mail/get_send_messages/box/${params}`, data)

export const getDeletedMessages = (data, params) =>
  post(`mail/get_messages/del/${params}`, data)

export const getBoxMails = (data, params) =>
  post(`mail/get_messages/box/${params}`, data)

export const getFolderMails = (data, params) =>
  post(`mail/get_messages/folder/${params}`, data)

export const filterMail = (data) => post('mail/update_messages', data)

export const countFilter = (data, type) => post(`mail/count/${type}`, data)

export const editBox = (data, params) => put(`mail/update_box/${params}`, data)

export const editFolder = (data, params) =>
  put(`mail/update_folder/${params}`, data)

export const changeMail = (data, params) =>
  put(`mail/update_message/${params}`, data)

export const changeLettersContainer = (data, type, id) =>
  put(`mail/change/${type}/${id}`, data)

export const deleteBox = (data) => del(`mail/box/${data}`)

export const deleteFolder = (data) => del(`mail/folder/${data}`)

export const getDirections = () => get('get/account/get_directions')

export const getOtdel = (data) => post('get/account/get_otdel', data)

export const getObjects = (data) => post('get/account/get_objects', data)

export const getAccounts = (data) => post('get/account/get_accounts', data)

export const broadcast = (data) => post('mail/broadcast', data)
