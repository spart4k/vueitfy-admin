//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, nextTick, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import Row from '../row/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

//import { tableApi } from '@/api'

const table = {
  name: 'TableFixed',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    Row,
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
    const loading = ref(false)

    const currentDate = ref({
      month: new Date().getMonth(),
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
      year: new Date().getFullYear(),
    })
    const acceptData = ref({
      popup: false,
      valueDate: new Date().toISOString().substr(0, 7),
      valueProfit: { title: 'Аванс', value: 5 },
    })
    const changeMonth = async (val) => {
      currentDate.value.month += val
      if (currentDate.value.month < 0) {
        currentDate.value.month = 11
        currentDate.value.year -= 1
      } else if (currentDate.value.month > 11) {
        currentDate.value.month = 0
        currentDate.value.year += 1
      }
      acceptData.value.valueDate = `${currentDate.value.year}-${
        currentDate.value.month < 10 ? '0' : ''
      }${currentDate.value.month + 1}`
      // acceptData.value.valueDate
      // setTimeout(() => {
      //   countingDistances()
      // }, 0)
      // addDayOfMonth()
      // await getItems()
    }
    return {
      currentDate,
      changeMonth,
    }
  },
}

export default table
// Vue.component('message', message)
