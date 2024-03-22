import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'

export default {
  name: 'CheckList',
  components: {
    SidelistHeader,
  },
  props: {
    date: {
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const stage = ref(0)
    const loading = ref(true)
    const data = ref({
      content: {},
      period: {},
      detail: {},
    })
    const confirm = ref({
      isShow: false,
      object: {},
    })
    const editedType = ref({
      total: '',
      loading: false,
    })
    const detailPanels = ref([])

    const types = {
      1: 'К',
      2: 'Г',
      3: 'Б/П',
      4: 'А',
      5: 'Кл',
    }

    const getType = async (index) => {
      const type = data.value.detail.types[index]
      if (type.content) return
      detailPanels.value = _.without(detailPanels.value, index)
      if (type.loading) {
        return
      } else {
        type.loading = true
        const responseData = await store.dispatch(
          'table/getDetail',
          `period/data/${props.date.date}/${type.object_id}/${type.type_id}`
        )
        type.loading = false
        Vue.set(type, 'content', {})
        type.content = responseData.result
        Vue.set(type.content, 'edit', false)
        type.content.code = responseData.code
        detailPanels.value.push(index)
      }
    }

    const getData = async () => {
      loading.value = true
      data.value.period = await store.dispatch(
        'table/getDetail',
        `get/period/month?period=${props.date.date}`
      )
      if (data.value.period?.code === 1) {
        data.value.content = await store.dispatch(
          'table/getDetail',
          `get/checklist/${data.value.period.data.id}`
        )
      }
      loading.value = false
    }

    const openDetail = (val) => {
      stage.value++
      data.value.detail = val
      data.value.detail.types.forEach((item) => {
        Vue.set(item, 'loading', false)
      })
    }

    const editTotalCount = (type) => {
      editedType.value.total = type.content.total
      type.content.edit = true
    }

    const changePeriod = async ({ type, object }) => {
      const actions = {
        month: object?.id,
        object: object?.period_id,
        type: object?.id,
      }
      const action = object.is_close ? 'open' : 'close'

      const requestData = {
        url: `period/${type}/${action}/${actions[type]}`,
        body: {},
      }
      const data = await store.dispatch('form/putForm', requestData)
      if (data.code === 1) {
        let val = object.is_close ? 0 : 1
        object.is_close = val
        if (type === 'object') {
          object.types.forEach((item) => {
            item.is_close = val
          })
        } else if (type === 'month') {
          getData()
        }
      }
    }

    const changeTotalCount = () => {}

    const stageBack = () => {
      detailPanels.value = []
      stage.value--
    }

    const downloadFile = (path) => {
      Vue.downloadFile(path)
    }

    const formatDate = (date) => {
      return moment(date).format('YYYY.MM.DD')
    }

    onMounted(() => {
      getData()
    })

    watch(
      () => detailPanels.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (detailPanels.value.includes(index)) getType(index)
      },
      { deep: true }
    )

    return {
      stage,
      loading,
      data,
      types,
      confirm,
      detailPanels,
      editedType,

      stageBack,
      openDetail,
      changePeriod,
      editTotalCount,
      downloadFile,
      formatDate,
      changeTotalCount,
    }
  },
}
