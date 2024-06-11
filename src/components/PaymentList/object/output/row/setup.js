//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
// import Row from '../row/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import Info from '../../info/index.vue'
import InfoOutput from '../../output/index.vue'
// import InfoOverpayment from '../default/index.vue'
import InfoConsumption from '../../consumption/index.vue'
import Total from '../../../total/index.vue'
//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Row-Object-Output',
  components: {
    Info,
    InfoOutput,
    // InfoOverpayment,
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
    const objects = ref(null)
    const isOpenObject = ref(false)
    // const loading = ref(true)
    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentListObjects', {
          url: `payment_list/personals/${props.period}/${props.personalId}/${props.object.id}/services/${props.row.service_id}`,
        }),
    })
    const convertData = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }
    let touched = false
    const getObjects = async () => {
      if (objects.value !== null) return
      isOpen.value = undefined
      if (loading.value) {
        return
      } else {
        try {
          const { result } = await makeRequest()
          if (result) {
            objects.value = result
            total.value = result
            isOpen.value = 0
          }
        } catch (err) {
          console.log(err)
        }
        loading.value = false
        // Vue.set(type, 'content', {})
        // type.content = responseData.result
        // Vue.set(type.content, 'edit', false)
        // type.content.code = responseData.code
        // detailPanels.value.push(index)
      }
    }
    watch(
      () => isOpen.value,
      async () => {
        touched = true
        await getObjects()
      }
    )
    return {
      isOpen,
      total,
      objects,
      convertData,
      loading,
    }
  },
}

export default table
// Vue.component('message', message)
