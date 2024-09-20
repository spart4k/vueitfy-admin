import Vue, { onMounted, computed, toRef, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'
import moment from 'moment'
import Dialog from './dialog'

export default {
  name: 'Version',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Dialog,
  },
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = toRef(props, 'data')
    const expansion = ref([])
    const dialog = ref(false)

    const convertDate = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    const getSubversions = async ({ index, refresh = false }) => {
      const version = proxyValue.value[index]
      if (!refresh) {
        if (version.loaded !== true)
          expansion.value = _.without(expansion.value, index)
        if (version.loaded !== null) return
      }
      version.loaded = false
      const response = await store.dispatch(
        'form/get',
        `get/contract/versions/additional/${version.id}`
      )
      version.loaded = true
      version.items = response.data
      if (!refresh) expansion.value.push(index)
    }

    const download = (url) => {
      Vue.downloadFile(url)
    }

    const refreshItem = (version) => {
      const index = proxyValue.value.findIndex((x) => x.id === version.id)
      getSubversions({ index, refresh: true })
    }

    watch(
      () => expansion.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (index !== undefined && !proxyValue.value[index]?.loaded)
          getSubversions({ index })
      },
      { deep: true }
    )

    return {
      proxyValue,
      expansion,
      dialog,

      convertDate,
      download,
      refreshItem,
    }
  },
}
