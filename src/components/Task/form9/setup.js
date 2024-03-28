import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/Dropzone/default'
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
  setup({ data }, ctx) {
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
    //
    // })
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let listNewChet = ref('')

    let clearDropzone = ref(null)

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)
    let isSetFilesCloseSchet = ref(false)
    let docs = ref(null)
    onMounted(() => {
      data.data.grajdanstvo.forEach((item, index) => {
        let pasteObject = data.data.docs_id.find((doc) => doc.doc_id === item)
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item }
          pasteObject['inProcess'] = true
          listDisbledDocuments.value = listDisbledDocuments.value + 1
        }
        listDocuments.value.push(pasteObject)
      })
      listNewChet.value = JSON.parse(data.data.zayavka.close_schet)
    })
    let removeFilesPatent = (e, options) => {}
    let sendCloseDocsSchet = (e) => {
      const { makeRequest: setDataZayavka } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setBid', {
            data: {
              id: Number(JSON.parse(data.task.dop_data).rashod_id),
              close_schet: listNewChet.value,
            },
          })
        },
        successMessage: 'Файл успешно загружен',
      })

      setDataZayavka()
      isSetFilesCloseSchet.value = false
      listOtherDoc.value.forEach((elem, index) => {
        elem()
      })
      listOtherDoc.value = []
      clearDropzone.value.clearDropzone()
    }
    let isSaveDocCloses = ref(false)
    let listOtherDoc = ref([])
    let addFilesPatent = (e, options) => {
      let objectForCloseChet
      let lastElem
      Object.values(e).forEach((elem, index) => {
        if (listNewChet.value.length) {
          lastElem = listNewChet.value.length
          objectForCloseChet = lastElem + 1
        }
        let fileExt = elem.type.split('/')[1]
        let fileName =
          `personal_doc_` +
          Date.now() +
          Math.floor(Math.random()) * Math.floor(Math.random()) +
          '.' +
          fileExt
        let form_data = new FormData()
        form_data.append('file', elem)
        listNewChet.value.push({
          id: listNewChet.value.length ? objectForCloseChet : 1,
          name: fileName,
          valid: 0,
        })

        const { makeRequest: updateFileData } = useRequest({
          context,
          request: () =>
            store.dispatch('taskModule/updateFileData', {
              personal_id: data.entity.id,
              // doc_id: e.item,
              path_doc: `/personal_doc/${fileName}`,
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
        listOtherDoc.value.push(updateFileData, loadImage)
        isSetFilesCloseSchet.value = true
      })

      // const { makeRequest: setDataZayavka } = useRequest({
      //   context,
      //   request: () =>
      //     store.dispatch('taskModule/setBid', {
      //       id: JSON.parse(data.task.dop_data).rashod_id,
      //       close_schet: listNewChet.value,
      //     }),
      //   successMessage: 'Файл успешно загружен',
      // })
      //   $.ajax('/common/save/zayavka', {
      //     method: "POST",
      //     data: {id: <?php echo $rashod['id']; ?>, close_schet: JSON.stringify(closeSchet)},
      //     success: function() {
      //         docsClose = [];
      //         slidePopup('Закрывающие документы успешно прикреплены!', 'success');
      //         $('#form_zayavka_close_dz .dz-preview').remove();
      //         $('#form_zayavka_close_dz').removeClass('dz-started');
      //         checkValid();
      //     }
      // })
    }

    let addFiles = (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      let currentDropzone = listDocuments.value.find((x) => x.doc_id === e.item)

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
            path_doc: `/personal_doc/${fileName}`,
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
      // const { makeRequest: createFillScanProcess } = useRequest({
      //   context,
      //   request: () =>
      //     store.dispatch('taskModule/loadImage', {
      //       id: 1,
      //       folder: 'personal_doc',
      //       fileName: fileName,
      //       file: form_data,
      //     }),
      //   successMessage: 'Файл успешно загружен',

      //   $.ajax('/personal/create_fill_scan_process', {
      //     method: "POST",
      //     data: { parent_process: <?php echo $task['process_id']; ?>,
      //             process_id: 1,
      //             account_id: <?php echo $task['to_account_id']; ?>,
      //             personal_id: <?php echo $entity['id']; ?>,
      //             parent_action: <?php echo $task['id']; ?>,
      //             type_parent_action: 2,
      //             docs_id: docs_id
      //     },
      //     success: function() {
      //         docsAdd = [];
      //         slidePopup('Документы успешно прикреплены!', 'success');
      //         checkValid();
      //     }
      // })
      // })
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

      if (!currentDropzone.inProcess) {
        listRequestsForUpload.value.push(
          delInfoAFile,
          updateFileData,
          loadImage
        )
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        // if (additionalRequestFlag) {
        //   listRequestsForUpload.value.push(createFillScanProcess)
        // }
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
        // if (additionalRequestFlag) {
        //   listRequestsForUpload.value.push(createFillScanProcess)
        // }
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        listDisbledDocuments.value = listDisbledDocuments.value - 1
      }
    }
    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
      listRequestsForUpload.value = []
      let newArray = []
      listDocuments.value.forEach((elem, index) => {
        newArray.push(ref(`docDropzone` + index))
      })
    }

    let sendTaskFinish = async () => {
      //   $.ajax('/common/save/personal', {
      //     method: "POST",
      //     data: {id: <?php echo $entity['id']; ?>, status: 5},
      //     success: function() {
      //     }
      // })
      // $.ajax('/task/change_status_task', {
      //     method: "POST",
      //     data: {status: 2, data: {
      //         process_id: <?php echo $task['process_id']; ?>,
      //         task_id: <?php echo $task['id']; ?>,
      //         parent_action: <?php echo $task['id']; ?>
      //     }},
      //     success: function (data) {
      //         slidePopup('Задача выполнена!', 'success');
      //         typeof dataTable['task'] != "undefined" ? dataTable['task'].ajax.reload() : dataTable[document.taskTable].ajax.reload();
      //         hideModal();
      //     }
      // })
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

      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }
    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      addFilesPatent,
      disableFinishState,
      sendTaskFinish,
      removeFilesPatent,
      sendCloseDocsSchet,
      isSetFilesCloseSchet,
      clearDropzone,
      listNewChet,
      docs,
    }
  },
})
export default Form8
