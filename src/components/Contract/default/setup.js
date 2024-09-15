import SwitchDefault from '@/components/Switch/default/index.vue'
import Vue, { onMounted, computed, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'
import Pact from './../pact/index.vue'

export default {
  name: 'Contract',
  props: {},
  components: {
    SwitchDefault,
    Pact,
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)
    const data = ref({
      types: [],
    })
    const types = ref([])

    const switchBtn = [{ name: 'Договоры' }, { name: 'Зона' }]

    // const getTypes = async () => {
    //   const response = await store.dispatch(
    //     'form/get',
    //     'get/object/contract/types'
    //   )
    //   response.data.forEach((item) => {
    //     Vue.set(item, 'loaded', null)
    //     Vue.set(item, 'territories', [])
    //   })
    //   data.value.types = response.data
    //   loading.value = false
    // }

    // const getTerritories = async (index) => {
    //   const type = data.value.types[index]
    //   if (type.loaded !== true) types.value = _.without(types.value, index)
    //   if (type.loaded !== null) return
    //   type.loaded = false
    //   const response = await store.dispatch(
    //     'form/get',
    //     `get/territories/${type.id}`
    //   )
    //   response.data.forEach((item) => {
    //     Vue.set(item, 'loaded', null)
    //     Vue.set(item, 'contracts', [])
    //     Vue.set(item, 'zones', [])
    //   })
    //   type.territories = response.data
    //   type.loaded = true
    //   types.value.push(index)
    // }

    onMounted(() => {
      // getTypes()
    })

    // watch(
    //   () => types.value,
    //   (newVal, oldVal) => {
    //     let index
    //     if (newVal.length > oldVal.length)
    //       index = _.difference(newVal, oldVal)[0]
    //     else index = _.difference(oldVal, newVal)[0]
    //     if (index !== undefined && !data.value.types[index]?.loaded)
    //       getTerritories(index)
    //   },
    //   { deep: true }
    // )
    return {
      loading,
      data,
      switchBtn,

      types,
    }
  },
}
