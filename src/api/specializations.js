import axios from "axios";
import store from '../store';
export default class Specializations {
  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const { data } = await axios.get(`users/api/admin/getSpecializations`)
      console.log(data)
      if (!data || data.length === 0) {
        store.commit('alert/show', { type: 'warning', content: `В данный момент специализайций нет` })
        return [];
      }
  
      return data
    } catch(error) {
      console.log(error)
      let errorText = ''
      if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
      else if (error?.response?.data?.message) errorText = error?.response?.data?.message
      else {
        errorText = error.message
      }
      store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
    }
  }

  async getMaster(id) {
    try {
      const { data } = await axios.get(`users/api/getUserPageById?user_id=${id}`)
      return data
    } catch(error) {
      console.log(error)
    }
  }

  async create(requestData) {
    try {
      const { data } = await axios.post(`users/api/admin/addSpecialization`, requestData)
      store.commit('alert/show', { type: 'success', content: `Специализация успешно добавлена`, duration: 2000 })
      if (!data) {
        return null;
      }
      return data;
    } catch(error) {
      console.log(error)
      let errorText = ''
      if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
      else if (error?.response?.data?.message) errorText = error?.response?.data?.message
      else {
        errorText = error.message
      }
      store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
    }
    

  }

  async update(id, requestData) {
    try {
      const { data } = await axios.patch(`users/api/admin/editSpecialization?id=${id}`, requestData)
      const updatedCity = data
      store.commit('alert/show', { type: 'success', content: `Специализация успешно изменена`, duration: 2000 })
      return updatedCity
    } catch(error) {
      console.log(error)
      let errorText = ''
      if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
      else if (error?.response?.data?.message) errorText = error?.response?.data?.message
      else {
        errorText = error.message
      }
      store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
    }
    
  }

  async delete(id) {
    try {
      const response = await axios.delete(`users/api/admin/delSpecialization?id=${id}`);
      console.log(response)
      store.commit('alert/show', { type: 'success', content: `Специализация успешно удалена`, duration: 2000 })
    } catch(error) {
      const errorText = error.message
      store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
    }
    
  }
}
