import { defineComponent, ref, computed, onMounted, emit } from 'vue'
import Dropzone from '@/components/dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'

const Form6 = defineComponent({
  name: 'Form6',
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
        ctx,
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
    let isLoadedImage = ref(false)
    onMounted(() => {})

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)

    let addFiles = (e, options) => {
      console.log(e[0])
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      isLoadedImage.value = true
      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            id: data.data.dosc ? data.data.dosc[0].id : 1,
            del: 1,
          }),
      })

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            personal_id: data.entity.id,
            doc_id: data.data.dosc ? data.data.dosc[0].id : 1,
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
      if (data.data.dosc) {
        listRequestsForUpload.value.push(
          updateFileData,
          loadImage,
          ...(data.data.dosc && delInfoAFile)
        )
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
      }
    }

    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
      listRequestsForUpload.value = []
    }

    let sendTaskFinish = () => {
      sendDocuments()
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
      ctx.emit('closePopup')
    }
    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      disableFinishState,
      sendTaskFinish,
      isLoadedImage,
      textInfo,
    }
  },
})
export default Form6
