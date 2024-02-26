import Vue, { computed, defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import FormPopupPhoto from '@/components/Task/el/FormPopupPhoto/index.vue'
import store from '@/store'
const ThirdPopupView = defineComponent({
  name: 'ThirdPopupView',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    FormPopupPhoto,
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
    // let file = ref()
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
            docs_id,
            comment: comment.value,
          },
        })
      },
      successMessage: 'Файл успешно загружен',
    })
    let sendDoneTask = async () => {
      const { success } = await doneRequest()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    let isLoadImage = ref(false)
    const handleFileUpload = async (e, indexForPhoto) => {
      accForSend.value = accForSend.value - 1
      isLoadImage.value = true
      let file = e.target.files[0]

      let reader = new FileReader()
      reader.addEventListener(
        'load',
        async function () {
          Vue.set(imagePreview.value, indexForPhoto, reader.result)
          Vue.set(isShowBtnArray.value, indexForPhoto, false)

          const dataFrom = await makeRequest()
          const newVal = await newRequest()
        }.bind(this),
        false
      )

      reader.readAsDataURL(file)
      let form_data = new FormData()
      // file/save/personal_doc/personal_doc_1231412342134.jpg

      // Объект для отправки данных в самом конце формы

      // accaunt_id по дефолту полставить 25
      // $.ajax('/set/data/personal_doc', {
      //  method: "POST",
      //    data: {id: $doc['id'], path_doc: '/personal_doc/имя файла'
      //    success: function() {
      //     }
      //   })
      form_data.append('file', file)
      let fileExt = file.type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      // let dataFromDopData = JSO
      const { makeRequest } = useRequest({
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
      const { makeRequest: newRequest } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: { id: 1, path_doc: `/personal_doc/${fileName}` },
          }),
      })
    }

    const confirmDocs = ref([])
    const editedDocs = ref({})
    return {
      infoObj,
      confirmDocs,
      editedDocs,
      handleFileUpload,
      imagePreview,
      addToDenied,
      isShowBtnArray,
      textInfo,
      isFormValid,
      isImgPopupOpen,
      setImageForPopup,
      imageShowPopup,
      comment,
      sendDoneTask,
      watchForComment,
      isLoadImage,
      account_id,
    }
  },
})
export default ThirdPopupView
