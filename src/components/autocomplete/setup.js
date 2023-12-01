import Vue, { watch, ref, computed } from 'vue'
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
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)
    const proxyValue = ref(props.value)
    const searchProps = ref(props.field.search)
    const querySelections = async (params, isObs = false) => {
      if (params.search || params.id || isObs) {
        if (params.search) params.search = params.search.toLowerCase()

        //setTimeout(() => {
        //  const data = field.data
        //    .field((el) => el.toLowerCase().includes(string))
        //    .splice(0, 10)
        //  field.loading = false
        //  console.log(data)
        //  Vue.set(field, 'items', data)
        //}, 200)

        loading.value = true
        //const { data } = await axios.get(`
        //  https://dummyjson.com/products/search?q=${string}&limit=${field.page}
        //`)
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
        if (data?.rows?.length) {
          Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
        } else {
          Vue.set(props.field, 'items', [])
        }

        //Vue.set(field, 'items', data.rows)
        loading.value = false
        //console.log(data.products, field)
      }
    }
    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        console.log(isIntersecting)
        //const dataset = entries[0].target.dataset.field
        if (props.field.items.length && !props.field.loading) {
          //field.page = field.page + 10
          //Vue.set(field, 'page', field.page + 1)
          props.field.page = props.field.page + 1
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
