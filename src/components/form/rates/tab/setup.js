import Vue, { onMounted, ref } from 'vue'
import row from '../row/index.vue'
//import useRequest from '@/compositions/useRequest.js'
import { useRoute } from 'vue-router/composables'
import { getList } from '@/api/selects'

//import store from '@/store'

export default {
  name: 'Tab',
  components: {
    row,
  },
  props: {
    objectInfo: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    //const context = {
    //  root: {
    //    store,
    //    router,
    //    ctx,
    //  },
    //}
    const { emit } = ctx
    const items = ref([])
    const search = ref('')
    const openDialog = (name) => {
      emit('openDialog', name)
    }
    const loading = ref(false)
    const queryOptions = ref({
      page: 1,
    })
    const querySelections = async (isObs = false) => {
      if (search.value || isObs) {
        if (search.value) search.value = search.value.toLowerCase()

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
        //const { url } = props.field
        const url = 'get/pagination/object_price_unassigned'
        //const filter = []
        console.log(props.objectInfo.id)
        const data = await getList(url, {
          countRows: 10,
          currentPage: queryOptions.value.page,
          searchGlobal: search.value ? search.value : '',
          searchColumns: [],
          sorts: [],
          //id: params.id ? params.id : -1,
          filter: [],
          by: [{ alias: 'object_id', value: +route.params.id }],
        })
        if (data.rows && data.rows.length) {
          //props.field.items = [...props.field.items, ...data.rows]
          //Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
          items.value = [...items.value, ...data.rows]
          //props.field.items = data.rows
        } else {
          //Vue.set(props.field, 'items', [])
          items.value = []
          //props.field.items = []
        }

        //Vue.set(field, 'items', data.rows)
        loading.value = false
        //console.log(data.products, field)
      }
    }
    const endIntersect = async (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        console.log(isIntersecting)
        //const dataset = entries[0].target.dataset.field
        if (items.value.length && !loading.value) {
          //field.page = field.page + 10
          //Vue.set(field, 'page', field.page + 1)
          queryOptions.value.page = queryOptions.value.page + 1
          const params = {
            search: search.value,
          }
          loading.value = true
          await querySelections(params, true)
          loading.value = true
        }
      }
    }
    //const { makeRequest } = useRequest({
    //  context,
    //  request: () => ''
    //    //store.dispatch('form/get', `get/form/${props.tab.alias}/${id}`),
    //})
    //get/pagination/object_price_active
    onMounted(async () => {
      console.log('mount')
      await querySelections(true)
    })
    return {
      items,
      search,
      openDialog,
      endIntersect,
      loading,
    }
  },
}
