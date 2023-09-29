import axios from 'axios'
import store from '../store'

export default class Cities {
  constructor(url) {
    this.url = url
  }

  async getList(url, paramsQuery) {
    try {
      const { data } = await axios.post(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain,
        },
      })

      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getDetail(url, paramsQuery) {
    try {
      const { data } = await axios.get(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getApi(url, paramsQuery) {
    try {
      const { data } = await axios.post(`${url}`, paramsQuery, {
        headers: {
          'Content-Type': 'text/plain'
        },
      })
      return data
    } catch (error) {
      console.log(error)
      //let errorText = ''
      //if (error?.response?.data?.message?.name)
      //  errorText = error?.response?.data?.message?.name
      //else if (error?.response?.data?.message)
      //  errorText = error?.response?.data?.message
      //else {
      //  errorText = error.message
      //}
      //store.commit('alert/show', {
      //  type: 'error',
      //  content: `Ошибка: ${errorText}`,
      //})
    }
  }

  async create(city) {
    console.log(city)
    try {
      const { data } = await axios.post(`users/api/admin/addCity`, city)
      const newCity = data.createCity
      store.commit('alert/show', {
        type: 'success',
        content: `Город ${newCity.name} успешно добавлен`,
        duration: 2000,
      })
      if (!newCity) {
        return null
      }

      return {
        id: newCity.id,
        name: newCity.name,
        latitude: newCity.latitude,
        longitude: newCity.longtitude,
      }
    } catch (error) {
      console.log(error)
      let errorText = ''
      if (error?.response?.data?.message?.name)
        errorText = error?.response?.data?.message?.name
      else if (error?.response?.data?.message)
        errorText = error?.response?.data?.message
      else {
        errorText = error.message
      }
      store.commit('alert/show', {
        type: 'error',
        content: `Ошибка: ${errorText}`,
      })
    }
  }

  async update(id, city) {
    try {
      const { data } = await axios.put(
        `users/api/admin/city/${id}?name=${city.name}`
      )
      console.log(data)
      const updatedCity = data.city[0]
      store.commit('alert/show', {
        type: 'success',
        content: `Город успешно изменен на ${city.name}`,
        duration: 2000,
      })
      if (!updatedCity) {
        return null
      }
      console.log(updatedCity)
      return {
        id: updatedCity.id,
        name: updatedCity.name,
        latitude: updatedCity.latitude,
        longitude: updatedCity.longtitude,
      }
    } catch (error) {
      console.log(error)
      let errorText = ''
      if (error?.response?.data?.message?.name)
        errorText = error?.response?.data?.message?.name
      else if (error?.response?.data?.message)
        errorText = error?.response?.data?.message
      else {
        errorText = error.message
      }
      store.commit('alert/show', {
        type: 'error',
        content: `Ошибка: ${errorText}`,
      })
    }
  }

  async delete(city) {
    try {
      const response = await axios.delete(
        `users/api/admin/delCityId?city_id=${city.id}`
      )
      console.log(response)
      store.commit('alert/show', {
        type: 'success',
        content: `Город: ${city.name} успешно удален`,
        duration: 2000,
      })
    } catch (error) {
      const errorText = error.message
      store.commit('alert/show', {
        type: 'error',
        content: `Ошибка: ${errorText}`,
      })
    }
  }
}
