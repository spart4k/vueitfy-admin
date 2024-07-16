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
  acceptSchets,
  updateDopData,
  sendAmmount,
  delCloseSchet,
  createZayavka,
  sendZayavkaItems,
  setDataServices,
  updateTmp,
  updatePersonalAccess,
  removeTmp,
  addTargetService,
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
      const result = await setBid('set/zayavka/close_schet', data)

      return result
    },

    async acceptSchets(_, data) {
      const result = await acceptSchets('set/zayavka/close_schet', data)

      return result
    },

    async updateDopData(_, data) {
      const result = await updateDopData('task/update/dop_data', data)
      return result
    },

    async updateTmp(_, data) {
      const result = await updateTmp('update/process/long/tmp_data', data)
      return result
    },

    async updatePersonalAccess(_, data) {
      const result = await updatePersonalAccess('update/personal/access', data)
      return result
    },

    async sendAmmount(_, data) {
      const result = await sendAmmount('set/data/zayavka', data)
      return result
    },
    async removeTmp(_, data) {
      const result = await removeTmp('delete/personal/expired_document', data)
      return result
    },
    async delCloseSchet(_, id) {
      const result = await delCloseSchet(`delete/close_schet/${id}`)
      return result
    },

    async setPartTask(_, data) {
      const result = await putTask('task/update/status', data)

      return result
    },

    async createZayavka(_, data) {
      const result = await createZayavka('create/zayavka/34_task', data)

      return result
    },
    async sendZayavkaItems(_, data) {
      const result = await sendZayavkaItems('set/zayavka/close', data)
      return result
    },

    async setDataServices(_, data) {
      const result = await setDataServices('set/target/services', data)
      return result
    },

    async addTargetService(_, data) {
      const result = await addTargetService('add/target/service/0', data)
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

    async processQuery(_, data) {
      const result = await updateTmp('update/tmp/process_query', data)

      return result
    },

    async queryDoc(_, data) {
      const result = await removeTmp('delete/personal/query_doc', data)

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
    async setTaskCustom(_, { url, body }) {
      const result = await setTask(url, body)

      return result
    },
  },
}

export default taskModule
