import Vue, { defineComponent, ref, computed, onMounted } from 'vue'
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
  setup(props, ctx) {
    const context = {
      root: {
        store,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      obj: {
        key: 'Объект',
        value: props.data.entity.object_name,
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
    let listNewChet = ref([])

    let clearDropzone = ref(null)

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)
    let isSetFilesCloseSchet = ref(false)
    let docs = ref(null)
    onMounted(() => {
      props.data.data.docs_grajdanstvo.forEach((item, index) => {
        let pasteObject = props.data.data.docs.find(
          (doc) => doc.doc_id === item
        )
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item }
          pasteObject['inProcess'] = true
          listDisbledDocuments.value = listDisbledDocuments.value + 1
        }
        listDocuments.value.push(pasteObject)
      })
      listNewChet.value = props.data.data.zayavka.close_schet
    })
    let removeFilesPatent = (e, options) => {}
    let sendCloseDocsSchet = async (e) => {
      const { makeRequest: setDataZayavka } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setBid', {
            data: {
              id: Number(JSON.parse(props.data.task.dop_data).rashod_id),
              close_schets: listNewChet.value.filter((el) =>
                el.hasOwnProperty('index')
              ),
            },
          })
        },
        successMessage: 'Файл успешно загружен',
      })
      await Promise.all(
        listOtherDoc.value.map(async (doc, index) => {
          await doc.loadImage()
          // await doc.updateFileData()
        })
      )

      await setDataZayavka()
      isSetFilesCloseSchet.value = false

      listOtherDoc.value = []
      listNewChet.value = []
      clearDropzone.value.clearDropzone()
    }
    let isSaveDocCloses = ref(false)
    let listOtherDoc = ref([])
    let addFilesPatent = (e, options) => {
      let objectForCloseChet
      let lastElem
      console.log(e)
      Object.values(e).forEach((elem, index) => {
        // if (listNewChet.value.length) {
        lastElem = listNewChet.value.length
        objectForCloseChet = lastElem + 1
        // }
        let fileExt = elem.type.split('/')[1]
        console.log(store.state.user)
        let fileName =
          `close_schet_` +
          Number(JSON.parse(props.data.task.dop_data).rashod_id) +
          '_' +
          store.state.user.id +
          '_' +
          Date.now() +
          Math.floor(Math.random()) * Math.floor(Math.random()) +
          '.' +
          fileExt
        let form_data = new FormData()
        form_data.append('file', elem)
        console.log(listNewChet.value)
        listNewChet.value.push({
          index: objectForCloseChet,
          path_doc: '/close_schet' + '/' + fileName,
        })

        const { makeRequest: updateFileData } = useRequest({
          context,
          request: () =>
            store.dispatch('taskModule/updateFileData', {
              data: {
                personal_id: props.data.entity.id,
                doc_id: e.item,
                path_doc: `/personal_doc/${fileName}`,
                from_task: true,
              },
            }),
        })

        const { makeRequest: loadImage } = useRequest({
          context,
          request: () =>
            store.dispatch('taskModule/loadImage', {
              id: 1,
              folder: 'close_schet',
              fileName: fileName,
              file: form_data,
            }),
          successMessage: 'Файл успешно загружен',
        })
        listOtherDoc.value.push({ updateFileData, loadImage })
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
    const { makeRequest: createFillScanProcess } = useRequest({
      context,
      request: (doc_id) =>
        store.dispatch('taskModule/startProcess', {
          parent_process: props.data.task.process_id,
          process_id: 1,
          parent_action: props.data.task.process_id,
          type_parent_action: 2,
          account_id: props.data.task.to_account_id,
          personal_id: props.data.entity.id,
          docs_id: doc_id,
        }),
      successMessage: 'Файл успешно загружен',
    })
    const attachedFile = ref(false)
    let docs_ids = ref([])
    let addFiles = (e, document) => {
      console.log(e, document)
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      let currentDropzone = listDocuments.value.find((x) => x.doc_id === e.item)
      docs_ids.value.push(e.item)
      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: { id: e.item, del: 1 },
          }),
      })

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: props.data.entity.id,
              doc_id: e.item,
              path_doc: `/personal_doc/${fileName}`,
              from_task: true,
            },
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
      console.log('process')
      listRequestsForUpload.value.push({
        delInfoAFile,
        updateFileData,
        loadImage,
        document,
      })
      document.inProcess = true
      attachedFile.value = true
    }

    const sendDocuments = async () => {
      await Promise.all(
        listRequestsForUpload.value.map(async (doc, index) => {
          console.log(doc)
          if (doc.document.path_doc) {
            await doc.delInfoAFile()
          }
          const res = await doc.loadImage()
          const docRes = await doc.updateFileData()
          if (docRes.result) {
            doc.document.inProcess = false
            const searchedDoc = listDocuments.value.find(
              (el) => el.id === doc.document.id
            )
            searchedDoc.inProcess = false
            Vue.set(doc, 'document', doc.document)
            Vue.set(doc.document, 'inProcess', false)
            console.log(doc.document.inProcess)
            doc.document.newId = docRes.result
            // doc.document.newId = docRes.result
            // await createFillScanProcess(docRes.result)
          }
        })
      )
      const acceptedDocs = listRequestsForUpload.value.flatMap((el) => {
        if (el.document.newId) return el.document.newId
        else return []
      })
      console.log(acceptedDocs)
      await createFillScanProcess(acceptedDocs)
      listRequestsForUpload.value = []
      attachedFile.value = false
    }
    // const sendDocuments = () => {
    //   listRequestsForUpload.value.forEach((elem, index) => {
    //     elem()
    //   })
    //   listRequestsForUpload.value = []
    //   let newArray = []
    //   listDocuments.value.forEach((elem, index) => {
    //     newArray.push(ref(`docDropzone` + index))
    //   })
    // }

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
              process_id: props.data.task.process_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              rashod_id: Number(JSON.parse(props.data.task.dop_data).rashod_id),
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
      attachedFile,
    }
  },
})
export default Form8
