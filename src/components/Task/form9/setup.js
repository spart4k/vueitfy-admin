import Vue, { defineComponent, ref, toRef, computed, onMounted } from 'vue'
import Dropzone from '@/components/Dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import DocAccepting from '@/components/Task/el/DocAccepting/index.vue'

const Form8 = defineComponent({
  name: 'Form9',
  components: {
    Dropzone,
    TextInfo,
    PersTitle,
    DocForm,
    DocAccepting,
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
    const docFormRef = ref(null)
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let listNewChet = ref([])
    const loading = ref(false)
    let clearDropzone = ref(null)

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)
    let isSetFilesCloseSchet = ref(false)
    let docs = ref(null)
    const getDocName = (id) => {
      return props.data.data.docs_spr[id]
    }
    const closeSchet = toRef(props.data.data.zayavka, 'close_schet')
    onMounted(() => {
      listDocuments.value = props.data.data.docs_grajdanstvo.map(
        (item, index) => {
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
          return pasteObject
        }
      )
      listNewChet.value = [...closeSchet.value]
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
      const newSchets = listNewChet.value
        .filter((el) => el.hasOwnProperty('index'))
        .map((el) => {
          return {
            ...el,
            name: el.path_doc,
          }
        })
      newSchets.forEach((el) => {
        closeSchet.value.push(el)
      })
      listNewChet.value = []
      clearDropzone.value.clearDropzone()
    }
    let isSaveDocCloses = ref(false)
    let listOtherDoc = ref([])
    let addFilesPatent = (e, options) => {
      let objectForCloseChet
      let lastElem
      Object.values(e).forEach((elem, index) => {
        // if (listNewChet.value.length) {
        lastElem = listNewChet.value.length
        objectForCloseChet = lastElem + 1
        // }
        let fileExt = elem.type.split('/')[1]
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
      const newDocIds = []
      const attachedDocs = docFormRef.value.docRows.flatMap((doc) => {
        if (Object.keys(doc.basketFiles).length) {
          return doc
        } else {
          return []
        }
      })
      await Promise.all(
        attachedDocs.map(async (doc) => {
          if (doc.document.path_doc) {
            await doc.listRequestsForUpload[0].delInfoAFile()
          }
          const res = await doc.listRequestsForUpload[0].loadImage()
          const docRes = await doc.listRequestsForUpload[0].updateFileData()
          if (docRes.result) {
            newDocIds.push(docRes.result)
            doc.document.path_doc = '/personal_doc/' + doc.basketFiles.fileName
            doc.listRequestsForUpload[0].clearBasket()
            doc.isCorrect = true
            // doc.document.newId = docRes.result
            // await createFillScanProcess(docRes.result)
            listDisbledDocuments.value--
            doc.folderPanel = undefined
          }
        })
      )
      await createFillScanProcess(newDocIds)
      newDocIds.value = []
      // attachedFile.value = false
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
    const canAttach = computed(() => {
      return docFormRef.value?.docRows.some(
        (el) => Object.keys(el.basketFiles).length
      )
    })

    const docsAttached = computed(() => {
      let result = false
      const hasDmsAndOms =
        props.data.data.docs_grajdanstvo.includes(27) &&
        props.data.data.docs_grajdanstvo.includes(11)
      const needDocumentsLength = hasDmsAndOms
        ? props.data.data.docs_grajdanstvo.length - 1
        : props.data.data.docs_grajdanstvo.length
      const attached = docFormRef.value?.docRows.filter((el) => el.isCorrect)

      if (hasDmsAndOms) {
        const dms = attached?.find((el) => el.document.doc_id == 11)
        const oms = attached?.find((el) => el.document.doc_id == 27)
        if ((dms || oms) && attached.length >= needDocumentsLength) {
          result = true
        } else {
          result = false
        }
      } else if (attached.length === needDocumentsLength) {
        result = true
      } else {
        result = false
      }
      return result
      // return docFormRef.value?.docRows.some(
      //   (el) => Object.keys(el.basketFiles).length
      // )
    })

    let sendTaskFinish = async () => {
      loading.value = true
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
              to_okk: true,
            },
          }),
      })

      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
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
      docs: props.data.data.docs,
      attachedFile,
      canAttach,
      docFormRef,
      getDocName,
      closeSchet,
      docsAttached,
      loading,
    }
  },
})
export default Form8
