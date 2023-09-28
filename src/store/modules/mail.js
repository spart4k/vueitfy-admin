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
  getPagination,
  changeMail,
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

    async editBox(_, data, params) {
      try {
        const response = await editBox(data, params)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },

    async editFolder(_, data, params) {
      try {
        const response = await editFolder(data, params)
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

    async getPagination(_, data) {
      try {
        // console.log('data, params', data, params)
        const response = await getPagination(data.content, data.id)
        return response
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
  },
}

export default mail
