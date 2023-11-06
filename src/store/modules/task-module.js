// import TaksService from '@/api/TaksService.js'

import {
  getTask,
  setTask,
  setFile,
  updateDataFile,
  // changeStatusAndData,
  startProcess,
  putTask,
  setBid,
} from '@/api/TaskService'
//import axios from 'axios'

const taskModule = {
  namespaced: true,
  actions: {
    async getTask(_, url) {
      const result = await getTask('task/get/' + url)
      console.log(result)
      return result
    },

    // Получение информации о тарифе для заполнения полей
    async getServicePrice(_, params) {
      const result = await getTask('get/service_price?' + params)
      console.log(result)
      return result
    },

    async setBid(_, data) {
      console.log(data)
      const result = await setBid('set/data/zayavka', data.data)
      console.log(result)
      return result
    },

    async setPartTask(_, data) {
      console.log(data)
      const result = await putTask('task/update/status', data)
      console.log(result)
      return result
    },

    async changeStatusTasks(_, data) {
      console.log(data)
      const result = await putTask('task/update/status', data.data) // TODO: определить формат
      console.log(data)
      // const result = await putTask('task/update/status', data)
      console.log(result)
      return result
    },

    // async changeStatusTasks(_, data) {
    //   console.log(data)
    //   const result = await changeStatusAndData('task/update/status', data.data)
    //   console.log(data)
    // },
    // Здесь методы для отправки фотки на сервер с доп. запросом об инфе

    // =============================================================
    async updateFileData(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
      console.log(data)
      const result = await updateDataFile('set/data/personal_doc', data)
      return result
    },

    // /task/start/process

    async startProcess(_, data) {
      console.log(data)
      const result = await startProcess('task/start/process', data)
      return result
    },

    async loadImage(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg
      console.log(data)
      const result = await setFile(
        `file/save/${data.folder}/${data.fileName}`,
        data.file
      )
      return result
    },

    // =============================================================

    async setPersonalData(_, data) {
      const result = await setTask('set/data/personal', data.data)
      console.log(result)
      return result
    },

    async setPersonalDocData(_, data) {
      const result = await setTask('set/data/personal_doc_data', data.data)
      console.log(result)
      return result
    },

    async setSaveDocs(_, data) {
      const result = await setTask('set/personal/save_docs', data.data)
      console.log(result)
      return result
    },

    // Отправка банковских реквизитов
    async setBankData(_, data) {
      const result = await setTask('set/data/personal_bank', data.data)
      console.log(result)
      return result
    },

    // не понял пока, что за метод)
    async setStartStep(_, data) {
      const result = await setTask('task/start/step', data)
      console.log(result)
      return result
    },

    async setPersonalTarget(_, data) {
      const result = await setTask('set/data/personal_target', data)
      console.log(result)
      return result
    },

    async setDataPayment(_, data) {
      const result = await setTask('set/data/payment', data)
      console.log(result)
      return result
    },

    async getPaymentId(_, url) {
      const result = await getTask('get/payment/' + url)
      console.log(result)
      return result
    },

    async setUserKey(_, data) {
      const result = await setTask('set/data/user_keys', data)
      console.log(result)
      return result
    },

    async addKeyToPersonal(_, data) {
      const result = await setTask('set/personal/add_key_to_personal', data)
      console.log(result)
      return result
    },
  },
}

export default taskModule
