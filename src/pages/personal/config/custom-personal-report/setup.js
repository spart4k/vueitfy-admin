import Vue, { computed, defineComponent, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment/moment'
import store from '@/store'

const PersonalReport = defineComponent({
  name: 'Отчет А/В',
  path: 'report',
  id: uuidv4(),
  components: {},
  props: {},
  setup(props, ctx) {
    const date = ref(moment(new Date()).format('YYYY-MM'))
    const loading = ref({
      period: false,
      errors: false,
    })
    const data = ref({
      period: [
        {
          success: true,
          date: '2024-08-16 12:02:44',
          path: '/tmp/1723809533-2024-07.xlsx',
          parser_id: 182,
        },
        {
          success: false,
          date: '2024-08-16 12:14:57',
          path: '/tmp/1723810350-2024-08.xlsx',
          parser_id: 183,
        },
      ],
      errors: [],
    })
    const monthArray = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ]
    const getYear = (val) => {
      return moment(val, 'YYYY-MM').year()
    }
    const getMonth = (x) => {
      let monthIndex = moment(date.value, 'YYYY-MM').month()
      if (x) {
        monthIndex += x
        if (monthIndex === -1) monthIndex = 11
        if (monthIndex === 12) monthIndex = 0
      }
      return monthArray[monthIndex]
    }
    const getParseTime = (val) => {
      return moment(val, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY, HH:mm')
    }
    const changeMonth = (val) => {
      date.value = moment(date.value, 'YYYY-MM').add(val, 'M').format('YYYY-MM')
    }

    let controller
    const getData = async () => {
      if (controller) controller.abort()
      controller = new AbortController()
      loading.value.period = true
      const responseData = await store.dispatch('form/update', {
        url: 'report/autoload/x5/info',
        body: {
          data: {
            period: date.value,
          },
        },
        params: {
          signal: controller.signal,
        },
      })
      // data.value.period = responseData.data
      loading.value.period = false
      controller = undefined
    }

    const download = (val) => {
      Vue.downloadFile(val)
    }

    watch(
      () => date.value,
      () => {
        getData()
      },
      { immediate: true }
    )

    return {
      date,
      monthArray,
      loading,
      data,

      getYear,
      getMonth,
      getParseTime,
      changeMonth,
      download,
    }
  },
})
export default PersonalReport
