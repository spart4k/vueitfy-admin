//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, nextTick, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import Row from '../personal/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import Manager from '../manager/default/index.vue'
import Popup from '@/components/Popup/index.vue'

//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    Row,
    Manager,
    Popup,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      require: true,
    },
    filtersConfig: {
      type: Object,
      default: () => {},
    },
    routeParam: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const currentDate = ref({
      monthArray: [
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
      ],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: moment(new Date()).format('YYYY-MM'),
    })
    provide('period', currentDate.value.date)
    const rows = ref([])
    const acceptData = ref({
      popup: false,
      valueDate: new Date().toISOString().substr(0, 7),
      valueProfit: { title: 'Аванс', value: 5 },
    })
    const changeMonth = async (val) => {
      currentDate.value.date = moment(`${currentDate.value.date}-10`)
        .add(val, 'M')
        .format('YYYY-MM')
      currentDate.value.year = currentDate.value.date.split('-')[0]
      currentDate.value.month = Number(currentDate.value.date.split('-')[1]) - 1
      // setTimeout(() => {
      // countingDistances()
      // }, 0)
      // addDayOfMonth()
      await getItems()
    }
    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentList', {
          url: 'payment_list/personals',
          body: {
            period: currentDate.value.date,
          },
        }),
    })
    const getItems = async () => {
      try {
        const { result } = await makeRequest()
        if (result) {
          // rows.value = result.splice(0, 10)
          rows.value = result
          console.log('getItems')
        }
      } catch (err) {
        console.log(err)
      }
    }
    onMounted(() => {
      getItems()
    })
    return {
      currentDate,
      changeMonth,
      getItems,
      rows,
      loading,
    }
  },
}

export default table
// Vue.component('message', message)
