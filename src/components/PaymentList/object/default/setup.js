//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
// import Row from '../row/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import Info from '../info/index.vue'
import InfoOutput from '../output/index.vue'
import InfoOverpayment from '../overpayment/default/index.vue'
import InfoConsumption from '../consumption/index.vue'
import Total from '../../total/index.vue'
//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Row-Object',
  components: {
    Info,
    InfoOutput,
    InfoOverpayment,
    InfoConsumption,
    Total,
    //vTableButton,
    //vButton,
    //vInput,
    // Row,
  },
  props: {
    row: {
      type: Object,
      default: () => {},
      require: true,
    },
    object: {
      type: Object,
      default: () => {},
      require: true,
    },
    personalId: {
      type: Number,
    },
    period: {
      type: String,
      default: '',
    },
    showTotal: {
      type: Boolean,
      default: false,
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
    const total = ref({})
    const isOpen = ref(false)
    const isOpenObject = ref(false)
    // const period = inject('period')
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentListObjects', {
          url: `payment_list/personals/${props.period}/${props.personalId}/${props.object.id}`,
        }),
    })
    watch(
      () => isOpen.value,
      async (newVal) => {
        if (newVal === 0) {
          try {
            const { result } = await makeRequest()
            if (result) {
              // objects.value = result.objects
              total.value = result
              // console.log('getItems')
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    )
    return {
      isOpen,
      total,
    }
  },
}

export default table
// Vue.component('message', message)
