import axios from "axios";
import store from '../store';

export default class Feeds {
    constructor(url) {
        this.url = url;
    }

    async get() {
        try {
            const {data} = await axios.get(`review/api/admin/getReviews?page=1&limit=9999`, {
                page: 1,
                limit: 9999,
            })
            if (!data || data.length === 0) {
                store.commit('alert/show', {type: 'warning', content: `В данный момент городов нет`})
                return [];
            }

            return data
        } catch (error) {
            console.log(error)
            let errorText = ''
            if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
            else if (error?.response?.data?.message) errorText = error?.response?.data?.message
            else {
                errorText = error.message
            }
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }
    }

    async create(city) {
        console.log(city)
        try {
            const {data} = await axios.post(`review/api/admin/cities`, city)
            const newCity = data.city
            store.commit('alert/show', {
                type: 'success',
                content: `Город ${newCity.name} успешно добавлен`,
                duration: 2000
            })
            if (!newCity) {
                return null;
            }

            return {
                id: newCity.id,
                name: newCity.name,
                latitude: newCity.location.coordinates[0],
                longitude: newCity.location.coordinates[1],
            };
        } catch (error) {
            console.log(error)
            let errorText = ''
            if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
            else if (error?.response?.data?.message) errorText = error?.response?.data?.message
            else {
                errorText = error.message
            }
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }


    }

    async update(id, data) {
        try {
            const response = await axios.patch(`review/api/admin/editFeedbackIdMaster/?feedback_id=${id}`, data)
            store.commit('alert/show', {type: 'success', content: `Запись успешно обновлена`, duration: 2000})
            if (!response) {
                return null;
            }
            return response;
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }

    async delete(city) {
        try {
            const response = await axios.delete(`review/api/admin/city/${city.id}`);
            console.log(response)
            store.commit('alert/show', {type: 'success', content: `Город: ${city.name} успешно удален`, duration: 2000})
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }
}
