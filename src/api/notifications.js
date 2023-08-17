import axios from "axios";
import store from '../store';

export default class Notifications {
    constructor(url) {
        this.url = url;
    }

    async get() {
        try {
            const {data} = await axios.get(`users/api/admin/getNotifications`)
            return data
        } catch (error) {
            this.alertError(error)
        }
    }

    async create(requestData) {
        try {
            await axios.post(`users/api/admin/sendNotification`, requestData)
            store.commit('alert/show', {type: 'success', content: `Уведомления успешно отправлены`, duration: 2000})
        } catch (error) {
            this.alertError(error)
        }
    }

    async update(requestData) {
        try {
            await axios.post(`users/api/admin/updateNotification`, requestData)
            store.commit('alert/show', {type: 'success', content: `Уведомление успешно изменено`, duration: 2000})
        } catch (error) {
            this.alertError(error)
        }
    }

    async delete(requestData) {
        try {
            await axios.post(`users/api/admin/deleteNotification`, requestData)
            store.commit('alert/show', {type: 'success', content: `Уведомление успешно удалено`, duration: 2000})
        } catch (error) {
            this.alertError(error)
        }
    }

    alertError(error) {
        let errorText
        if (error?.response?.data?.message?.name) {
            errorText = error?.response?.data?.message?.name
        } else if (error?.response?.data?.message) {
            errorText = error?.response?.data?.message
        } else {
            errorText = error.message
        }
        store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
    }
}
