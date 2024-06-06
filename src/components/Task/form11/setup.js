import Vue, {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
  toRef,
  watch,
} from 'vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import useView from '@/compositions/useView.js'
import { useRouter, useRoute } from 'vue-router/composables'
import DropZone from '@/components/Dropzone/default/index.vue'
import IconDelete from '@/components/Icons/delete/delete.vue'
import DocAccepting from '@/components/Task/el/DocAccepting/index.vue'
import { methods } from 'vue2-dropzone'
import FormError from '@/components/Task/el/FormError/index.vue'
import Popup from '@/components/Popup/index.vue'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import _ from 'lodash'

const Form11 = defineComponent({
  name: 'Form11',
  components: {
    DropZone,
    IconDelete,
    DocAccepting,
    Popup,
    FormError,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const attachedFile = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const { configRouteConvert } = useView()
    const config = _.cloneDeep(zayavkaConfigOrig)
    configRouteConvert({
      config: config,
      route: 'form_id',
      newPath: 'zayavka-edit',
      settings: {
        oldPath: 'id',
      },
    })
    const loading = ref(false)
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
    const account_id = computed(() => store.state.user.id)
    const chied_id = computed(() => store.state.user.chied_id)
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let dopData = JSON.parse(props.data.task.dop_data)
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
    const listOtherDoc = ref([])
    onMounted(() => {
      // dopData.docs_id.forEach((item) => {
      //   let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
      //   if (pasteObject) {
      //     pasteObject['inProcess'] = true
      //   } else {
      //     pasteObject = { doc_id: item, inProcess: false }
      //   }
      //   listDocuments.value.push(pasteObject)
      // })
      formatedSchets.value = props.data.data.zayavka.close_schet.map((el) => {
        return {
          ...el,
          path_doc: el.name,
        }
      })
    })
    const formatedSchets = ref([])
    const { makeRequest: delCloseSchet } = useRequest({
      context,
      request: (id) => store.dispatch('taskModule/delCloseSchet', id),
    })
    const listNewChet = ref([])
    let addFiles = (e, options) => {
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
          props.data.data.zayavka.id +
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
        listOtherDoc.value.push({ loadImage })
        attachedFile.value = true
        // isSetFilesCloseSchet.value = true
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

    const removeFile = (fileID) => {
      listDocuments.value = listDocuments.value.filter(
        (item, ID) => ID !== fileID
      )

      if (listDocuments.value.length <= 1) {
        refds.value = 0
      }
    }
    const propsSchets = toRef(props.data.data.zayavka, 'close_schet')
    watch(
      () => props.data.data.zayavka.close_schet,
      () => {
        formatedSchets.value = props.data.data.zayavka.close_schet.map((el) => {
          return {
            ...el,
            path_doc: el.name,
          }
        })
      }
    )
    let sendCloseDocsSchet = async (e) => {
      const { makeRequest: setDataZayavka } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setBid', {
            data: {
              id: props.data.data.zayavka.id,
              close_schets: listNewChet.value,
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
      await updateDopData()
      JSON.parse(attached_amount.value).attached = true
      ctx.emit('refreshData')
      formatedSchets.value = props.data.data.zayavka.close_schet.map((el) => {
        return {
          ...el,
          path_doc: el.name,
        }
      })
      console.log(formatedSchets.value)
      dropZone.value.clearDropzone()
    }

    const checkIdenticalFiles = (newFile) => {
      // if (
      //   !listDocuments.value.every((file) => file.name !== newFile.value?.name)
      // ) {
      //   errors.value = {
      //     isActive: true,
      //     message: 'Одинаковые файлы!!',
      //   }
      //   refds.value = 0
      // } else {
      //   errors.value.isActive = false
      //   refds.value = 1
      // }
    }

    let addDisabledDocuments = (elem) => {
      let keyOfObject = listDocuments.value.findIndex(
        (x) => x.doc_id == elem.item
      )
      listDocuments.value[keyOfObject].inProcess = true
      disabledDocumentsAcc.value + 1
    }

    const attached_amount = ref(
      Object.assign({}, toRef(props.data.task, 'dop_data')).value
    )
    const popupForm = ref({
      isShow: false,
    })
    const { makeRequest: updateDopData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/updateDopData', {
          id: props.data.task.id,
          dop: {
            attached: true,
          },
        })
      },
      successMessage: 'Успешно',
    })
    const pushToForm = (val) => {
      router.push({
        name: 'main/:id/:form_id',
        params: {
          id: route.params.id,
          form_id: val,
        },
      })
      popupForm.value.isShow = true
    }

    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }

    let sendTaskFinish = async () => {
      loading.value = true
      if (JSON.parse(attached_amount.value).attached && !comment.value) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Введите комментарий',
          timeout: 1000,
        })
        return
      }
      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              account_id: account_id.value,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              comment: comment.value,
              okk_id: props.data.task.from_account_id,
              rashod_id: props.data.data.zayavka.id,
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

    const { makeRequest: changeStatusNew } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            id: props.data.task.id,
          },
        }),
    })

    const { makeRequest: setStartStep } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setStartStep', {
          data: {
            process: 5,
            process_id: props.data.task['process_id'],
            step_id: 5,
            docs_id: JSON.parse(props.data.task.dop_data)['docs_id'],
            personal_id: props.data.entity['id'],
            // account_id - chief id
            account_id: chied_id,
            type_parent_action: 2,
            parent_action: props.data.entity['id'],
          },
        }),
    })
    const removedDocs = ref([])
    const removeDoc = async ({ id }, index) => {
      console.log(id, index)
      let isConfirmed = confirm(
        'Вы подтверждаете удаление документа под номером ' + index
      )
      if (isConfirmed) {
        await delCloseSchet(id)
        formatedSchets.value.splice(index, 1)
        removedDocs.value.push(id)
        store.commit('notifies/showMessage', {
          color: 'success',
          content: 'Документа ' + id + ' удален',
          timeout: 1000,
        })
        ctx.emit('refreshData')
      }
    }

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
      listDisbledDocuments,
      dopData,
      // addFilesPatent,
      comment,
      dropZone,
      dropzoneOptions,
      sendTaskFinish,
      docs: props.data.data.docs_id,
      addDisabledDocuments,
      disabledDocumentsAcc,
      emplyeeFired,
      errors,
      refds,
      formatedSchets,
      removeDoc,
      removedDocs,
      attachedFile,
      sendCloseDocsSchet,
      attached_amount,
      loading,
      FormError,
      propsSchets,
      pushToForm,
      popupForm,
      config,
      closePopupForm,
    }
  },
})
export default Form11
