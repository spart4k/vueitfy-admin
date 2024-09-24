import Vue, { onMounted, computed, ref, watch, toRef } from 'vue'
import store from '@/store'
import _ from 'lodash'

export default {
  name: 'Zone',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = toRef(props, 'data')
    const expansion = ref([])

    onMounted(() => {})

    // const getVersions = async (index) => {
    //   const version = proxyValue.value[index]
    //   if (version.loaded !== true)
    //     expansion.value = _.without(expansion.value, index)
    //   if (version.loaded !== null) return
    //   version.loaded = false
    //   const response = await store.dispatch(
    //     'form/get',
    //     `get/contract/versions/${version.id}`
    //   )
    //   response.data.forEach((version) => {
    //     Vue.set(version, 'loaded', null)
    //     Vue.set(version, 'items', [])
    //   })
    //   version.loaded = true
    //   version.items = response.data
    //   expansion.value.push(index)
    // }

    // watch(
    //   () => expansion.value,
    //   (newVal, oldVal) => {
    //     let index
    //     if (newVal.length > oldVal.length)
    //       index = _.difference(newVal, oldVal)[0]
    //     else index = _.difference(oldVal, newVal)[0]
    //     if (index !== undefined && !proxyValue.value[index]?.loaded)
    //       getVersions(index)
    //   },
    //   { deep: true }
    // )

    return {
      expansion,

      proxyValue,
    }
  },
}
