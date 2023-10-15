import { defineComponent, onMounted, ref } from 'vue'
import Form1 from '@/components/Task/form1/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'
import ThirdPopupView from '@/components/Task/third-popup-view/index.vue'
import Form15 from '@/components/Task/form15/index.vue'
import Form2 from '@/components/Task/form2/index.vue'
import Form7 from '@/components/Task/form7/index.vue'
import Form23 from '@/components/Task/form23/index.vue'
import Form20 from '@/components/Task/form20/index.vue'
import Form21 from '@/components/Task/form21/index.vue'
import Form27 from '@/components/Task/form27/index.vue'
import Form28 from '@/components/Task/form28/index.vue'
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
    Form1,
    SecondPopupView,
    ThirdPopupView,
    Form15,
    Form2,
    Form7,
    Form23,
    Form20,
    Form21,
    Form27,
    Form28,
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
    const taskDeadline = ref(0)
    const timerString = ref('')
    const countdownTimerIntervalId = ref(null)

    const countdownTimer = () => {
      const diff = taskDeadline.value - new Date()
      console.log(diff)
      if (diff <= 0) {
        clearInterval(countdownTimerIntervalId.value)
      }

      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) : 0
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0

      timerString.value = `${minutes}:${seconds}`
    }

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
      if (Number(data.value.task.time_execution) > 0) {
        taskDeadline.value =
          Date.parse(data.value.task.date_create) +
          data.value.task.time_execution * 1000
        console.log(taskDeadline.value)
        countdownTimer()
        countdownTimerIntervalId.value = setInterval(countdownTimer, 1000)
      }
    })

    return { loading, data, formatDate, taskName, timerString, taskDeadline }
  },
})
export default task
