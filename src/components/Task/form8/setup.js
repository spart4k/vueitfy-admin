import { defineComponent, ref, computed, onMounted, toRef } from 'vue'
import Dropzone from '@/components/Dropzone/default'
import { useRoute, useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import Popup from '@/components/Popup/index.vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import { stringField, selectField, checkboxField } from '@/utils/fields.js'
import { addFields, editFields } from '@/pages/zayavka/index.js'
import _ from 'lodash'

import config from '@/components/Task/form8/form.js'

const Form8 = defineComponent({
  name: 'Form8',
  components: {
    Dropzone,
    TextInfo,
    Popup,
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
    const proxyConfig = ref(_.cloneDeep(config))

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

    let listDocuments = ref([])
    let listDisbledDocuments = ref(0)

    const popupForm = ref({
      isShow: false,
    })

    let listRequestsForUpload = ref([])
    let file = ref('')
    let disableFinishState = ref(0)

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
    let addFilesPatent = (e, options) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `personal_doc_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])

      const { makeRequest: updateFileData } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            personal_id: props.data.entity.id,
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
      updateFileData()
      loadImage()
      disableFinishState.value = disableFinishState.value + 1
    }

    const setZayavkaEdit = () => {
      const editFieldsProxy = _.cloneDeep(editFields)
      const editConfig = proxyConfig.value.detail.tabs[1]
      editConfig.fields = editFieldsProxy
    }

    const setZayavkaItems = () => {
      const addFieldsProxy = _.cloneDeep(addFields)
      const addConfig = proxyConfig.value.detail.tabs[0]
      addConfig.fields = addFieldsProxy

      const category = addConfig.fields.find((x) => x.name === 'category_zr')
      category.value = 8
      category.readonly = true

      const direction = addConfig.fields.find((x) => x.name === 'direction_id')
      direction.value = JSON.parse(props.data.entity.direction_json)[0]
      direction.readonly = true

      const vector = addConfig.fields.find((x) => x.name === 'vector_id')
      vector.readonly = true

      const personal = addConfig.fields.find((x) => x.name === 'personal_zr')
      personal.readonly = true
      personal.value = props.data.entity.id

      const yourself = addConfig.fields.find((x) => x.name === 'on_yourself')
      yourself.readonly = true

      const name = addConfig.fields.find((x) => x.name === 'name')
      name.value = props.data.entity.name

      const is_migr = addConfig.fields.find((x) => x.name === 'is_migr')
      is_migr.value = true

      const docsSpr = { 7: 51, 8: 52, 11: 55, 16: 54, 18: 43, 19: 50, 23: 44 }

      const arr = listDocuments.value.filter((x) => x.inProcess)
      const filterArray = arr.reduce((acc, item) => {
        if (docsSpr[item.doc_id]) acc.push(docsSpr[item.doc_id])
        return acc
      }, [])

      const btnIndex = addConfig.fields.findIndex(
        (x) => x.id === 'btn-decrease'
      )

      filterArray?.forEach((item, index) => {
        if (!index) {
          const rashod_vid = addConfig.fields.find(
            (x) => x.name === 'rashod_vid'
          )
          const count = addConfig.fields.find((x) => x.name === 'count')
          const vds = addConfig.fields.find((x) => x.name === 'vds')
          const btnDecrease = addConfig.fields.find(
            (x) => x.name === 'btn-decrease'
          )
          const btnIncrease = addConfig.fields.find(
            (x) => x.name === 'btn-increase'
          )
          btnDecrease.readonly = true
          btnIncrease.readonly = true
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
      console.log('data.data?.zayavka?.id', props.data)
      if (props.data.data?.zayavka?.id) {
        router.push({
          name: 'main/:id/:form_id',
          params: {
            id: route.params.id,
            form_id: props.data.data?.zayavka?.id,
          },
        })
        setZayavkaEdit()
      } else {
        router.push({
          name: 'main/:id/add',
        })
        setZayavkaItems()
      }
      popupForm.value.isShow = true
    }

    let addFiles = (e, options) => {
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
            personal_id: props.data.entity.id,
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

      // Когда запрос будет готов от Миши, нужно сформировать его по примеру ниже из старого кода. Функцию эту запушить в переменную, которая при нажаити на кнопку вызывает функции запросов в цикле
      // Добавить эот запрос в массив запросов нужно по условию, код закомментирован
      const { makeRequest: createFillScanProcess } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/startProcess', {
            parent_process: props.data.task.process_id,
            process_id: 1,
            parent_action: props.data.task.process_id,
            type_parent_action: 2,
            account_id: props.data.task.to_account_id,
            personal_id: props.data.entity.id,
            docs_id: docs_ids.value,
          }),
        successMessage: 'Файл успешно загружен',
      })

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
      if (!currentDropzone.inProcess) {
        listRequestsForUpload.value.push(
          delInfoAFile,
          updateFileData,
          loadImage
        )
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        if (additionalRequestFlag) {
          listRequestsForUpload.value.push(createFillScanProcess)
        }
      } else {
        listRequestsForUpload.value.push(updateFileData, loadImage)
        if (additionalRequestFlag) {
          listRequestsForUpload.value.push(createFillScanProcess)
        }
        listDocuments.value[
          listDocuments.value.findIndex((x) => x.doc_id == e.item)
        ].inProcess = false
        listDisbledDocuments.value = listDisbledDocuments.value - 1
      }
      console.log(listRequestsForUpload.value.length)
    }

    const sendDocuments = () => {
      listRequestsForUpload.value.forEach((elem, index) => {
        elem()
      })
      listRequestsForUpload.value = []
    }

    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }

    let sendTaskFinish = async () => {
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

    onMounted(() => {
      props.data.data.docs_grajdanstvo.forEach((item, index) => {
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
      })
      if (
        proxyConfig.value.detail &&
        proxyConfig.value.detail.type === 'popup' &&
        route.meta?.mode?.length === 2
      ) {
        if (route.params.form_id) setZayavkaEdit()
        else setZayavkaItems()
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
      closePopupForm,
      pushToZayavka,
      expensesForm,
      proxyConfig,
    }
  },
})
export default Form8
