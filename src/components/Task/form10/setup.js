import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
} from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import IconDelete from '@/components/Icons/delete/delete.vue'
import useRequest from '@/compositions/useRequest'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'
import store from '@/store'

const form10 = defineComponent({
  name: 'Form10',
  components: {
    IconDelete,
    FormTitle,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    // Variables
    const account_id = computed(() => store.state.user.account_id)
    const chied_id = computed(() => store.state.user.chied_id)
    let listDocuments = ref([])
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
    const accepted_amount = ref('')
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
    const changeSum = (e) => (sum.value = e)
    const comment = ref('')
    const { makeRequest: setDataZayavka } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/acceptSchets', {
          data: {
            id: props.data.task.process_id,
            close_schets: props.data.data.zayavka.close_schet,
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

    let sendTaskFinish = async () => {
      let keyOfObjectSend = {}
      listDocuments.value.forEach((elem, index) => {
        for (const key in elem) {
          keyOfObjectSend[elem.doc_id] = !elem.inProcess
        }
      })

      const { makeRequest: changeStatus } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              manager_id: account_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              personal_id: props.data.entity.id,
              docs_id: keyOfObjectSend,
              account_id: props.data.task.from_account_id,
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
    const allChecked = computed(() =>
      formRowsRef.value.every((el) => !el.isShowAdd || !el.isShowCansel)
    )
    const acceptSchets = async () => {
      await setDataZayavka()
      await updateDopData()
    }

    return {
      files,
      sum,
      // Методы
      changeSum,
      removeFile,
      sendTaskFinish,
      formatedSchets: formatedSchets(),
      acceptSchets,
      formRowsRef,
      allChecked,
      comment,
      accepted,
      accepted_amount,
    }
  },
})

export default form10
