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
    const types = ref([])
    const expansion = ref([])

    const switchBtn = [
      { name: 'Договоры', value: 0 },
      { name: 'Зона', value: 1 },
    ]

    const getTypes = async () => {
      const response = await store.dispatch(
        'form/get',
        'get/object/contract/types'
      )
      response.data.forEach((item) => {
        Vue.set(item, 'data', {
          loaded: null,
          territories: [],
          zones: {
            loaded: null,
            data: [],
          },
          contracts: {
            loaded: null,
            data: [],
          },
          active: [0],
          lastTarget: 0,
          docType: 0,
        })
      })
      types.value = response.data
      loading.value = false
    }

    const getTerritories = async (index) => {
      const type = types.value[index]
      if (type.data.loaded !== true)
        expansion.value = _.without(expansion.value, index)
      if (type.data.loaded !== null) return
      type.data.loaded = false
      const response = await store.dispatch(
        'form/get',
        `get/territories/${type.id}`
      )
      // response.data.forEach((item) => {
      //   Vue.set(item, 'loaded', null)
      //   Vue.set(item, 'contracts', [])
      //   Vue.set(item, 'zones', [])
      // })
      type.data.territories = response.data
      type.data.loaded = true
      expansion.value.push(index)
    }

    const changeTerritory = (index, data, type) => {
      if (type === 'shift') {
        if (data.active.includes(index)) {
          if (data.lastTarget > index) {
            for (
              let i = index;
              i <= data.lastTarget && data.active.length > 1;
              i++
            ) {
              Vue.set(
                data,
                'active',
                data.active.filter((x) => x !== i)
              )
            }
          } else {
            for (
              let i = data.lastTarget;
              i <= index && data.active.length > 1;
              i++
            ) {
              Vue.set(
                data,
                'active',
                data.active.filter((x) => x !== i)
              )
            }
          }
        } else {
          if (data.lastTarget > index) {
            for (let i = index; i <= data.lastTarget; i++) {
              if (!data.active.includes(i)) {
                Vue.set(data, 'active', [...data.active, i])
              }
            }
          } else {
            for (let i = data.lastTarget; i <= index; i++) {
              if (!data.active.includes(i)) {
                Vue.set(data, 'active', [...data.active, i])
              }
            }
          }
        }
      } else if (type === 'ctrl') {
        if (data.active.includes(index) && data.active.length > 1) {
          Vue.set(
            data,
            'active',
            data.active.filter((x) => x !== index)
          )
        } else {
          Vue.set(data, 'active', [...data.active, index])
        }
      } else {
        Vue.set(data, 'active', [index])
      }
      data.lastTarget = index
    }

    onMounted(() => {
      getTypes()
    })

    watch(
      () => expansion.value,
      (newVal, oldVal) => {
        let index
        if (newVal.length > oldVal.length)
          index = _.difference(newVal, oldVal)[0]
        else index = _.difference(oldVal, newVal)[0]
        if (index !== undefined && !types.value[index]?.data.loaded)
          getTerritories(index)
      },
      { deep: true }
    )
    return {
      loading,
      types,
      switchBtn,

      expansion,

      changeTerritory,
    }
  },
}
