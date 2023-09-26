import axios from 'axios'
// import store from '../store'

const urlK = 'http://10.63.1.54:3000'
export default class Mails {
  constructor(url) {
    this.url = url
  }

  async getBoxes(params) {
    try {
      const { data } = await axios.post(`${urlK}/box`, params)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getFolders() {
    try {
      const { data } = await axios.get(`${urlK}/folders`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getTags() {
    try {
      const { data } = await axios.get(`${urlK}/tags`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getNotRead() {
    try {
      const { data } = await axios.get(`${urlK}/mails/not_read`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async createBox(params) {
    try {
      const { data } = await axios.post(`${urlK}/box/new`, params)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async createFolder(params) {
    try {
      const { data } = await axios.post(`${urlK}/folder`, params)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async editBox(params, id) {
    try {
      const { data } = await axios.put(`${urlK}/box/${id}`, params)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async editFolder(params, id) {
    try {
      const { data } = await axios.put(`${urlK}/folder/${id}`, params)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBox(id) {
    try {
      const { data } = await axios.delete(`${urlK}/box/${id}`)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteFolder(id) {
    try {
      const { data } = await axios.delete(`${urlK}/folder/del/${id}`)
      console.log(data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  async getPagination(params) {
    try {
      const request = {
        page: params.page,
        count: params.count,
      }
      const { data } = await axios.post(
        `${urlK}/mail/box/${params.boxId}`,
        request
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
