import axios from "axios";
import store from '../store';

export default class Chapters {
    constructor(url) {
        this.url = url;
    }

    async get() {
        try {
            const {data} = await axios(`users/api/admin/chapters`)
            console.log(data)
            console.log(data)
            if (!data || data.cities.length === 0) {
                store.commit('alert/show', {type: 'warning', content: `В данный момент городов нет`})
                return [];
            }

            return (data?.cities || []).map((el) => ({
                id: el.id,
                name: el.name,
                latitude: el.location.coordinates[0],
                longitude: el.location.coordinates[1],
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

    async create(categories, serivice) {
        console.log(categories, serivice)
        try {
            const {data} = await axios.post(`users/api/admin/chapters/${serivice}/categories`, categories)
            const newCategories = data
            store.commit('alert/show', {
                type: 'success',
                content: `Категория ${newCategories.title} успешно добавлена`,
                duration: 2000
            })
            if (!newCategories) {
                return null;
            }
            console.log(newCategories)
            return {
                id: newCategories.id,
                title: newCategories.title,
                chapter_id: newCategories.chapter_id,
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

    async update(id, categories) {
        console.log(categories)
        try {
            const {data} = await axios.put(`users/api/admin/chapters/${id}/categories/${categories.id}`, {title: categories.title})
            console.log(data)
            const updatedСategories = data
            store.commit('alert/show', {
                type: 'success',
                content: `Категория успешно изменена на ${categories.title}`,
                duration: 2000
            })
            if (!updatedСategories) {
                return null;
            }
            return {
                id: updatedСategories.id,
                title: updatedСategories.title,
                chapter_id: updatedСategories.chapter_id
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

    async delete(id, classes) {
        console.log(id, classes)
        try {
            const response = await axios.delete(`users/api/admin/chapters/${id}/categories/${classes.id}`);
            console.log(response)
            store.commit('alert/show', {
                type: 'success',
                content: `Класс: ${classes.title} успешно удалена`,
                duration: 2000
            })
            console.log(response.status)
            return response.status === 200
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }
}
