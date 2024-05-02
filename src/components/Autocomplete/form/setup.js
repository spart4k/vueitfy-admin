import Vue, {
  watch,
  ref,
  computed,
  onMounted,
  toRef,
  getCurrentInstance,
} from 'vue'
import { useRoute } from 'vue-router/composables'
import { getList } from '@/api/selects'

export default {
  name: 'autocomplete',
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number, Object, Array],
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)
    const route = useRoute()
    const proxyValue = toRef(props, 'value')
    const searchProps = ref(props.field.search)

    const queryData = {
      page: null,
      total: null,
      totalPage: null,
      countRows: null,
    }
    const checkedAll = computed(
      () => proxyValue.value.length === props.field.items.length
    )
    const selectAll = () => {
      if (checkedAll.value) {
        proxyValue.value = []
      } else {
        proxyValue.value = props.field.items.slice()
      }
    }
    let controller
    const querySelections = async (params, isObs = false) => {
      try {
        if (props.field.type === 'select') return
        if (params.search || params.id || isObs) {
          if (params.search) params.search = params.search.toLowerCase()

          if (controller) controller.abort()
          controller = new AbortController()
          loading.value = true

          const { url } = props.field
          const filter = []

          if (props.field.filter && props.field.filter.length) {
            props.field.filter.forEach((el) => {
              if (el.routeKey) {
                filter.push({
                  alias: el.alias ?? el.field,
                  value: [+route.params[el.routeKey]],
                  type: el.type,
                })
              } else {
                if (!props.formData[el.field]) return
                filter.push({
                  alias: el.alias ?? el.field,
                  value: props.formData[el.field],
                  type: el.type,
                })
              }
            })
          }

          const data = await getList(
            url,
            {
              countRows: 10,
              currentPage: props.field.page,
              searchValue: params.search ? params.search : '',
              id: params.id ? params.id : -1,
              filter,
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
        }
      } catch (e) {
        return e
      }
    }

    const endIntersect = (entries, observer, isIntersecting) => {
      if (loading.value) return
      const isAtFinalPage = [queryData.totalPage, queryData.page].includes(null)
        ? true
        : queryData.totalPage > queryData.page
      if (isIntersecting) {
        if (
          props.field?.items?.length &&
          !props.field?.loading &&
          isAtFinalPage
        ) {
          props.field.page = props.field.page + 1
          // (queryData?.totalPage > queryData?.page || queryData.page === null)
          const params = {
            search: props.field.search,
            name: props.field.name,
          }
          querySelections(params, true)
        }
      }
    }
    const icon = computed(() =>
      selectAll.value ? 'mdi-close-box' : 'mdi-minus-box'
    )
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

    const disabled = computed(() => {
      return props.field.disabled || props.field.requiredFields
        ? props.field.disabled ||
            props.field.requiredFields.some((el) => !props.formData[el])
        : false
    })

    const parentComp = getCurrentInstance().proxy.$parent.$parent

    //const styleChip = computed(() =>)

    watch(
      () => searchProps.value,

      (newVal) => {
        const params = {
          id: props.value,
          search: newVal,
        }
        props.field.page
        if (newVal !== null) {
          props.field.page = 1
          querySelections(params)
        }
      }
    )

    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      }
    )

    onMounted(() => {})

    return {
      proxyValue,
      endIntersect,
      removeSelected,
      querySelections,
      update,
      searchProps,
      disabled,
      loading,
      selectAll,
      checkedAll,
      icon,
      parentComp,
    }
  },
}
