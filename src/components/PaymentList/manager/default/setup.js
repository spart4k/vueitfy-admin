//import style from './style.css' assert { type: 'css' }
//document.adoptedStyleSheets.push(style)
import Vue, { onMounted, ref, computed, watch, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import moment from 'moment'
import personal from '../../personal/index.vue'

//import { tableApi } from '@/api'

const table = {
  name: 'PaymentList-Manager',
  components: {
    //vTableButton,
    //vButton,
    //vInput,
    personal,
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
    rows: {
      type: Array,
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
    const objects = ref(null)
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
    const getObjects = async () => {
      if (objects.value !== null) return
      isOpen.value = undefined
      if (loading.value) {
        return
      } else {
        try {
          const { result } = await makeRequest()
          if (result) {
            objects.value = result.objects
            total.value = result
            isOpen.value = 0
            console.log('getItems')
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
      async (newVal) => {
        console.log(newVal + '_' + props.row.personal_id)
        await getObjects()
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
