import { defineComponent, ref, computed, toRef, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import IconDelete from '@/components/Icons/delete/delete.vue'
import useRequest from '@/compositions/useRequest'
import DocAccepting from '@/components/Task/el/DocAccepting/index.vue'
import store from '@/store'
import ZayavkaItem from '@/components/Task/el/ZayavkaItem/index.vue'

const form10 = defineComponent({
  name: 'Form10',
  components: {
    IconDelete,
    DocAccepting,
    ZayavkaItem,
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
              okk_id: store.state.user.id,
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
      console.log(items)
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
        await sendZayavkaItems()
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
                  value: [8],
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
      accepted.value = true
    }
    const addUnconfirmed = (item) => {
      item.valid = 1
    }
    const addConfirmed = (item) => {
      item.valid = 2
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
    }
  },
})

export default form10
