import axios from 'axios'

export default class Navmenu {
  async get() {
    try {
      const { data } = await axios.post(
        `http://api.personal-crm.ru//view/json/sys_navmenu`
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
