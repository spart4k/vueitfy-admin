import Cities from './cities'
import Navmenu from './navmenu'
//import axios from 'axios'

//axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
//axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicm9sZSI6M30.gLnZw77ArH70L8tiiXYZXcOn-0LnQXDsgNMdjRC9RUM`

// 8080/users
// 5000/appointment
// 3001/review

export const tableApi = new Cities()
export const navmenuApi = new Navmenu()
