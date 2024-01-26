import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import Form1 from '@/components/Task/form1/index.vue'
import SecondPopupView from '../second-popup-view/index.vue'
import ThirdPopupView from '@/components/Task/third-popup-view/index.vue'
import Form15 from '@/components/Task/form15/index.vue'
import Form2 from '@/components/Task/form2/index.vue'
import Form3 from '@/components/Task/form3/index.vue'
import Form4 from '@/components/Task/form4/index.vue'
import Form5 from '@/components/Task/form5/index.vue'
import Form6 from '@/components/Task/form6/index.vue'
import Form7 from '@/components/Task/form7/index.vue'
import Form8 from '@/components/Task/form8/index.vue'
import Form9 from '@/components/Task/form9/index.vue'
import Form13 from '@/components/Task/form13/index.vue'
import Form14 from '@/components/Task/form14/index.vue'
import Form23 from '@/components/Task/form23/index.vue'
import Form20 from '@/components/Task/form20/index.vue'
import Form21 from '@/components/Task/form21/index.vue'
import Form27 from '@/components/Task/form27/index.vue'
import Form28 from '@/components/Task/form28/index.vue'
import Form17 from '@/components/Task/form17/index.vue'
import Form18 from '@/components/Task/form18/index.vue'
import moment from 'moment'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import { useRouter } from 'vue-router/composables'
import _ from 'lodash'

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
    Form3,
    Form4,
    Form5,
    Form6,
    Form7,
    Form8,
    Form9,
    Form23,
    Form20,
    Form21,
    Form27,
    Form28,
    Form17,
    Form18,
    Form13,
    Form14,
  },

  props: {},
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const router = useRouter()
    const idTask = router.currentRoute.params.id
    const taskName = ref('')
    const data = ref({})
    const taskDeadline = ref(0)
    const timerString = ref('')
    const timerDiff = ref(0)
    const countdownTimerIntervalId = ref(null)

    const countdownTimer = () => {
      const diff = taskDeadline.value - new Date()
      const minutes = Math.floor(diff / 1000 / 60)
      const seconds =
        Math.floor(diff / 1000) % 60 > 0
          ? Math.floor(diff / 1000) % 60
          : -Math.floor(diff / 1000) % 60

      timerString.value = `${minutes}:${seconds}`
      timerDiff.value = diff
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
      return moment(date).locale('ru').format('D MMMM, HH:mm')
    }

    const refreshData = async () => {
      console.log('refreshData')
      if (countdownTimerIntervalId.value)
        clearInterval(countdownTimerIntervalId.value)
      await getData()
      console.log('data', data.value)
    }

    const getData = async () => {
      const dataFrom = await makeRequest()
      data.value = _.cloneDeep(dataFrom)
      taskName.value = taskNameSpr[data.value.task.task_type_id]
      if (Number(data.value.task.time_execution) > 0) {
        taskDeadline.value =
          Date.parse(data.value.task.date_create) +
          data.value.task.time_execution * 1000
        countdownTimer()
        countdownTimerIntervalId.value = setInterval(countdownTimer, 1000)
      }
    }

    onMounted(async () => {
      getData()
    })

    onUnmounted(() => {
      clearInterval(countdownTimerIntervalId.value)
    })

    return {
      loading,
      data,
      formatDate,
      taskName,
      timerString,
      taskDeadline,
      timerDiff,
      refreshData,
    }
  },
})
export default task
