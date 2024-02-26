import {
  getBoxes,
  getFolders,
  getTags,
  getNotRead,
  createBox,
  createFolder,
  editBox,
  editFolder,
  deleteBox,
  deleteFolder,
  getBoxMails,
  getFolderMails,
  changeMail,
  changeLettersContainer,
  getMail,
  sendMessage,
  getSendedMessages,
  getSendedMessage,
  getDeletedMessages,
  getBroadcastMails,
  filterMail,
  countFilter,
  getDirections,
  getOtdel,
  getObjects,
  getAccounts,
  broadcast,
} from '@/api/mail'

const mail = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getBoxes(_) {
      try {
        const response = await getBoxes()
        return response.data
      } catch (e) {
        return e
      }
    },

    async getFolders(_) {
      try {
        const response = await getFolders()
        return response
      } catch (e) {
        return e
      }
    },

    async getTags(_) {
      try {
        const response = await getTags()
        return response.data
      } catch (e) {
        return e
      }
    },

    async getNotRead(_) {
      try {
        const response = await getNotRead()
        return response.count
      } catch (e) {
        return e
      }
    },

    async createBox(_, data) {
      try {
        const response = await createBox(data)
        return response.data
      } catch (e) {
        return e
      }
    },

    async createFolder(_, data) {
      try {
        const response = await createFolder(data)
        return response.data
      } catch (e) {
        return e
      }
    },

    async editBox(_, data) {
      try {
        const response = await editBox(data.content, data.id)
        return response.data
      } catch (e) {
        return e
      }
    },

    async editFolder(_, data) {
      try {
        const response = await editFolder(data.content, data.id)
        return response.data
      } catch (e) {
        return e
      }
    },

    async deleteBox(_, data) {
      try {
        const response = await deleteBox(data)
        return response.data
      } catch (e) {
        return e
      }
    },

    async deleteFolder(_, data) {
      try {
        const response = await deleteFolder(data)
        return response.data
      } catch (e) {
        return e
      }
    },

    async getBoxMails(_, data) {
      try {
        const response = await getBoxMails(data.content, data.id)
        return response
      } catch (e) {
        return e
      }
    },

    async getFolderMails(_, data) {
      try {
        const response = await getFolderMails(data.content, data.id)
        return response.data
      } catch (e) {
        return e
      }
    },

    async changeMail(_, data) {
      try {
        // return e
        const response = await changeMail(data.content, data.id)
        return response
      } catch (e) {
        return e
      }
    },

    async changeLettersContainer(_, data) {
      try {
        // return e
        const response = await changeLettersContainer(
          data.content,
          data.type,
          data.id
        )
        return response
      } catch (e) {
        return e
      }
    },

    async filterMail(_, data) {
      try {
        // return e
        const response = await filterMail(data)
        return response
      } catch (e) {
        return e
      }
    },

    async countTags(_, data) {
      try {
        // return e
        const response = await countFilter(data, 'tags')
        return response.data
      } catch (e) {
        return e
      }
    },

    async countFolders(_, data) {
      try {
        // return e
        const response = await countFilter(data, 'folders')
        return response.data
      } catch (e) {
        return e
      }
    },

    async getMail(_, data) {
      try {
        const response = await getMail(data)
        return response
      } catch (e) {
        return e
      }
    },

    async sendMessage(_, data) {
      try {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
        const response = await sendMessage(data, config)
        return response
      } catch (e) {
        return e
      }
    },

    async getSendedMessages(_, data) {
      try {
        const response = await getSendedMessages(data.content, data.id)
        return response.data
      } catch (e) {
        return e
      }
    },

    async getSendedMessage(_, data) {
      try {
        const response = await getSendedMessage(data)
        return response
      } catch (e) {
        return e
      }
    },

    async getDeletedMessages(_, data) {
      try {
        const response = await getDeletedMessages(data.content, data.id)
        return response.data
      } catch (e) {
        return e
      }
    },

    async getBroadcastMails(_, data) {
      try {
        const response = await getBroadcastMails(data.content)
        return response
      } catch (e) {
        return e
      }
    },

    async getDirections(_) {
      try {
        const response = await getDirections()
        return response
      } catch (e) {
        return e
      }
    },

    async getOtdel(_, id) {
      try {
        const response = await getOtdel(id)
        return response
      } catch (e) {
        return e
      }
    },

    async getObjects(_, id) {
      try {
        const response = await getObjects(id)
        return response
      } catch (e) {
        return e
      }
    },

    async getAccounts(_, id) {
      try {
        const response = await getAccounts(id)
        return response
      } catch (e) {
        return e
      }
    },

    async broadcast(_, data) {
      try {
        const response = await broadcast(data)
        return response
      } catch (e) {
        return e
      }
    },
  },
}

export default mail
