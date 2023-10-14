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
  filterMail,
  countFilter,
} from '@/api/mail'

const mail = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getBoxes(_, data) {
      try {
        const response = await getBoxes(data)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async getFolders(_) {
      try {
        const response = await getFolders()
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async getTags(_) {
      try {
        const response = await getTags()
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async getNotRead(_) {
      try {
        const response = await getNotRead()
        return response.count
      } catch (e) {
        console.log(e)
      }
    },

    async createBox(_, data) {
      try {
        const response = await createBox(data)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async createFolder(_, data) {
      try {
        const response = await createFolder(data)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async editBox(_, data) {
      try {
        const response = await editBox(data.content, data.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async editFolder(_, data) {
      try {
        const response = await editFolder(data.content, data.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async deleteBox(_, data) {
      try {
        const response = await deleteBox(data)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async deleteFolder(_, data) {
      try {
        const response = await deleteFolder(data)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async getBoxMails(_, data) {
      try {
        const response = await getBoxMails(data.content, data.id)
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async getFolderMails(_, data) {
      try {
        const response = await getFolderMails(data.content, data.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async changeMail(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await changeMail(data.content, data.id)
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async changeLettersContainer(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await changeLettersContainer(
          data.content,
          data.type,
          data.id
        )
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async filterMail(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await filterMail(data)
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async countTags(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await countFilter(data, 'tags')
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async countFolders(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await countFilter(data, 'folders')
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async getMail(_, data) {
      try {
        const response = await getMail(data)
        return response
      } catch (e) {
        console.log(e)
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
        console.log(e)
      }
    },

    async getSendedMessages(_, data) {
      try {
        const response = await getSendedMessages(data.content, data.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async getSendedMessage(_, data) {
      try {
        const response = await getSendedMessage(data)
        return response
      } catch (e) {
        console.log(e)
      }
    },

    async getDeletedMessages(_, data) {
      try {
        const response = await getDeletedMessages(data.content, data.id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
}

export default mail
