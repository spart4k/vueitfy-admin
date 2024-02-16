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
          result = 'Выработка по клирингу'
          break
        default:
          result = key
      }
      return result
    }
    const listService = ref([])
    onMounted(async () => {
      const result = await makeRequestList()
      listService.value = result.data.service_spr
      // console.log(props.tab.routeParam)
    })
    return {
      switchLabel,
      listService,
    }
  },
}
