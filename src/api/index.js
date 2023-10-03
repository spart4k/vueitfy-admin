import Selects from './selects'
import Navmenu from './navmenu'
// import Mails from './mails'
//import Form from './form'
//import List from './list'
//import Login from './login'
//import axios from 'axios'

//axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicm9sZSI6M30.gLnZw77ArH70L8tiiXYZXcOn-0LnQXDsgNMdjRC9RUM`

// 8080/users
// 5000/appointment
// 3001/review

const selectsApi = new Selects()
const navmenuApi = new Navmenu()
// const mailsApi = new Mails()
//const form = new Form()
//const list = new List()
//const login = new Login()

export { selectsApi, navmenuApi }
