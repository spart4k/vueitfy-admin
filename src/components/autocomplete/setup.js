import Vue, { watch, ref, computed, onMounted } from 'vue'
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
    console.log(props)
    const { emit } = ctx
    const loading = ref(false)
    const proxyValue = ref(props.value)
    const searchProps = ref(props.field.search)

    const queryData = {
      page: null,
      total: null,
      totalPage: null,
      countRows: null,
    }

    const querySelections = async (params, isObs = false) => {
      if (params.search || params.id || isObs) {
        if (params.search) params.search = params.search.toLowerCase()

        loading.value = true

        const { url } = props.field
        const filter = []

        if (props.field.filters && props.field.filters.length) {
          props.field.filters.forEach((el) => {
            if (!props.formData[el.field]) return
            filter.push({
              field: el.field,
              value: props.formData[el.field],
            })
          })
        }

        const data = await getList(url, {
          countRows: 10,
          currentPage: props.field.page,
          searchValue: params.search ? params.search : '',
          id: params.id ? params.id : -1,
          filter,
        })

        Object.assign(queryData, data)
        // data delete('rows')
        console.log(queryData, data)

        if (data?.rows?.length || data.page > data.totalPage) {
          Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
        } else {
          Vue.set(props.field, 'items', [])
        }

        loading.value = false
      }
    }

    const endIntersect = (entries, observer, isIntersecting) => {
      const isAtFinalPage = [queryData.totalPage, queryData.page].includes(null)
        ? true
        : queryData.totalPage > queryData.page

      if (isIntersecting) {
        if (props.field.items.length && !props.field.loading && isAtFinalPage) {
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

    const removeSelected = () => {
      proxyValue.value = null
    }
    const update = (value) => {
      const item = props.field.items.find((el) => el.id === value)
      emit('input', value)
      emit('change', { value, field: props.field, item })
    }

    const disabled = computed(() => {
      return props.field.requiredFields
        ? props.field.requiredFields.some((el) => !props.formData[el])
        : false
    })
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
    onMounted(() => {
      // querySelections
      // console.log(
      //   'isAtFinalPage',
      //   queryData.totalPage,
      //   '>',
      //   queryData.page,
      //   isAtFinalPage
      // )
      // console.log(
      //   'isOverLimitPage',
      //   queryData.total,
      //   '<=',
      //   queryData.countRows,
      //   isOverLimitPage
      // )
    })
    return {
      proxyValue,
      endIntersect,
      removeSelected,
      querySelections,
      update,
      searchProps,
      disabled,
      loading,
    }
  },
}
