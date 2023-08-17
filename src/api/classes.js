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

    async create(classes, serivice) {
        console.log(classes, serivice)
        try {
            const {data} = await axios.post(`users/api/admin/chapters/${serivice}/classes`, classes)
            const newClasses = data
            store.commit('alert/show', {
                type: 'success',
                content: `Класс ${newClasses.title} успешно добавлен`,
                duration: 2000
            })
            if (!newClasses) {
                return null;
            }
            console.log(newClasses)
            return {
                id: newClasses.id,
                title: newClasses.title,
                chapter_id: newClasses.chapter_id,
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

    async update(id, classes) {
        console.log(classes)
        try {
            const {data} = await axios.put(`users/api/admin/chapters/${id}/classes/${classes.id}`, {title: classes.title})
            console.log(data)
            const updatedChapter = data
            store.commit('alert/show', {
                type: 'success',
                content: `Класс успешно изменен на ${classes.title}`,
                duration: 2000
            })
            if (!updatedChapter) {
                return null;
            }
            return {
                id: updatedChapter.id,
                title: updatedChapter.title,
                chapter_id: updatedChapter.chapter_id
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
            const response = await axios.delete(`users/api/admin/chapters/${id}/classes/${classes.id}`);
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
