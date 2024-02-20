import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
} from 'vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import DropZone from '@/components/Dropzone/default/index.vue'
import IconDelete from '@/components/Icons/delete/delete.vue'
import { methods } from 'vue2-dropzone'

const Form11 = defineComponent({
  name: 'Form11',
  components: {
    DropZone,
    IconDelete,
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
    const dropzoneOptions = ref({
      withoutSave: false,
      folder: 'tmp',
      //url: 'https://httpbin.org/post',
      //url: '/save/:folder/:file',
      url: 'http://10.63.1.132:5000/file/save/act/TESTFILE.jpg',
      autoProcessQueue: false,
      autoDiscover: false,
      acceptedFiles: 'image/*',
      thumbnailWidth: 150,
      // maxFilesize: props.options.maxSize ? props.options.maxSize : 10,
      // maxFiles: props.options.countFiles ? props.options.countFiles : 1,
      // addRemoveLinks: props?.options?.removeble ? true : false,
      dictDefaultMessage: 'Переместите или выберите файл',
      // acceptedFiles: props.options?.acceptedFiles,
      // clickable: props.readonly ? false : true,
      //dictRemoveFile: 'delete',
      //clickable: true,
      //previewsContainer: false,
      // headers: { "My-Awesome-Header": "header value" }
    })

    //Variables
    const account_id = computed(() => store.state.user.account_id)
    const chied_id = computed(() => store.state.user.chied_id)
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let sss = JSON.parse(data.task.dop_data)
    let file = ref(null)
    let comment = ref('')
    let listRequestsForUpload = ref([])
    let docs_ids = ref([])
    let disabledDocumentsAcc = ref(0)
    let refds = ref(0)
    let errors = ref({
      isActive: false,
      message: 'Ошибка',
    })
    let isDocs = ref(false)
    let dropZone = ref(null)

    onMounted(() => {
      // sss.docs_id.forEach((item) => {
      //   let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
      //   if (pasteObject) {
      //     pasteObject['inProcess'] = true
      //   } else {
      //     pasteObject = { doc_id: item, inProcess: false }
      //   }
      //   listDocuments.value.push(pasteObject)
      // })
    })

    // let addFilesPatent = (e, options) => {
    //   let fileExt = e[0].type.split('/')[1]
    //   let fileName = `personal_doc_` + Date.now() + '.' + fileExt
    //   let form_data = new FormData()
    //   form_data.append('file', e[0])

    //   const { makeRequest: updateFileData } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/updateFileData', {
    //         personal_id: data.entity.id,
    //         doc_id: e.item,
    //         path_doc: `/personal_doc/${fileName}`,
    //         from_task: true,
    //       }),
    //   })

    //   const { makeRequest: loadImage } = useRequest({
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
    //   updateFileData()
    //   loadImage()
    // }

    let addFiles = (e, options) => {
      file.value = e[0]
      let fileExt = file.value.type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', file.value)
      refds.value = 0
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

      listDocuments.value.push(e[0])

      // if (currentDropzone.inProcess) {
      //   listRequestsForUpload.value.push(
      //     delInfoAFile,
      //     updateFileData,
      //     loadImage
      //   )
      //   listDocuments.value[
      //     listDocuments.value.findIndex((x) => x.doc_id == e.item)
      //   ].inProcess = false
      // } else {
      //   listRequestsForUpload.value.push(updateFileData, loadImage)
      //   listDocuments.value[
      //     listDocuments.value.findIndex((x) => x.doc_id == e.item)
      //   ].inProcess = false
      // }

      isDocs.value = 1
      file.value = null
    }

    const removeFile = (fileID) => {
      console.log('REMOVE', fileID)

      listRequestsForUpload.value = listRequestsForUpload.value.filter(
        (item, ID) => ID !== fileID
      )
      listDocuments.value = listDocuments.value.filter(
        (item, ID) => ID !== fileID
      )

      if (listRequestsForUpload.value.length == 0) {
        refds.value = 0
      }
    }

    const sendDocuments = () => {
      // listRequestsForUpload.value.forEach((elem, index) => {
      //   elem()
      // })
      let newFile = listDocuments.value[listDocuments.value.length - 1]
      listRequestsForUpload.value = listDocuments.value
      refds.value = 1
      isDocs.value = 0

      // console.log(listDocuments.value[0])
      // console.log(listRequestsForUpload.value)

      console.log('NEWFIle', newFile)

      if (
        listRequestsForUpload.value.every((file) => file.name !== newFile.name)
      )
        console.log('Файлы совпадают')

      dropZone.value.clearDropzone()
    }

    let addDisabledDocuments = (elem) => {
      let keyOfObject = listDocuments.value.findIndex(
        (x) => x.doc_id == elem.item
      )
      listDocuments.value[keyOfObject].inProcess = true
      disabledDocumentsAcc.value + 1
    }

    let sendTaskFinish = async () => {
      let keyOfObjectSend = {}
      listDocuments.value.forEach((elem, index) => {
        for (const key in elem) {
          keyOfObjectSend[elem.doc_id] = !elem.inProcess
        }
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: account_id,
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
      file,
      isDocs,
      addFiles,
      removeFile,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      // addFilesPatent,
      comment,
      dropZone,
      dropzoneOptions,
      sendTaskFinish,
      addDisabledDocuments,
      disabledDocumentsAcc,
      emplyeeFired,
      errors,
      refds,
    }
  },
})
export default Form11
