import axios from "axios";
import store from '../store';

export default class Clients {
    constructor(url) {
        this.url = url;
    }

    async get() {
        try {
            const {data} = await axios.post(`users/api/admin/getProfileClient`, {
                "email": "",
                "phone": "string",
                "page": 1,
                "count": 99999
            })
            console.log(data)
            if (!data || data.length === 0) {
                store.commit('alert/show', {type: 'warning', content: `В данный момент городов нет`})
                return [];
            }
            return (data || []).map((el) => ({
                id: el.id,
                aboutme: el.aboutme,
                avatarUrl: el.avatarUrl,
                cities_id: el.cities_id,
                dateOfBirth: el.birth_day,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
                email: el.email,
                emailValidate: el.emailValidate,
                lastName: el.last_name,
                name: el.name,
                phoneNumber: el.phone_number
            }));
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
            const {data} = await axios.post(`users/api/admin/cities`, city)
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

    async update(id, requestBody) {
        try {
            const {data} = await axios.patch(`users/api/admin/editProfileClient?user_id=${id}`, requestBody)
            const updatedClient = data
            store.commit('alert/show', {type: 'success', content: `Клиент успешно изменен`, duration: 2000})
            if (!updatedClient) {
                return null;
            }
            return {updatedClient}
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

    async delete(id) {
        try {
            const response = await axios.delete(`users/api/deleteUser?user_id=${id}`);
            console.log(response)
            store.commit('alert/show', {type: 'success', content: `Пользователь успешно удален`, duration: 2000})
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }
    }
}
