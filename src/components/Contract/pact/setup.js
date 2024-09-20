import Vue, { onMounted, computed, ref, watch, toRef } from 'vue'
import store from '@/store'
import _ from 'lodash'
import Version from './version/index.vue'
import Dialog from './dialog'

export default {
  name: 'Pact',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: { Version, Dialog },
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = toRef(props, 'data')
    const expansion = ref([])
    const dialog = ref(false)

    onMounted(() => {})

    const getVersions = async ({ index, refresh = false }) => {
      const version = proxyValue.value[index]
      if (!refresh) {
        if (version.loaded !== true)
          expansion.value = _.without(expansion.value, index)
        if (version.loaded !== null) return
      }
      version.loaded = false
      const response = await store.dispatch(
        'form/get',
        `get/contract/versions/${version.id}`
      )
      response.data.forEach((version) => {
        Vue.set(version, 'loaded', null)
        Vue.set(version, 'items', [])
      })
      version.loaded = true
      version.items = response.data
      if (!refresh) expansion.value.push(index)
    }

    const refreshItem = (version) => {
      const index = proxyValue.value.findIndex((x) => x.id === version.id)
      getVersions({ index, refresh: true })
    }

    watch(
      () => expansion.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (index !== undefined && !proxyValue.value[index]?.loaded)
          getVersions({ index })
      },
      { deep: true }
    )

    return {
      expansion,
      proxyValue,
      dialog,

      refreshItem,
    }
  },
}
