import { defineComponent, ref, computed, onMounted } from 'vue'
import Dropzone from '@/components/Dropzone/default'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

const Form5 = defineComponent({
  name: 'Form5',
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
    const loading = ref(false)
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
      obj: {
        key: 'Объект',
        value: data.entity.object_name,
      },
    }
    // let getNameDoc = (docID) => {
    //   return docs_spr[docID]
    // }

    // onMounted(() => {
    //
    // })
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)
    let newSpr = [4, 14, 17, 25]
    onMounted(() => {
      if (data.data.docs) {
        for (let index = 0; index < newSpr.length; index++) {
          let pasteObject = data.data.docs.find(
            (doc) => doc.doc_id === newSpr[index]
          )

          if (pasteObject) {
            pasteObject['inProcess'] = false
          } else {
            pasteObject = {
              inProcess: true,
              doc_id: newSpr[index],
            }
            listDisbledDocuments.value = listDisbledDocuments.value + 1
          }
          listDocuments.value.push(pasteObject)
        }
      }

      // data.data.docs.forEach((item, index) => {
      //   let pasteObject = data.data.docs.find((doc) => doc.doc_id === item)
      //   if (pasteObject) {
      //     pasteObject['inProcess'] = false
      //   } else {
      //     pasteObject = { doc_id: item.doc_id }
      //     pasteObject['inProcess'] = true
      //     listDisbledDocuments.value = listDisbledDocuments.value + 1
      //   }
      //   listDocuments.value.push(pasteObject)
      // })
      //
    })

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)
    let docs_ids = ref([])
    let addFiles = (e, options) => {
      docs_ids.value.push(e.item)
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      let currentDropzone = listDocuments.value.find((x) => x.doc_id === e.item)

      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', { id: e.item, del: 1 }),
      })
      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: data.entity.id,
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
            personal_id: data.entity.id,
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
        // if (additionalRequestFlag) {
        //   listRequestsForUpload.value.push(createFillScanProcess)
        // }
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
        // if (additionalRequestFlag) {
        //   listRequestsForUpload.value.push(createFillScanProcess)
        // }
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        listDisbledDocuments.value = listDisbledDocuments.value - 1
      }
    }

    let sendTaskFinish = async () => {
      loading.value = true
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })

      const { makeRequest: preRequest } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPersonalDataWithoutTarget', {
            data: {
              id: data.task.entity_id,
              status: 3,
              unfinished: 0,
              is_passive: 0,
            },
          }),
      })
      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              personal_id: data.entity.id,
              process_id: data.task.process_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              manager_id: data.task.from_account_id,
              account_id: data.task.from_account_id,
              x5: data.entity.object_id == 9 ? 1 : 0,
            },
          }),

        // <?php echo $task['process_id']; ?>,
        //           task_id: <?php echo $task['id']; ?>,
        //           parent_action: <?php echo $task['id']; ?>,
        //           personal_id: <?php echo $entity['id']; ?>,
        //           manager_id: <?php echo $task['from_account_id']; ?>,
        //           account_id: <?php echo $task['from_account_id']; ?>,
        //           x5: getListValueByNameField('objects_all', <?php echo $entity['object_id']; ?>, 'subtype') == 9 ? 1 : 0
      })

      await preRequest()
      await changeStatus()
      const { makeRequest: createFillScanProcess } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/startProcess', {
            parent_process: data.task.process_id,
            process_id: 1,
            parent_action: data.task.process_id,
            type_parent_action: 2,
            account_id: data.task.to_account_id,
            personal_id: data.entity.id,
            docs_id: docs_ids.value,
          }),
        successMessage: 'Файл успешно загружен',
      })
      if (listRequestsForUpload.value.length) {
        await createFillScanProcess()
      }
      listRequestsForUpload.value = []

      // createFillScanProcess()

      ctx.emit('closePopup')
      ctx.emit('getItems')
      loading.value = false
    }
    let spr = {
      1: 'Паспорт',
      2: 'СНИЛС',
      3: 'Реквизиты карты',
      4: 'Регистрация',
      5: 'Патент',
      6: 'Паспорт стр.2',
      7: 'Перевод',
      8: 'Мед. книжка',
      9: 'Вид на жительство',
      10: 'Миграционная карта',
      11: 'ДМС',
      12: 'Рабочая виза',
      13: 'Чек-патент первичный',
      14: 'Регистрация стр. 2',
      15: 'Патент стр. 2',
      16: 'Фото',
      17: 'ИНН',
      18: 'Экзамен РФ',
      19: 'Чек-патент текущий',
      20: 'Дактилоскопия',
      21: 'Дактилоскопия стр. 2',
      22: 'Вид на жительство стр. 2',
      23: 'Медосмотр',
      24: 'ID карта',
      25: 'Ученический договор',
    }
    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      listDisbledDocuments,
      // addFilesPatent,
      disableFinishState,
      sendTaskFinish,
      spr,
      loading,
    }
  },
})
export default Form5
