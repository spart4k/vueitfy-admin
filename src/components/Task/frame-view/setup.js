import { defineComponent, onMounted, ref } from 'vue'
import FirstPopupView from '../first-popup-view/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'
import ThirdPopupView from '@/components/Task/third-popup-view/index.vue'
import FourthPopupView from '@/components/Task/fourth-popup-view/index.vue'
import FifthPopupView from '@/components/Task/fifth-popup-view/index.vue'
import moment from 'moment'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import { useRouter } from 'vue-router/composables'

const taskNameSpr = {
  1: 'Внесение',
  2: 'Проверка внесенных данных',
  3: 'Расход',
  4: 'Размещение',
  5: 'Регистрация',
  6: 'Прикрепление реквизитов',
  7: 'Исправление',
  8: 'Получение патента',
  9: 'Получение документов',
  10: 'Проверка закрывающих документов',
  11: 'Корректировка закрывающих документов',
  12: 'Депортация | въезд/выезд',
  13: 'Прикладывание документов',
  14: 'Проверка запрошенных документов',
  15: 'Подтверждение назначения',
  16: 'Внесение назначения в PVP-портал',
  17: 'Прикладывание/корректировка выработки',
  18: 'Проверка выработки',
  19: 'Внесение сотрудника в PVP-портал ',
  20: 'Внесение',
  21: 'Проверка внесенных данных',
  22: 'Авторизация в боте',
  23: 'Корректировка документов',
  24: 'Подтверждение назначения в PVP-портал',
  25: 'Внесение тарифа',
  26: 'Подтверждение перемещения',
  27: 'Согласование ежедневного начисления',
  28: 'Корректировка начисления',
  29: 'Подтверждение увольнения',
  30: 'Техобращение',
}

const task = defineComponent({
  name: 'Task',
  components: {
    FirstPopupView,
    SecondPopupView,
    ThirdPopupView,
    FourthPopupView,
    FifthPopupView,
  },

  props: {},
  setup(_) {
    const context = {
      root: {
        store,
        _,
      },
    }
    const router = useRouter()
    const idTask = router.currentRoute.params.id
    const taskName = ref('')
    const data = ref({})
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('taskModule/getTask', idTask),
    })

    // const { makeRequest: makePostRequest } = useRequest({
    //   context,
    //   request: () =>
    //     store.dispatch('taskModule/setPartTask', { wdwd: 1, ffff: 2 }),
    // })

    const formatDate = (date) => {
      return moment(date, 'dd MMMM HH:mm').locale('ru')
    }

    onMounted(async () => {
      const dataFrom = await makeRequest()
      data.value = dataFrom
      taskName.value = taskNameSpr[data.value.task.task_type_id]
    })

    return { loading, data, formatDate, taskName }
  },
})
export default task
