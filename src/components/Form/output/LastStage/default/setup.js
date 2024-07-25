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
  name: 'Form-Output',
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
      service: [],
      personal: [],
    })

    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: async (data) => {
        const response = await store.dispatch('list/get', data)
        return response
      },
    })

    const loadingPersonal = ref(false)
    const getPersonal = async () => {
      const requestList = Object.keys(props.stage.targets).map((item) => {
        return +item
      })
      loadingPersonal.value = true
      const responseData = await makeRequestList([
        {
          alias: 'parser_personal_id',
          filter: [{ alias: 'personal_id', value: requestList }],
        },
      ])
      list.value.personal = responseData.data.parser_personal_id
      list.value.service = responseData.data.service_spr
      loadingPersonal.value = false
    }

    const convertData = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    const getPersonalName = (val) => {
      return list.value.personal.find((x) => x.id === +val)?.name
    }

    const getFinalSum = (val) => {
      return val.reduce((acc, item) => acc + item.sum, 0)
    }

    onMounted(() => {
      getPersonal()
    })

    return {
      convertData,
      list,
      getPersonalName,
      loadingPersonal,
      getFinalSum,
    }
  },
}
