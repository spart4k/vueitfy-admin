//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import Row from '../row/index.vue'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import Total from '../total/index.vue'

//import { tableApi } from '@/api'
import Object from '../object/default/index.vue'

const table = {
  name: 'PaymentList-Row',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    Row,
    Object,
    Total,
  },
  props: {
    row: {
      type: Object,
      default: () => {},
      require: true,
    },
    period: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const route = useRoute()
    const isOpen = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const objects = ref([])
    const period = inject('period')
    const total = ref({})
    console.log(period)
    const { makeRequest, loading } = useRequest({
      context,
      request: () =>
        store.dispatch('form/getPaymentListObjects', {
          url: `payment_list/personals/${props.period}/${props.row.personal_id}`,
        }),
    })
    watch(
      () => isOpen.value,
      async (newVal) => {
        console.log(newVal + '_' + props.row.personal_id)
        if (newVal === 0) {
          try {
            const { result } = await makeRequest()
            if (result) {
              objects.value = result.objects
              total.value = result
              console.log('getItems')
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    )
    return {
      isOpen,
      objects,
      total,
      loading,
    }
  },
}

export default table
// Vue.component('message', message)
