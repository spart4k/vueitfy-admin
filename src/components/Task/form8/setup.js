import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const Form8 = defineComponent({
  name: 'Form8',
  components: {
    Dropzone,
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
    // let getNameDoc = (docID) => {
    //   return docs_spr[docID]
    // }

    // onMounted(() => {
    //   console.log(docs_spr, getNameDoc)
    // })
    let aaaaa = 1
    let listDocuments = ref([])

    onMounted(() => {
      data.data.docs_grajdanstvo.forEach((item, index) => {
        let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item }
          pasteObject['inProcess'] = true
        }
        listDocuments.value.push(pasteObject)
      })
    })

    let listRequestsForUpload = []
    let file = ref('')

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

    let addFiles = (e, awdwdw) => {
      // file.value = e[0]
      console.log(e, awdwdw)
    }

    const sendData = () => {}
    return {
      addFiles,
      sendData,
      listDocuments,
      aaaaa,
    }
  },
})
export default Form8
