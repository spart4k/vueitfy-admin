import axios from 'axios'

export default class Navmenu {
  async get() {
    try {
      const { data } = await axios.post(
        `/view/json/sys_navmenu`
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
