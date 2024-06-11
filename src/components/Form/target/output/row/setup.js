import { onMounted, ref } from 'vue'
import useRequest from '@/compositions/useRequest'
import { useRouter, useRoute } from 'vue-router/composables'
import store from '@/store'

export default {
  name: 'Form-Target-Output-Row',
  props: {
    service: {
      type: Object,
      default: () => {},
    },
    serviceKey: {
      type: String,
      default: '',
    },
  },
  components: {},
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const sum = (row) => {
      return row.sum - (row.hold_sum + row.deduction_debit + row.deduction_hold)
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) =>
        store.dispatch('list/get', [{ alias: 'service_spr', filter: [] }]),
    })
    const switchLabel = (key) => {
      let result = ''
      switch (+key) {
        case 1:
          result = 'Выработка по QTY'
          break
        case 2:
          result = 'Выработка по часам'
          break
        case 3:
          result = 'Выработка по клинингу'
          break
        case 4:
          result = 'Выработка'
          break
        default:
          result = key
      }
      return result
    }
    const notPay = (row) => !row.is_hold && row.payment_id === 0
    const listService = ref([])
    onMounted(async () => {
      const result = await makeRequestList()
      listService.value = result.data.service_spr
      //
    })
    return {
      switchLabel,
      listService,
      notPay,
      sum,
    }
  },
}
