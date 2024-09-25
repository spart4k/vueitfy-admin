import SwitchDefault from '@/components/Switch/default/index.vue'
import Vue, { onMounted, computed, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'
import Pact from './../pact/index.vue'
import Zone from './../zone/index.vue'
import parserTarif from '@/pages/object/config/form-object-parser'
import Detail from '@/components/Table/detail/index.vue'
// import FormOutput from '@/components/Form/output/correct/index.vue'

export default {
  name: 'Contract',
  props: {},
  components: {
    SwitchDefault,
    Pact,
    Zone,
    Detail,
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(true)
    const types = ref([])
    const parser = ref(false)
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
          loading: true,
          territories: [],
          items: [],
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
      type.data.territories = response.data
      type.data.loaded = true
      expansion.value.push(index)
      getContracts(type)
    }

    const changeTerritory = ({ index, data, btn, type }) => {
      if (btn === 'shift') {
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
      } else if (btn === 'ctrl') {
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
      getContracts(type)
    }

    const changeDoc = (type, val) => {
      type.data.docType = val
      type.data.items = []
      getContracts(type)
    }

    let controller
    const getContracts = async (type) => {
      Vue.set(
        type.data,
        'items',
        type.data.items.filter((item) => type.data.active.includes(item.index))
      )
      type.data.loading = true
      const request = type.data.active.reduce(
        (acc, typeIndex) => {
          if (!type.data.items.some((item) => item.index === typeIndex)) {
            if (controller) controller.abort()
            controller = new AbortController()
            acc.data.push(
              store.dispatch('form/getParams', {
                url: `get/${type.data.docType === 0 ? 'contract' : 'zones'}/${
                  type.data.territories[typeIndex].id
                }`,
                data: undefined,
                params: {
                  signal: controller.signal,
                },
              })
            )
            acc.i.push(typeIndex)
          }
          return acc
        },
        { data: [], i: [] }
      )
      const response = await Promise.all(request.data)
      type.data.loading = false
      response.forEach((item, index) => {
        Vue.set(item, 'index', request.i[index])
        if (item.data.length) {
          item.data.forEach((pact) => {
            Vue.set(pact, 'loaded', null)
            Vue.set(pact, 'items', [])
          })
        }
      })
      type.data.items.push(...response)
      controller = undefined
    }

    const parserClone = ref()
    const openParser = ({
      territory,
      contract,
      version,
      contract_id,
      contract_type,
    }) => {
      parserClone.value = _.cloneDeep(parserTarif)
      parserClone.value.fields[0].value = territory.id
      parserClone.value.fields[0].readonly = true
      parserClone.value.fields[1].value = contract.id
      parserClone.value.fields[1].readonly = true
      parserClone.value.fields[2].filter.push({
        alias: 'version',
        sendEmpty: true,
        value: version,
      })
      parserClone.value.fields[2].readonly = true
      parserClone.value.fields[3].value = contract_id
      parserClone.value.fields[4].value = contract_type
      parserClone.value.fields[5].value = contract.type_id

      parser.value = true
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
      parser,
      parserClone,

      changeTerritory,
      changeDoc,
      openParser,
    }
  },
}
