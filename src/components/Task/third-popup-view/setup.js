import Vue, { computed, defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import FormPopupPhoto from '@/components/Task/el/FormPopupPhoto/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

import store from '@/store'
const ThirdPopupView = defineComponent({
  name: 'ThirdPopupView',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    FormPopupPhoto,
    PersTitle,
  },
  props: {
    objectData: {
      type: Object,
    },
    data: {
      type: Object,
    },
  },
  setup({ data }, ctx) {
    const infoObj = {
      pasp: {
        key: 'key',
        value: 'value',
      },
    }
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
      // obj: {
      //   key: 'Объект',
      //   value: data.entity.object_name,
      // },
    }
    const account_id = computed(() => store.state.user.id)
    const isShowBtnArray = ref([])
    const isFormValid = ref(false)
    const isImgPopupOpen = ref(false)
    const confirmDocs = ref([])
    const editedDocs = ref({})
    let imagePreview = ref([])
    let imageShowPopup = ref('')
    let comment = ref('')

    let accForSend = ref(0)
    let setImageForPopup = (index) => {
      imageShowPopup.value = imagePreview.value[index]
    }
    // let sendFile
    data.data.docs.forEach((element, index) => {
      imagePreview.value.push(process.env.VUE_APP_STORE + element.path_doc)

      isShowBtnArray.value.push(true)
    })

    let watchForComment = computed({
      get: () => comment.value,
      set: (val) => {
        if (val && accForSend.value >= 0) {
          isFormValid.value = true
        } else {
          isFormValid.value = false
        }
        comment.value = val
      },
    })

    const addToDenied = (index) => {
      Vue.set(isShowBtnArray.value, index, false)
      accForSend.value = 1 + accForSend.value

      store.commit(
        'notifies/showMessage',
        {
          color: 'orange darken-2',
          content: 'Файл будет возвращен, необходимо указать комментарий!',
        },
        1000
      )
    }

    let sendDoneTask = async () => {
      const { makeRequest: doneRequest } = useRequest({
        context,
        request: () => {
          const docs_id = JSON.parse(data.task.dop_data).docs_id
          return store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              account_id: account_id.value,
              task_id: data.task.id,
              parent_action: data.task.parent_action,
              personal_id: data.entity.id,
              docs_id: docs_id,
              comment: comment.value,
            },
          })
        },
        successMessage: 'Файл успешно загружен',
      })

      const { success } = await doneRequest()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    let isLoadImage = ref(false)

    function uploadChangedFile(e, indexForPhoto) {
      let file = e.target.files[0]
      let fileReader = new FileReader()
      let form_data = new FormData()
      let fileExt = file.type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt

      fileReader.readAsDataURL(file)
      form_data.append('file', file)

      const { makeRequest: loadImage } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/loadImage', {
            // id: data.data.docs[0].id,
            id: 1,
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              id: data.data.docs[indexForPhoto].id,
              path_doc: `/personal_doc/${fileName}`,
            },
          }),
      })

      fileReader.onload = async function () {
        Vue.set(imagePreview.value, indexForPhoto, fileReader.result)
        Vue.set(isShowBtnArray.value, indexForPhoto, false)

        await updateFileData()
        await loadImage()
      }
      isLoadImage.value = true
    }

    return {
      infoObj,
      confirmDocs,
      editedDocs,
      imagePreview,
      isShowBtnArray,
      textInfo,
      isFormValid,
      isImgPopupOpen,
      imageShowPopup,
      comment,
      watchForComment,
      isLoadImage,
      account_id,
      uploadChangedFile,
      addToDenied,
      setImageForPopup,
      sendDoneTask,
    }
  },
})
export default ThirdPopupView
