import Vue, {
  nextTick,
  computed,
  ref,
  onMounted,
  watch,
  onUnmounted,
} from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'

import useRequest from '@/compositions/useRequest'

import _ from 'lodash'
import moment from 'moment'

import store from '@/store'

export default {
  name: 'Zayavka',
  components: {},
  props: {
    stage: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
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

    const list = ref({
      object: {},
      personal: {},
      doljnost: {},
    })

    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: async (data) => {
        const response = await store.dispatch('list/get', data)
        return response
      },
    })

    const loadingPersonal = ref(false)
    const getList = async () => {
      const arr = [
        'object_magnit_for_parser',
        'doljnost_magnit_for_parser',
        'account_magnit_for_parser',
      ]
      loadingPersonal.value = true
      const response = await makeRequestList(
        arr.reduce((acc, item) => {
          acc.push({
            alias: item,
            filter: [],
          })
          return acc
        }, [])
      )
      loadingPersonal.value = false
      list.value = arr.reduce((acc, item) => {
        acc[item.split('_')[0]] = response.data[item].reduce((acc, item) => {
          acc[item.id] = item.name
          return acc
        }, {})
        return acc
      }, {})
    }

    const convertData = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    onMounted(() => {
      getList()
    })

    return {
      convertData,
      list,
      loadingPersonal,
    }
  },
}
