import { watch, ref } from 'vue'
import { selectsApi } from '@/api'

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
    const proxyValue = ref(props.value)
    const querySelections = async (params) => {
      if (params.search || params.id) {
        console.log(params.search, params.id)
        if (params.search) params.search = params.search.toLowerCase()
        //setTimeout(() => {
        //  const data = field.data
        //    .field((el) => el.toLowerCase().includes(string))
        //    .splice(0, 10)
        //  field.loading = false
        //  console.log(data)
        //  Vue.set(field, 'items', data)
        //}, 200)
        props.field.loading = true
        //const { data } = await axios.get(`
        //  https://dummyjson.com/products/search?q=${string}&limit=${field.page}
        //`)
        const { url } = props.field
        const data = await selectsApi.getApi(url, {
          countRows: 10,
          currentPage: props.field.page,
          searchValue: params.search ? params.search : '',
          id: params.id ? params.id : -1,
        })
        if (data.rows) {
          props.field.items = [...props.field.items, ...data.rows]
          props.field.items = data.rows
        }

        //Vue.set(field, 'items', data.rows)
        props.field.loading = false
        //console.log(data.products, field)
      }
    }
    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        //const dataset = entries[0].target.dataset.field
        console.log('isIntersecting')
        if (props.field.items.length && !props.field.loading) {
          //field.page = field.page + 10
          //Vue.set(field, 'page', field.page + 1)
          props.field.page = props.field.page + 1
          const params = {
            searc: props.field.search,
            name: props.field.name,
          }
          querySelections(params, props.field)
        }
      }
    }
    const removeSelected = () => {
      proxyValue.value = null
    }
    const update = (value) => {
      emit('change', { value, field: props.field })
    }
    watch(
      () => props.field.search,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
        const params = {
          id: props.value,
          search: props.field.search,
        }
        if (newVal !== null) querySelections(params)
      }
    )
    watch(
      () => proxyValue.value,
      (newVal) => emit('input', newVal)
    )
    return {
      proxyValue,
      endIntersect,
      removeSelected,
      querySelections,
      update,
    }
  },
}
