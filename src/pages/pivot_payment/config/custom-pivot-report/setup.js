import Vue, { computed, defineComponent, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getList } from '@/api/selects'
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
    const dialog = ref(false)
    const parser = ref({
      id: 0,
      page: 1,
    })
    const data = ref({
      period: [],
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
    const getErrors = async () => {
      loading.value.errors = true
      const responseData = await getList('get/pagination_list/parser_errors', {
        countRows: 100,
        currentPage: parser.value.page,
        searchValue: '',
        id: -1,
        filter: [{ alias: 'parser_id', value: parser.value.id }],
        readonly: 0,
      })
      if (parser.value.page < responseData.totalPage)
        responseData.rows.at(-1).intersecting = true
      if (parser.value.page === 1) data.value.errors = [...responseData.rows]
      else data.value.errors = [...data.value.errors, ...responseData.rows]
      parser.value.page++
      loading.value.errors = false
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
      data.value.period = responseData.data
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
      dialog,
      parser,

      getYear,
      getMonth,
      getParseTime,
      getErrors,
      changeMonth,
      download,
    }
  },
})
export default PersonalReport
