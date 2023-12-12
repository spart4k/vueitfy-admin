import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'

const Form8 = defineComponent({
  name: 'Form8',
  components: {
    Dropzone,
    TextInfo,
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }) {
    const context = {
      root: {
        store,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: data.entity.account_name,
      },
      obj: {
        key: 'Объект',
        value: data.entity.object_name,
      },
    }
    // let getNameDoc = (docID) => {
    //   return docs_spr[docID]
    // }

    // onMounted(() => {
    //   console.log(docs_spr, getNameDoc)
    // })
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)

    onMounted(() => {
      data.data.docs_grajdanstvo.forEach((item, index) => {
        let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item }
          pasteObject['inProcess'] = true
          listDisbledDocuments.value = listDisbledDocuments.value + 1
        }
        listDocuments.value.push(pasteObject)
      })
    })

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)

    // const sendData = () => {
    //   console.log(selectName.value, file.value)
    //   let fileExt = file.value.type.split('/')[1]
    //   let fileName = `personal_doc_` + Date.now() + '.' + fileExt
    //   let form_data = new FormData()
    //   form_data.append('file', file.value)
    //   const { makeRequest } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/loadImage', {
    //         id: 1,
    //         folder: 'personal_doc',
    //         fileName: fileName,
    //         file: form_data,
    //       }),
    //     successMessage: 'Файл успешно загружен',
    //   })
    //   const { makeRequest: updateFileData } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/updateFileData', {
    //         id: 1,
    //         path_doc: `/personal_doc/${fileName}`,
    //       }),
    //   })

    //   const { makeRequest: changeStatus } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/setPartTask', {
    //         status: 2,
    //         data: {
    //           process_id: data.task.process_id,
    //           task_id: data.task.id,
    //           parent_action: data.task.id,
    //           transfer: true,
    //           manager_id: JSON.parse(data.entity.data_subvision)['leader'],
    //           personal_id: data.entity.personal_id,
    //           next: JSON.parse(data.task.dop_data).after_return
    //             ? JSON.parse(data.task.dop_data).after_return
    //             : true,
    //         },
    //       }),
    //   })
    //   const { makeRequest: pushSomeShit } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/setBid', {
    //         data: {
    //           id: data.entity.id,
    //           items: {
    //             rashod_vid_id: selectName.value.id,
    //             count: 1,
    //             price: price.value,
    //             name: '',
    //             is_debit: 1,
    //           },
    //         },
    //       }),
    //   })
    //   makeRequest()
    //   updateFileData()
    //   pushSomeShit()
    //   changeStatus()
    // }
    let docs_ids = ref([])
    let addFilesPatent = (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            personal_id: data.entity.id,
            doc_id: e.item,
            path_doc: `/files/personal_doc/${fileName}`,
            from_task: true,
          }),
      })

      const { makeRequest: loadImage } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })
      updateFileData()
      loadImage()
      disableFinishState.value = disableFinishState.value + 1
    }

    let addFiles = (e, options) => {
      console.log(e, options, listDocuments.value)

      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      let currentDropzone = listDocuments.value.find((x) => x.doc_id === e.item)
      docs_ids.value.push(e.item)
      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', { id: e.item, del: 1 }),
      })
      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            personal_id: data.entity.id,
            doc_id: e.item,
            path_doc: `/files/personal_doc/${fileName}`,
            from_task: true,
          }),
      })

      const { makeRequest: loadImage } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })

      // Когда запрос будет готов от Миши, нужно сформировать его по примеру ниже из старого кода. Функцию эту запушить в переменную, которая при нажаити на кнопку вызывает функции запросов в цикле
      // Добавить эот запрос в массив запросов нужно по условию, код закомментирован
      const { makeRequest: createFillScanProcess } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/startProcess', {
            parent_process: data.task.process_id,
            process_id: 1,
            parent_action: data.task.process_id,
            type_parent_action: 2,
            account_id: data.task.to_account_id,
            personal_id: data.entity.id,
            docs_id: docs_ids.value,
          }),
        successMessage: 'Файл успешно загружен',
      })

      // $.ajax('/personal/create_fill_scan_process', {
      //   method: "POST",
      //   data: { parent_process: <?php echo $task['process_id']; ?>,
      //           process_id: 1,
      //           account_id: <?php echo $task['to_account_id']; ?>,
      //           personal_id: <?php echo $entity['id']; ?>,
      //           docs_id: docs_id,
      //           parent_action: <?php echo $task['id']; ?>,
      //           type_parent_action: 2
      //   },
      //   success: function() {

      //   }
      let additionalRequestFlag
      if (
        e.item != 7 &&
        e.item != 8 &&
        e.item != 11 &&
        e.item != 12 &&
        e.item != 16 &&
        e.item != 18 &&
        e.item != 20 &&
        e.item != 21
      ) {
        additionalRequestFlag = true
      }
      console.log(listDocuments.value)
      if (!currentDropzone.inProcess) {
        listRequestsForUpload.value.push(
          delInfoAFile,
          updateFileData,
          loadImage
        )
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        if (additionalRequestFlag) {
          listRequestsForUpload.value.push(createFillScanProcess)
        }
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
        if (additionalRequestFlag) {
          listRequestsForUpload.value.push(createFillScanProcess)
        }
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        listDisbledDocuments.value = listDisbledDocuments.value - 1
      }
      console.log(listRequestsForUpload.value.length)
    }

    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
      listRequestsForUpload.value = []
    }

    let sendTaskFinish = () => {
      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              task_id: data.task.id,
              parent_action: data.task.id,
            },
          }),
      })

      changeStatus()
    }
    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      addFilesPatent,
      disableFinishState,
      textInfo,
      sendTaskFinish,
    }
  },
})
export default Form8
