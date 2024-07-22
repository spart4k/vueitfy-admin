import { defineComponent, ref, computed, toRef, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import IconDelete from '@/components/Icons/delete/delete.vue'
import useRequest from '@/compositions/useRequest'
import DocAccepting from '@/components/Task/el/DocAccepting/index.vue'
import store from '@/store'
import ZayavkaItem from '@/components/Task/el/ZayavkaItem/index.vue'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import useView from '@/compositions/useView.js'
import { stringField, selectField, checkboxField } from '@/utils/fields.js'
import _ from 'lodash'
import { required } from '@/utils/validation'
import Popup from '@/components/Popup/index.vue'

const form10 = defineComponent({
  name: 'Form10',
  components: {
    IconDelete,
    DocAccepting,
    ZayavkaItem,
    Popup,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    // Variables
    let sum = ref(0)
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
    const { configRouteConvert } = useView({})
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
    let errors = ref({
      isActive: false,
      message: 'Ошибка',
    })
    const popupForm = ref({
      isShow: false,
    })
    const zayavkaItems = ref([])
    // Моковые данные
    let files = ref([
      {
        id: 0,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'fsdfsdf.png',
      },
      {
        id: 423,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: '2rrr.jpeg',
      },
      {
        id: 5345,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'gdfgfdggerf3.png',
      },
      {
        id: 24,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'fff12dzx.png',
      },
      {
        id: 52,
        link: 'https://grizly.club/uploads/posts/2022-12/1670171873_grizly-club-p-shablon-pasporta-rf-1.jpg',
        name: 'iujk.png',
      },
    ])
    // const accepted_amount = ref('')
    const accepted = ref(JSON.parse(props.data.task.dop_data).accept)
    // Удаление файла
    const removeFile = (fileID) => {
      // TODO: доделать
      files.value = files.value.filter((file, id) => fileID !== id)
    }
    const formatedSchets = () =>
      props.data.data.zayavka.close_schet.map((el) => {
        return {
          ...el,
          path_doc: el.name,
        }
      })
    // Изменение суммы в поле
    const answer = async () => {
      if (!allChecked.value || !comment.value) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Введите комментарий',
          timeout: 1000,
        })
        return
      }
      const { makeRequest: sendAnswer } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 6,
            data: {
              process_id: props.data.task.process_id,
              // manager_id: account_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              rashod_id: Number(props.data.data.zayavka.id),
              comment: comment.value,
              // personal_id: props.data.entity.id,
              // docs_id: keyOfObjectSend,
              account_id: props.data.task.from_account_id,
              okk_id: props.data.task.to_account_id,
              cancel_close: schets.value.filter((el) => el.valid === 1),
            },
          }),
      })
      await setDataZayavka()
      const { success } = await sendAnswer()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }
    const changeSum = (e) => (sum.value = e)
    const comment = ref('')
    const { makeRequest: setDataZayavka } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/acceptSchets', {
          data: {
            id: props.data.task.entity_id,
            close_schets: schets.value,
          },
        })
      },
      successMessage: 'Файл успешно загружен',
    })

    const { makeRequest: updateDopData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/updateDopData', {
          id: props.data.task.id,
          dop: {
            accept: true,
          },
        })
      },
      successMessage: 'Успешно',
    })
    const { makeRequest: sendAmmountRequest } = useRequest({
      context,
      successMessage: 'Успешно применено',
      request: () =>
        store.dispatch('taskModule/sendAmmount', {
          data: {
            id: props.data.entity.id,
            accepted_amount: accepted_amount.value,
          },
        }),
    })
    let sendTaskFinish = async () => {
      loading.value = true
      // let keyOfObjectSend = {}
      // listDocuments.value.forEach((elem, index) => {
      //   for (const key in elem) {
      //     keyOfObjectSend[elem.doc_id] = !elem.inProcess
      //   }
      // })
      const items = zayavkaItems.value.map((el) => {
        if (!el.formData.accept_sum) {
          el.formData.accept_sum = el.formData.price * el.formData.count
        }
        return el.formData
      })
      const { makeRequest: sendZayavkaItems } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/sendZayavkaItems', {
            data: {
              items,
              id: props.data.data.zayavka.id,
            },
          }),
      })
      if (!zayavkaValid.value && props.data.data.zayavka.payment_type === 3) {
        zayavkaItems.value.forEach((el) => {
          if (!el.formData.accept_sum) {
            el.errorTextShow = true
          }
        })
        return
      } else if (zayavkaValid.value) {
        // send
        const resultZayavka = await sendZayavkaItems()
        if (resultZayavka.code === 2) {
          store.commit('notifies/showMessage', {
            color: 'success',
            content: 'Что то пошло не так',
            timeout: 1000,
          })
          return
        }
      }
      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              // manager_id: account_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              // personal_id: props.data.entity.id,
              // docs_id: keyOfObjectSend,
              // account_id: props.data.task.from_account_id,
            },
          }),
      })
      // sendDocuments()
      const { success } = await changeStatus()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
    }
    const formRowsRef = ref([])
    const start_accepted_amount = toRef(
      props.data.data.zayavka,
      'accepted_amount'
    )
    const accepted_amount = ref(
      Object.assign({}, toRef(props.data.data, 'zayavka').value).accepted_amount
    )
    const sendAmmount = async () => {
      await sendAmmountRequest()
      start_accepted_amount.value = accepted_amount.value
    }
    const schets = computed(() => {
      return formRowsRef.value.map((el, elIndex) => {
        return {
          ...props.data.data.zayavka.close_schet[elIndex],
          valid: el.isShowAdd ? 1 : 2,
        }
      })
    })
    const zayavkaNameList = ref({})
    const getListZayavka = async () => {
      const { makeRequest: makeRequestList } = useRequest({
        context,
        request: (data) =>
          store.dispatch('list/get', [
            {
              alias: 'rashod_vid',
              filter: [
                {
                  alias: 'rashod_category_id',
                  value: [props.data.entity.rashod_category_id],
                  type: 'num',
                },
              ],
            },
          ]),
      })
      const { data } = await makeRequestList()
      if (data) {
        zayavkaNameList.value = data.rashod_vid
      }
    }
    const allChecked = computed(() =>
      formRowsRef.value.every((el) => !el.isShowAdd || !el.isShowCansel)
    )
    const zayavkaValid = computed(() => {
      return zayavkaItems.value.every((el) => el.formData.accept_sum)
    })
    const acceptSchets = async () => {
      await setDataZayavka()
      await updateDopData()
      if (props.data.data.zayavka.payment_type !== 3) {
        await sendTaskFinish()
      }

      accepted.value = true
    }
    const addUnconfirmed = (item) => {
      item.valid = 1
    }
    const addConfirmed = (item) => {
      item.valid = 2
    }
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
          value: props.data.data.zayavka.direction_id,
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
        }
      )

      const docsSpr = {
        7: 51,
        8: 52,
        11: 55,
        16: 54,
        18: 43,
        19: 50,
        23: 44,
        27: 67,
      }
      // const arr = listDocuments.value.filter((x) => x.inProcess)
      // const filterArray = arr.reduce((acc, item) => {
      //   if (docsSpr[item.doc_id]) acc.push(docsSpr[item.doc_id])
      //   return acc
      // }, [])
      // const btnIndex = addConfig.fields.findIndex(
      //   (x) => x.id === 'btn-decrease'
      // )

      // filterArray?.forEach((item, index) => {
      //   if (!index) {
      //     const rashod_vid = addConfig.fields.find(
      //       (x) => x.name === 'rashod_vid'
      //     )
      //     const count = addConfig.fields.find((x) => x.name === 'count')
      //     const vds = addConfig.fields.find((x) => x.name === 'vds')
      //     rashod_vid.value = item
      //     rashod_vid.readonly = true
      //     count.value = '1'
      //     count.readonly = true
      //     vds.value = true
      //     vds.readonly = true
      //   } else {
      //     const insertItems = [
      //       selectField({
      //         label: 'Наименование',
      //         name: `rashod_vid%${index}`,
      //         notSend: true,
      //         placeholder: '',
      //         prescription: 'items',
      //         class: [''],
      //         value: item,
      //         readonly: true,
      //         items: [],
      //         selectOption: {
      //           text: 'name',
      //           value: 'id',
      //         },
      //         position: {
      //           cols: 12,
      //           sm: 5,
      //         },
      //         validations: { required },
      //         bootstrapClass: [''],
      //       }),
      //       stringField({
      //         label: 'Кол-во',
      //         name: `count%${index}`,
      //         notSend: true,
      //         placeholder: '',
      //         readonly: true,
      //         prescription: 'items',
      //         value: '1',
      //         class: [''],
      //         position: {
      //           cols: 12,
      //           sm: 2,
      //         },
      //         validations: { required },
      //         bootstrapClass: [''],
      //       }),
      //       stringField({
      //         label: 'Стоимость',
      //         name: `price%${index}`,
      //         notSend: true,
      //         placeholder: '',
      //         readonly: undefined,
      //         prescription: 'items',
      //         class: [''],
      //         position: {
      //           cols: 12,
      //           sm: 3,
      //         },
      //         validations: { required },
      //         bootstrapClass: [''],
      //       }),
      //       checkboxField({
      //         label: 'ВДС',
      //         name: `vds%${index}`,
      //         notSend: true,
      //         value: true,
      //         prescription: 'items',
      //         placeholder: '',
      //         readonly: true,
      //         class: [''],
      //         position: {
      //           cols: 12,
      //           sm: 2,
      //         },
      //         bootstrapClass: [''],
      //       }),
      //       stringField({
      //         label: 'Точное наименование',
      //         name: `exact_name%${index}`,
      //         notSend: true,
      //         placeholder: '',
      //         readonly: undefined,
      //         prescription: 'items',
      //         class: [''],
      //         position: {
      //           cols: 12,
      //           sm: 12,
      //         },
      //         bootstrapClass: [''],
      //       }),
      //     ]
      //     addConfig.fields.splice(btnIndex + 5 * (index - 1), 0, ...insertItems)
      //   }
      // })
    }
    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }
    const openZayavka = () => {
      router.push({
        name: 'main/:id/:form_id',
        params: {
          form_id: props.data.data?.zayavka?.id,
        },
      })
      setZayavkaItems()
      popupForm.value.isShow = true
    }
    onMounted(() => {
      getListZayavka()
    })

    return {
      files,
      sum,
      // Методы
      changeSum,
      removeFile,
      docs: props.data.data.docs_id,
      sendTaskFinish,
      formatedSchets: formatedSchets(),
      acceptSchets,
      formRowsRef,
      allChecked,
      comment,
      accepted,
      accepted_amount,
      start_accepted_amount,
      sendAmmount,
      schets,
      answer,
      zayavkaNameList,
      zayavkaItems,
      zayavkaValid,
      addUnconfirmed,
      addConfirmed,
      openZayavka,
      config,
      popupForm,
      closePopupForm,
      loading,
    }
  },
})

export default form10
