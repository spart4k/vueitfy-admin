import axios from "axios";
//import store from '../store';
export default class Cities {
    constructor(url) {
        this.url = url;
    }

    async add(params) {
        console.log(params)
        try {
            console.log(params)
            const formData = new FormData()
            for (var key in params) {
                formData.append(key, params[key]);
            }
            const {data} = await axios.post(`files/api/addFile`, formData)
            return data
        } catch (error) {
            console.log(error)

        }


    }

    async delete(params) {
        try {
            const {data} = await axios.post(`files/api/deleteFile`, {
                fileKey: params
            })
            console.log(data)
            //store.commit('alert/show', { type: 'success', content: `Город: ${city.name} успешно удален`, duration: 2000 })
        } catch (error) {
            //const errorText = error.message
            //store.commit('alert/show', { type: 'error', content: `Ошибка: ${errorText}` })
        }

    }
}
