import Dropzone from '@/components/Dropzone/default'
import Vue, {
  defineComponent,
  ref,
  computed,
  onMounted,
  toRef,
  reactive,
} from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import Popup from '@/components/Popup/index.vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import {
  stringField,
  selectField,
  checkboxField,
  autocompleteField,
} from '@/utils/fields.js'
// import { addFields, editFields } from '@/pages/zayavka/index.js'
import _ from 'lodash'
import DocForm from '@/components/Task/el/DocForm/index.vue'

import useView from '@/compositions/useView.js'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'

// import config from '@/components/Task/form8/form.js'

const Form8 = defineComponent({
  name: 'Form38',
  components: {
    Dropzone,
    TextInfo,
    Popup,
    PersTitle,
    DocForm,
  },

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    // const proxyConfig = ref(_.cloneDeep(config))
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
    configRouteConvert({
      config: config,
      route: 'form_id',
      newPath: 'zayavka-add',
      settings: {
        oldPath: 'add',
      },
    })

    const context = {
      root: {
        store,
      },
    }
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      // obj: {
      //   key: 'Объект',
      //   value: props.data.entity.object_name,
      // },
    }
    const expensesForm = ref(null)
    const docFormRef = ref(null)
    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)

    const popupForm = ref({
      isShow: false,
    })

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)
    const attachedDocsValid = computed(() => {
      let counter = null
      // return docFormRef.value.docRows.every((el) => el.isCorrect)
      docFormRef?.value?.docRows.forEach((el) => {
        if (el.isCorrect) counter++
      })
      const medDocs = docFormRef?.value?.docRows.flatMap((el) => {
        if (el.document.doc_id === 27 || el.document.doc_id === 11) {
          return el
        } else {
          return []
        }
      })
      const medDocsAttached = medDocs?.some((el) => el.isCorrect)
      return counter >= docFormRef?.value?.docRows.length - 1 && medDocsAttached
    })
    const isValid = computed(
      () =>
        attachedDocsValid.value && patent[5] && patent[15] && hasRashod.value
    )
    // const sendData = () => {
    //
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
    //           process_id: props.data.task.process_id,
    //           task_id: props.data.task.id,
    //           parent_action: props.data.task.id,
    //           transfer: true,
    //           manager_id: JSON.parse(props.data.entity.data_subvision)['leader'],
    //           personal_id: props.data.entity.personal_id,
    //           next: JSON.parse(props.data.task.dop_data).after_return
    //             ? JSON.parse(props.data.task.dop_data).after_return
    //             : true,
    //         },
    //       }),
    //   })
    //   const { makeRequest: pushSomeShit } = useRequest({
    //     context,
    //     request: () =>
    //       store.dispatch('taskModule/setBid', {
    //         data: {
    //           id: props.data.entity.id,
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

    let docs_ids = ref([])
    let addFilesPatent = async (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: props.data.entity.id,
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
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })
      // const updateFileData()
      await loadImage()
      console.log(patent[e.item])
      const { result } = await updateFileData()
      console.log(result)
      patent[e.item] = result
      disableFinishState.value = disableFinishState.value + 1
    }

    const patent = reactive({
      5: null,
      15: null,
    })

    const setZayavkaItems = () => {
      config.detail.tabs[0].fields = _.cloneDeep(
        zayavkaConfigOrig.detail.tabs[0].fields
      )

      const from_task_8 = stringField({
        label: 'Кол-во',
        name: 'from_task_8',
        placeholder: '',
        class: [''],
        value: true,
        position: {
          cols: 12,
          sm: 2,
        },
        bootstrapClass: [''],
        isShow: {
          value: true,
        },
      })

      const process_id = stringField({
        label: 'Кол-во',
        name: 'process_id',
        placeholder: '',
        value: props.data.task.process_id,
        class: [''],
        position: {
          cols: 12,
          sm: 2,
        },
        bootstrapClass: [''],
        isShow: {
          value: true,
        },
      })

      const task_id = stringField({
        label: 'Кол-во',
        name: 'task_id',
        placeholder: '',
        class: [''],
        value: props.data.task.id,
        position: {
          cols: 12,
          sm: 2,
        },
        bootstrapClass: [''],
        isShow: {
          value: true,
        },
      })

      config.detail.tabs[0].fields.push(from_task_8, process_id, task_id)

      const fieldsChanges = {
        vector_id: {
          readonly: true,
        },
        status_zr: {
          value: 2,
        },
        category_zr: {
          value: 8,
          readonly: true,
        },
        direction_id: {
          value: JSON.parse(props.data.entity.direction_json)[0],
          readonly: true,
        },
        personal_zr: {
          value: props.data.entity.id,
          readonly: true,
        },
        on_yourself: {
          readonly: true,
        },
        is_migr: {
          value: true,
        },
        'btn-decrease': {
          readonly: true,
        },
        'btn-increase': {
          readonly: true,
        },
        from_task_8: {
          value: true,
        },
        personal_object_zr: {
          value: JSON.parse(dopData.value).object_id,
        },
        personal_account_zr: {
          value: props.data.task.from_account_id,
        },
      }
      const addConfig = config.detail.tabs[0]
      Object.keys(fieldsChanges).forEach((key) => {
        let field = addConfig.fields.find((x) => x.name === key)
        if (fieldsChanges[key].value) field.value = fieldsChanges[key].value
        if (fieldsChanges[key].readonly)
          field.readonly = fieldsChanges[key].readonly
      })
      addConfig.lists.push(
        {
          alias: 'rashod_vid',
          filter: [
            {
              field: 'category_zr',
              alias: 'rashod_category_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
        {
          alias: 'permissions_zr',
          filter: [
            {
              field: 'direction_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
        {
          alias: 'personal_object_zr',
          filter: [
            {
              field: 'direction_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'personal_zr',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        },
        {
          alias: 'personal_account_zr',
          filter: [
            {
              field: 'direction_id',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'personal_zr',
              value: '',
              source: 'formData',
              type: 'num',
            },
            {
              field: 'personal_object_zr',
              value: '',
              source: 'formData',
              type: 'num',
            },
          ],
        }
      )

      // const object_zr = addConfig.fields.find((el) => el.name === 'object_zr')
      // object_zr.value = 2
      const docsSpr = { 7: 51, 8: 52, 11: 55, 16: 54, 18: 43, 19: 50, 23: 44 }
      // console.log(listDocuments.value)
      const filledDocs = docFormRef?.value?.docRows.flatMap((el) => {
        if (el.isCorrect) {
          return el.document
        } else {
          return []
        }
      })
      console.log(filledDocs)
      const arr = filledDocs
      const filterArray = arr.reduce((acc, item) => {
        if (docsSpr[item.doc_id]) acc.push(docsSpr[item.doc_id])
        return acc
      }, [])
      const btnIndex = addConfig.fields.findIndex(
        (x) => x.id === 'btn-decrease'
      )
      console.log(filterArray)
      filterArray?.forEach((item, index) => {
        if (!index) {
          const rashod_vid = addConfig.fields.find(
            (x) => x.name === 'rashod_vid'
          )
          const count = addConfig.fields.find((x) => x.name === 'count')
          const vds = addConfig.fields.find((x) => x.name === 'vds')
          rashod_vid.value = item
          rashod_vid.readonly = true
          count.value = '1'
          count.readonly = true
          vds.value = true
          vds.readonly = true
        } else {
          const insertItems = [
            selectField({
              label: 'Наименование',
              name: `rashod_vid%${index}`,
              notSend: true,
              placeholder: '',
              prescription: 'items',
              class: [''],
              value: item,
              readonly: true,
              items: [],
              selectOption: {
                text: 'name',
                value: 'id',
              },
              position: {
                cols: 12,
                sm: 5,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Кол-во',
              name: `count%${index}`,
              notSend: true,
              placeholder: '',
              readonly: true,
              prescription: 'items',
              value: '1',
              class: [''],
              position: {
                cols: 12,
                sm: 2,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Стоимость',
              name: `price%${index}`,
              notSend: true,
              placeholder: '',
              readonly: undefined,
              prescription: 'items',
              class: [''],
              position: {
                cols: 12,
                sm: 3,
              },
              validations: { required },
              bootstrapClass: [''],
            }),
            checkboxField({
              label: 'ВДС',
              name: `vds%${index}`,
              notSend: true,
              value: true,
              prescription: 'items',
              placeholder: '',
              readonly: true,
              class: [''],
              position: {
                cols: 12,
                sm: 2,
              },
              bootstrapClass: [''],
            }),
            stringField({
              label: 'Точное наименование',
              name: `exact_name%${index}`,
              notSend: true,
              placeholder: '',
              readonly: undefined,
              prescription: 'items',
              class: [''],
              position: {
                cols: 12,
                sm: 12,
              },
              bootstrapClass: [''],
            }),
          ]
          addConfig.fields.splice(btnIndex + 5 * (index - 1), 0, ...insertItems)
        }
      })
    }

    const pushToZayavka = () => {
      if (props.data.data?.zayavka?.id) {
        router.push({
          name: 'main/:id/:form_id',
          params: {
            form_id: props.data.data?.zayavka?.id,
          },
        })
      } else {
        router.push({
          name: 'main/:id/add',
        })
        setZayavkaItems()
      }
      console.log(router, route)
      popupForm.value.isShow = true
    }
    const { makeRequest: createFillScanProcess } = useRequest({
      context,
      request: (doc_id) =>
        store.dispatch('taskModule/startProcess', {
          parent_process: props.data.task.process_id,
          process_id: 1,
          parent_action: props.data.task.process_id,
          type_parent_action: 2,
          account_id: props.data.task.to_account_id,
          personal_id: props.data.entity.id,
          docs_id: doc_id,
        }),
      successMessage: 'Файл успешно загружен',
    })
    const attachedFile = ref(false)
    let addFiles = (e, document) => {
      console.log(e, document)
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      let currentDropzone = listDocuments.value.find((x) => x.doc_id === e.item)
      docs_ids.value.push(e.item)
      const { makeRequest: delInfoAFile } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: { id: e.item, del: 1 },
          }),
      })

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            data: {
              personal_id: props.data.entity.id,
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
            folder: 'personal_doc',
            fileName: fileName,
            file: form_data,
          }),
        successMessage: 'Файл успешно загружен',
      })

      // Когда запрос будет готов от Миши, нужно сформировать его по примеру ниже из старого кода. Функцию эту запушить в переменную, которая при нажаити на кнопку вызывает функции запросов в цикле
      // Добавить эот запрос в массив запросов нужно по условию, код закомментирован

      let additionalRequestFlag
      if (
        e.item != 7 &&
        e.item != 8 &&
        e.item != 11 &&
        e.item != 12 &&
        e.item != 16 &&
        e.item != 18 &&
        e.item != 20 &&
        e.item != 21
      ) {
        additionalRequestFlag = true
      }
      console.log('process')
      listRequestsForUpload.value.push({
        delInfoAFile,
        updateFileData,
        loadImage,
        document,
      })
      document.inProcess = true
      attachedFile.value = true
    }
    const { makeRequest: updateDopData } = useRequest({
      context,
      request: (doc_ids) => {
        return store.dispatch('taskModule/updateDopData', {
          id: props.data.task.id,
          dop: {
            doc_ids,
          },
        })
      },
      successMessage: 'Успешно',
    })

    const sendDocuments = async () => {
      const newDocIds = []
      const attachedDocs = docFormRef.value.docRows.flatMap((doc) => {
        console.log(doc, Object.keys(doc.basketFiles).length)
        if (Object.keys(doc.basketFiles).length) {
          return doc
        } else {
          return []
        }
      })
      await Promise.all(
        attachedDocs.map(async (doc) => {
          console.log(doc)
          if (doc.document.path_doc) {
            await doc.listRequestsForUpload[0].delInfoAFile()
          }
          const res = await doc.listRequestsForUpload[0].loadImage()
          const docRes = await doc.listRequestsForUpload[0].updateFileData()
          if (docRes.result) {
            newDocIds.push(docRes.result)
            doc.document.path_doc = '/personal_doc/' + doc.basketFiles.fileName
            doc.listRequestsForUpload[0].clearBasket()
            doc.isCorrect = true
            // doc.document.newId = docRes.result
            // await createFillScanProcess(docRes.result)
            listDisbledDocuments.value--
            doc.folderPanel = undefined
          }
        })
      )
      console.log(newDocIds)
      // await Promise.all(
      //   listRequestsForUpload.value.map(async (doc, index) => {
      //     console.log(doc)
      //     if (doc.document.path_doc) {
      //       await doc.delInfoAFile()
      //     }
      //     const res = await doc.loadImage()
      //     const docRes = await doc.updateFileData()
      //     if (docRes.result) {
      //       doc.document.inProcess = false
      //       const searchedDoc = listDocuments.value.find(
      //         (el) => el.id === doc.document.id
      //       )
      //       searchedDoc.inProcess = false
      //       Vue.set(doc, 'document', doc.document)
      //       Vue.set(doc.document, 'inProcess', false)
      //       console.log(doc.document.inProcess)
      //       doc.document.newId = docRes.result
      //       // doc.document.newId = docRes.result
      //       // await createFillScanProcess(docRes.result)
      //       listDisbledDocuments.value--
      //     }
      //   })
      // )
      if (!loadedDocs) {
        loadedDocs = []
      }
      console.log(loadedDocs, newDocIds)
      loadedDocs.value = [...newDocIds, ...loadedDocs]
      console.log(loadedDocs)
      await updateDopData(loadedDocs.value)
      // newDocIds.value = []
      // attachedFile.value = false
    }
    const canAttach = computed(() => {
      return docFormRef.value?.docRows.some(
        (el) => Object.keys(el.basketFiles).length
      )
    })
    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }

    let sendTaskFinish = async () => {
      console.log(patent)
      await createFillScanProcess([patent[5], patent[15]])
      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
            },
          }),
      })
      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }
    const docs = ref([])
    const dopData = ref(
      Object.assign({}, toRef(props.data.task, 'dop_data')).value
    )
    const hasRashod = ref(JSON.parse(dopData.value).rashod_id)
    let loadedDocs = JSON.parse(dopData.value).doc_ids
    // const { doc_ }
    onMounted(() => {
      props.data.data.docs_id.forEach((item, index) => {
        let pasteObject = props.data.data.docs.find(
          (doc) => doc.doc_id === item
        )
        if (pasteObject) {
          pasteObject['inProcess'] = false
        } else {
          pasteObject = { doc_id: item }
          pasteObject['inProcess'] = true
          listDisbledDocuments.value = listDisbledDocuments.value + 1
        }
        listDocuments.value.push(pasteObject)
        console.log(listDocuments.value)
      })
      // console.log(docFormRef.value)

      if (
        config.detail &&
        config.detail.type === 'popup' &&
        route.meta?.mode?.length >= 2
      ) {
        if (!route.params.form_id) setZayavkaItems()
        popupForm.value.isShow = true
      }
    })

    return {
      addFiles,
      listDocuments,
      listRequestsForUpload,
      sendDocuments,
      listDisbledDocuments,
      addFilesPatent,
      disableFinishState,
      textInfo,
      sendTaskFinish,
      popupForm,
      Popup,
      docs: props.data.data.docs_id.map((el) => {
        return {
          doc_id: el,
        }
      }),
      closePopupForm,
      pushToZayavka,
      expensesForm,
      config,
      attachedFile,
      patent,
      docsData: props.data.data.docs,
      listNames: {
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
        26: 'ID карта стр.2',
        27: 'ОМС',
      },
      docFormRef,
      canAttach,
      loadedDocs,
      isValid,
      attachedDocsValid,
      hasRashod,
      dopData,
    }
  },
})
export default Form8
