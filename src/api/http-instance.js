import axios from "axios";
import router from "./router";
import store from "./store";




const httpInstance = axios.create({
  baseURL: 'http://api.personal-crm.ru/task/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // "Authorization": process.env.VUE_APP_API_TOKEN,
  },
});


export default httpInstance;