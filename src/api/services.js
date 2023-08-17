import axios from "axios";
import store from '../store';

export default class Cities {
    constructor(url) {
        this.url = url;
    }

    async get() {
        console.log(this.url);
        try {
            const data = await axios.post(`users/api/getFirstNGenerationsOfChildren`, {
                "n": 4,
                "conditions": {
                    "floor": 0,
                }
            }).then((response) => {
                return response.data;
            });
            console.log(data);
            if (!data) {
                return [];
            }

            return (data || []).map((el) => (el));
        } catch (error) {
            let errorText = ''
            if (error?.response?.data?.message?.name) errorText = error?.response?.data?.message?.name
            else if (error?.response?.data?.message) errorText = error?.response?.data?.message
            else {
                errorText = error.message
            }
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }

    async create(chapter) {
        console.log(chapter)
        try {
            const {data} = await axios.post(`users/api/addOrEditServiceOrCategory`, chapter)
            const newChapter = data
            store.commit('alert/show', {type: 'success', content: `Услуга успешно добавлена`, duration: 2000})
            if (!newChapter) {
                return null;
            }

            return {newChapter};
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

    async update(id, service) {
        const {data} = await axios.put(`users/api/admin/service/${id}`, service, {
            headers: {"Content-Type": "multipart/form-data"},
        })
        console.log(data)
        const newService = data
        if (!newService) {
            return null;
        }

        return newService
    }


    async delete(id) {
        try {
            const response = await axios.get(`users/api/deleteServiceOrCategory/${id}`);
            console.log(response)
            store.commit('alert/show', {type: 'success', content: `Услуга успешна удалена`, duration: 2000})
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }
}
