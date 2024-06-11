import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/Dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'
import FormError from '@/components/Task/el/FormError/index.vue'

export default {
  name: 'Form13',
  components: {
    Dropzone,
    TextInfo,
    PersTitle,
    DocForm,
    FormError,
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: data.entity.account_name,
      },
    }
    //
    // onMounted(() => {
    //
    // })
    const account_id = computed(() => store.state.user.id)
    const chied_id = computed(() => store.state.user.chied_id)
    let listDocuments = ref([])
    const docFormRef = ref(null)
    const someReject = computed(() =>
      docFormRef?.value?.docRows?.some((el) => el.isRejected)
    )
    const isValid = computed(() => {
      if (status.value === 'Работает') {
        return someReject.value
          ? docFormRef?.value?.docRows?.every((el) => !el.isHold) &&
              comment.value
          : docFormRef?.value?.docRows?.every((el) => !el.isHold)
      } else if (status.value === 'Уволен') {
        return true
      } else {
        return false
      }
    })
    let listDisbledDocuments = ref(0)
    let sss = JSON.parse(data.task.dop_data)
    let comment = ref('')
    const commentData = JSON.parse(data.task.dop_data)['comment']
    onMounted(() => {
      for (let key in sss.docs_id) {
        console.log(key)
        let pasteObject
        pasteObject = data.data.docs.find((doc) => doc.doc_id == key)
        console.log(pasteObject)
        if (sss.docs_id[key] == 1) {
          pasteObject.inProcess = false
        } else {
          if (!pasteObject) {
            pasteObject = {}
            pasteObject.doc_id = key
            pasteObject.commentError = 'Документ не приложен. См. комментарий!'
          }
          pasteObject.isRejected = true
        }
        listDocuments.value.push(pasteObject)
      }
      // sss.docs_id.forEach((item) => {
      //   let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
      //   if (pasteObject) {
      //     pasteObject['inProcess'] = false
      //   } else {
      //     pasteObject = { doc_id: item, inProcess: true, hold: true }
      //   }
      //   listDocuments.value.push(pasteObject)
      // })
    })

    let listRequestsForUpload = ref([])

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
      updateFileData()
      loadImage()
    }
    let refds = ref(0)
    const status = ref('')
    const isFire = () => {
      status.value = 'Уволен'
    }
    const isWork = () => {
      status.value = 'Работает'
    }
    let addFiles = (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      refds.value + 1
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
      if (currentDropzone.inProcess) {
        listRequestsForUpload.value.push(
          delInfoAFile,
          updateFileData,
          loadImage
        )
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
      }
    }

    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
    }
    let disabledDocumentsAcc = ref(0)
    let addDisabledDocuments = (elem) => {
      let keyOfObject = listDocuments.value.findIndex(
        (x) => x.doc_id == elem.item
      )
      listDocuments.value[keyOfObject].inProcess = true

      disabledDocumentsAcc.value + 1
    }

    let sendTaskFinish = async () => {
      let keyOfObjectSend = {}
      docFormRef.value.docRows.forEach((elem, index) => {
        keyOfObjectSend[elem.document.doc_id] = elem.isCorrect ? 1 : 2
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        successMessage: 'Задача завершена',
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: account_id.value,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_id: data.entity.id,
              comment: comment.value,
              docs_id: keyOfObjectSend,
              account_id: data.task.from_account_id,
            },
          }),
      })
      sendDocuments()
      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    const { makeRequest: changeStatusNew } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            id: data.task.id,
          },
        }),
    })

    const { makeRequest: setStartStep } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setStartStep', {
          data: {
            process: 5,
            process_id: data.task['process_id'],
            step_id: 5,
            docs_id: JSON.parse(data.task.dop_data)['docs_id'],
            personal_id: data.entity['id'],
            // account_id - chief id
            account_id: chied_id,
            type_parent_action: 2,
            parent_action: data.entity['id'],
          },
        }),
    })

    let emplyeeFired = () => {
      changeStatusNew()
      setStartStep()
      ctx.emit('closePopup')
    }

    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      addFilesPatent,
      textInfo,
      comment,
      sendTaskFinish,
      addDisabledDocuments,
      listNames: data.data.docs_spr,
      disabledDocumentsAcc,
      emplyeeFired,
      refds,
      isValid,
      docFormRef,
      status,
      isFire,
      isWork,
      commentData,
      someReject,
    }
  },
}
