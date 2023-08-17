import axios from "axios";
import store from '../store';
export default class Shedules {
  constructor(url) {
    this.url = url;
  }

  async getDay() {
    try {
      const { data } = await axios.get(`users/api/getAdminScheduleForDay/21/2023/05/16`)
      const shedulesDay = data
      if (!shedulesDay) {
        return null;
      }
      return { shedulesDay }
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

  async getMonth(id, month, year) {
    try {
      const { data } = await axios.get(`users/api/getScheduleForMonthByIndex/${id}/${month}/${year}`)
      const shedulesMonth = data
      if (!shedulesMonth) {
        return null;
      }
      return { shedulesMonth }
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

  async getServices(requestData) {
    try {
      const { data } = await axios.post(`users/api/getMasterServices`, requestData)
      const Services = data
      if (!Services) {
        return null;
      }
      return { Services }
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

  async getWorkspace(requestData) {
    try {
      const { data } = await axios.post(`users/api/getMastersWorkspaces`, requestData)
      const Workspace = data
      if (!Workspace) {
        return null;
      }
      return { Workspace }
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
    
  async create(city) {
    console.log(city)
    try {
      const { data } = await axios.post(`users/api/admin/cities`, city)
      const newCity = data.city
      store.commit('alert/show', { type: 'success', content: `Город ${newCity.name} успешно добавлен`, duration: 2000 })
      if (!newCity) {
        return null;
      }
  
      return {
        id: newCity.id,
        name: newCity.name,
        latitude: newCity.location.coordinates[0],
        longitude: newCity.location.coordinates[1],
      };
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

  async updateRegular(year, month, day, requestBody) {
    try {
      const { data } = await axios.post(`users/api/createOrUpdateRegularSchedule/${year}/${month}/${day}`, requestBody)
      const shedulesDay = data
      store.commit('alert/show', { type: 'success', content: `Расписание успешно изменено`, duration: 2000 })
      if (!shedulesDay) {
        return null;
      }
      return { shedulesDay }
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

  async updateFlex(year, month, day, requestBody) {
    try {
      const { data } = await axios.post(`users/api/createOrUpdateFlexSchedule/${year}/${month}/${day}`, requestBody)
      const shedulesDay = data
      store.commit('alert/show', { type: 'success', content: `Расписание успешно изменено`, duration: 2000 })
      if (!shedulesDay) {
        return null;
      }
      return { shedulesDay }
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

  async update(id, requestBody) {
    try {
      const { data } = await axios.patch(`users/api/admin/editProfileClient?user_id=${id}`, requestBody)
      const shedulesDay = data
      store.commit('alert/show', { type: 'success', content: `Клиент успешно изменен`, duration: 2000 })
      if (!shedulesDay) {
        return null;
      }
      return { shedulesDay }
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

  async delete(city) {
    try {
      const response = await axios.delete(`users/api/admin/city/${city.id}`);
      console.log(response)
      store.commit('alert/show', { type: 'success', content: `Город: ${city.name} успешно удален`, duration: 2000 })
    } catch(error) {
      const errorText = error.message
      store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
    }
    
  }
}
