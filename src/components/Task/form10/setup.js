import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
} from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
// import useForm from '@/compositions/useForm'
import IconDelete from '@/components/Icons/delete/delete.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const form10 = defineComponent({
  name: 'Form10',
  components: {
    IconDelete,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
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

    // Удаление файла
    const removeFile = (fileID) => {
      console.log('FILE ID', fileID)
      // TODO: доделать
      files.value = files.value.filter((file, id) => fileID !== id)
    }

    // Изменение суммы в поле
    const changeSum = (e) => (sum.value = e)

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
              process_id: data.task.process_id,
              manager_id: account_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_id: data.entity.id,
              docs_id: keyOfObjectSend,
              account_id: data.task.from_account_id,
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

    return {
      files,
      sum,
      // Методы
      changeSum,
      removeFile,
      sendTaskFinish,
    }
  },
})

export default form10
