import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'

const Form13 = defineComponent({
  name: 'Form13',
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
    // console.log(typeof newString)
    // onMounted(() => {
    //   console.log(docs_spr, getNameDoc)
    // })
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let sss = JSON.parse(data.task.dop_data)
    let comment = ref('')

    onMounted(() => {
      sss.docs_id.forEach((item) => {
        let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item, inProcess: true }
        }
        listDocuments.value.push(pasteObject)
      })
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
      if (!currentDropzone.inProcess) {
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
      console.log(listRequestsForUpload.value.length)
      console.log(listDocuments.value)
    }

    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
    }

    let addDisabledDocuments = (elem) => {
      console.log(elem, listDocuments.value)
      let fwfwfw = listDocuments.value.findIndex((x) => x.item == elem.item)
      console.log(fwfwfw)
      listDocuments.value[fwfwfw].inProcess = true
    }

    let sendTaskFinish = () => {
      let wwwww = {}
      listDocuments.value.forEach((elem, index) => {
        for (const key in elem) {
          wwwww[elem.item] = !!elem.inProcess
        }
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: 25,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_id: data.entity.id,
              comment: comment.value,
              docs_id: wwwww,
              account_id: data.task.from_account_id,
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
      textInfo,
      comment,
      sendTaskFinish,
      addDisabledDocuments,
    }
  },
})
export default Form13
