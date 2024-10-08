import { defineComponent, ref, computed, onMounted, emit } from 'vue'
import Dropzone from '@/components/Dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

const Form6 = defineComponent({
  name: 'Form6',
  components: {
    Dropzone,
    TextInfo,
    PersTitle,
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
    const loading = ref(false)
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: data.entity.account_name,
      },
      // obj: {
      //   key: 'Объект',
      //   value: data.entity.object_name,
      // },
    }
    // let getNameDoc = (docID) => {
    //   return docs_spr[docID]
    // }

    // onMounted(() => {
    //
    // })
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let isLoadedImage = ref(false)
    onMounted(() => {
      data.data.docs.length
        ? (isLoadedImage.value = true)
        : (isLoadedImage.value = false)
    })

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)

    let addFiles = (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      isLoadedImage.value = true

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: data.entity.id,
              doc_id: data.data.dosc ? data.data.dosc[0].id : 3,
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
      // loadImage()
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
    // const { makeRequest: changeStatus } = useRequest({
    //   context,
    //   request: () =>
    //     store.dispatch('taskModule/setPartTask', {
    //       status: 2,
    //       data: {
    //         personal_id: data.entity.id,
    //         process_id: data.task.process_id,
    //         task_id: data.task.id,
    //         parent_action: data.task.id,
    //       },
    //     }),
    // })
    let resultOnew
    const { makeRequest: delInfoAFile } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/updateFileData', {
          id: data.data.dosc ? data.data.dosc[0].id : 1,
          del: 1,
        }),
    })
    let sendTaskFinish = async () => {
      loading.value = true
      const { makeRequest: changeStatus } = useRequest({
        context,
        successMessage: 'Успешно',
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              personal_id: data.entity.id,
              process_id: data.task.process_id,
              task_id: data.task.id,
              docs_id: [3],
              parent_action: data.task.id,
            },
          }),
      })
      if (!data.data.docs.length) {
        delInfoAFile()
        listRequestsForUpload.value
          .at()()
          .then((data) => {
            resultOnew = data.result
          })
          .then(() => {
            Promise.all(listRequestsForUpload.value)
              .then((data) => {
                return changeStatus()
              })
              .then(() => {
                ctx.emit('closePopup')
                ctx.emit('getItems')
              })
          })
      } else {
        const { success } = await changeStatus()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
      loading.value = false
    }
    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      listDisbledDocuments,
      disableFinishState,
      sendTaskFinish,
      isLoadedImage,
      textInfo,
      loading,
    }
  },
})
export default Form6
