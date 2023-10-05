import Vue, { watch, ref } from 'vue'
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
    const searchProps = ref(props.field.search)
    const querySelections = async (params, isObs = false) => {
      console.log(params)
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
        if (data.rows && data.rows.length) {
          //props.field.items = [...props.field.items, ...data.rows]
          Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
          //props.field.items = data.rows
        } else {
          Vue.set(props.field, 'items', [])
          //props.field.items = []
        }
        console.log(props.field.items)

        //Vue.set(field, 'items', data.rows)
        props.field.loading = false
        //console.log(data.products, field)
      }
    }
    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        //const dataset = entries[0].target.dataset.field
        console.log(props.field)
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
      console.log('update')
      emit('change', { value, field: props.field })
    }
    watch(
      () => searchProps,
      (newVal) => {
        console.log(newVal, props.field.search, props.field.items)
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
      searchProps,
    }
  },
}
