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
      return data
    } catch (error) {
      return error
    }
  }

  async getFolders() {
    try {
      const { data } = await axios.get(`${urlK}/folder`)
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

  async createBox(params) {
    try {
      const { data } = await axios.post(`${urlK}/box/new`, params)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async createFolder(params) {
    try {
      const { data } = await axios.post(`${urlK}/folder`, params)
      console.log(data)
      return data
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
        `${urlK}/mail/folder/${params.boxId}`,
        request
      )
      return data.data
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
