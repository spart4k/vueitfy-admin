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

      return result
    },

    // Получение информации о тарифе для заполнения полей
    async getServicePrice(_, params) {
      const result = await getTask('get/service_price?' + params)

      return result
    },

    async setBid(_, data) {
      const result = await setBid('set/data/zayavka', data.data)

      return result
    },

    async setPartTask(_, data) {
      const result = await putTask('task/update/status', data)

      return result
    },

    //     POST /set/data/zayavka_items
    // body: {data['items']['id'], rashod_vid_id, price}

    async zayavkaItems(_, data) {
      const result = await setBid('set/data/zayavka_items', data)

      return result
    },

    async changeStatusTasks(_, data) {
      const result = await putTask('task/update/status', data.data) // TODO: определить формат

      // const result = await putTask('task/update/status', data)

      return result
    },

    // async changeStatusTasks(_, data) {
    //
    //   const result = await changeStatusAndData('task/update/status', data.data)
    //
    // },
    // Здесь методы для отправки фотки на сервер с доп. запросом об инфе

    // =============================================================
    async updateFileData(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg

      const result = await updateDataFile('set/data/personal_doc', data)
      return result
    },
    async updateFileDataNew(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg

      const result = await updateDataFile('set/data/personal', data)
      return result
    },

    // /task/start/process

    async startProcess(_, data) {
      const result = await startProcess('task/start/process', data)
      return result
    },

    async loadImage(_, data) {
      // file/save/personal_doc/personal_doc_1231412342134.jpg

      const result = await setFile(
        `file/save/${data.folder}/${data.fileName}`,
        data.file
      )
      return result
    },

    // =============================================================

    async setPersonalData(_, data) {
      const result = await setTask('set/data/personal_target', data)

      return result
    },

    async setPersonalDataWithoutTarget(_, data) {
      const result = await setTask('set/data/personal', data)

      return result
    },

    async setPersonalDocData(_, data) {
      const result = await setTask('set/data/personal_doc_data', data)

      return result
    },

    async setSaveDocs(_, data) {
      const result = await setTask('set/personal/save_docs', data.data)

      return result
    },

    // Отправка банковских реквизитов
    async setBankData(_, data) {
      const result = await setTask('set/data/personal_bank', data.data)

      return result
    },

    // не понял пока, что за метод)
    async setStartStep(_, data) {
      const result = await setTask('task/start/step', data)

      return result
    },

    async setPersonalTarget(_, data) {
      const result = await setTask('set/data/personal_target', data)

      return result
    },

    async setDataPayment(_, data) {
      const result = await setTask('set/data/payment', data)

      return result
    },

    async getPaymentId(_, url) {
      const result = await getTask('get/payment/' + url)

      return result
    },

    async setUserKey(_, data) {
      const result = await setTask('set/data/user_keys', data)

      return result
    },

    async addKeyToPersonal(_, data) {
      const result = await setTask('set/personal/key', data)

      return result
    },
  },
}

export default taskModule
