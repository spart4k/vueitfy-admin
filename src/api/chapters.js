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

    async create(chapter) {
        console.log(chapter)
        try {
            const {data} = await axios.post(`users/api/admin/chapter`, chapter, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            const newChapter = data
            store.commit('alert/show', {
                type: 'success',
                content: `Услуга ${newChapter.title} успешно добавлена`,
                duration: 2000
            })
            if (!newChapter) {
                return null;
            }

            return {
                id: newChapter.id,
                title: newChapter.title,
                classes_title: newChapter.classes_title,
                img: newChapter.img
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

    async update(id, chapter) {
        try {
            const {data} = await axios.put(`users/api/admin/chapter/${id}`, chapter, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

            })
            console.log(data)
            const updatedChapter = data
            store.commit('alert/show', {
                type: 'success',
                content: `Город успешно изменен на ${chapter.name}`,
                duration: 2000
            })
            if (!updatedChapter) {
                return null;
            }
            return updatedChapter
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

    async delete(chapter) {
        console.log(chapter)
        try {
            const response = await axios.delete(`users/api/admin/chapter/${chapter.id}`);
            console.log(response)
            store.commit('alert/show', {
                type: 'success',
                content: `Услуга: ${chapter.name} успешно удалена`,
                duration: 2000
            })
        } catch (error) {
            const errorText = error.message
            store.commit('alert/show', {type: 'error', content: `Ошибка: ${errorText}`})
        }

    }
}
