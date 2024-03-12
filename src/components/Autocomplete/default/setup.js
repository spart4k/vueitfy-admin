import Vue, { watch, ref, computed, onMounted, toRef } from 'vue'
import { getList } from '@/api/selects'

export default {
  name: 'autocomplete',
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    filter: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Object, Array],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const search = ref('')
    const loading = ref(false)
    const proxyValue = toRef(props, 'value')

    const queryData = {
      page: 1,
      total: null,
      totalPage: null,
      countRows: null,
    }

    let controller
    const querySelections = async () => {
      try {
        if (controller) controller.abort()
        controller = new AbortController()
        loading.value = true
        const data = await getList(
          props.field.url,
          {
            countRows: 10,
            currentPage: queryData.page,
            searchValue: search?.value?.toLowerCase(),
            id: proxyValue.value ? proxyValue.value : -1,
            filter: props.filter,
          },
          {
            signal: controller.signal,
          }
        )

        Object.assign(queryData, data)
        if (
          data?.rows?.length ||
          data.page > data.totalPage ||
          data.totalPage === 0
        ) {
          Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
        } else {
          Vue.set(props.field, 'items', [])
        }

        loading.value = false
        controller = undefined
      } catch (e) {
        return e
      }
    }

    const endIntersect = (entries, observer, isIntersecting) => {
      if (loading.value) return
      if (isIntersecting) {
        if (queryData.page < queryData.totalPage) {
          queryData.page++
          querySelections()
        }
      }
    }
    const removeSelected = (data) => {
      if (Array.isArray(proxyValue.value))
        proxyValue.value.splice(data.index, 1)
      else proxyValue.value = null
      // proxyValue.value.splice(data.index, 1)
      update(proxyValue.value)
    }

    const update = (value) => {
      if (Array.isArray(proxyValue.value) && props.field.valueLength)
        if (value.length > props.field.valueLength) proxyValue.value.shift()
      const item = props.field.items.find((el) => el.id === value)
      emit('input', value)
      emit('change', { value, field: props.field, item })
    }

    watch(
      () => search.value,
      () => {
        queryData.page = 1
        querySelections()
      }
    )

    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      }
    )

    onMounted(() => {
      querySelections()
    })

    return {
      proxyValue,
      endIntersect,
      removeSelected,
      querySelections,
      update,
      search,

      loading,
    }
  },
}
