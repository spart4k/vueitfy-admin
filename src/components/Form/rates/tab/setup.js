import Vue, { onMounted, ref, watch } from 'vue'
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
    tab: {
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
    // const items = ref([
    //   {
    //     id: 12,
    //     items: [
    //       {
    //         category: 2,
    //         date_active_po: '2023-08-31',
    //         date_active_s: '2023-05-30',
    //         doljnost_name: 'Размещ в ячей хран «Фреш/Заморозка»',
    //         id: 96,
    //         price: 10,
    //         service_id: 12,
    //       },
    //     ],
    //     name: 'Размещ в ячей хран «Фреш/Заморозка»',
    //   },
    //   {
    //     id: 63,
    //     items: [
    //       {
    //         category: 2,
    //         date_active_po: '2023-04-30',
    //         date_active_s: '2023-01-01',
    //         doljnost_name: 'Усиление',
    //         id: 14,
    //         price: 1500,
    //         service_id: 63,
    //       },
    //     ],
    //     name: 'Усиление',
    //   },
    // ])
    const items = ref([])
    const search = ref('')
    const openDialog = (params) => {
      emit('openDialog', params)
    }
    const loading = ref(true)
    const queryOptions = ref({
      page: 1,
      totalPage: null,
    })
    const querySelections = async (isObs = false) => {
      if (search.value || isObs) {
        if (search.value) search.value = search.value.toLowerCase()

        //setTimeout(() => {
        //  const data = field.data
        //    .field((el) => el.toLowerCase().includes(string))
        //    .splice(0, 10)
        //  field.loading = false
        //
        //  Vue.set(field, 'items', data)
        //}, 200)

        loading.value = true
        //const { data } = await axios.get(`
        //  https://dummyjson.com/products/search?q=${string}&limit=${field.page}
        //`)
        //const { url } = props.field
        const url = `get/pagination/${props.tab.url}`
        //const filter = []

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
        // Object.assign(queryOptions, data)
        queryOptions.value.totalPage = data.totalPage
        if (data.rows && data.rows.length) {
          //props.field.items = [...props.field.items, ...data.rows]
          //Vue.set(props.field, 'items', [...props.field.items, ...data.rows])
          if (queryOptions.value.page === 1) {
            items.value = [...data.rows]
          } else {
            items.value = [...items.value, ...data.rows]
          }
          //props.field.items = data.rows
        } else {
          //Vue.set(props.field, 'items', [])
          items.value = []
          //props.field.items = []
        }

        //Vue.set(field, 'items', data.rows)
        loading.value = false
        //
      }
    }
    const endIntersect = async (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        //const dataset = entries[0].target.dataset.field
        if (items.value.length && !loading.value) {
          //field.page = field.page + 10
          //Vue.set(field, 'page', field.page + 1)
          if (
            queryOptions.value.totalPage !== null &&
            queryOptions.value.page !== queryOptions.value.totalPage
          ) {
            queryOptions.value.page = queryOptions.value.page + 1
            const params = {
              search: search.value,
            }
            loading.value = true
            await querySelections(params, true)
          }
          // loading.value = true
        }
      }
    }
    //const { makeRequest } = useRequest({
    //  context,
    //  request: () => ''
    //    //store.dispatch('form/get', `get/form/${props.tab.alias}/${id}`),
    //})
    //get/pagination/object_price_active
    watch(
      () => search.value,
      () => {
        queryOptions.value.page = 1
        querySelections(true)
      }
    )
    onMounted(async () => {
      // queryOptions.value.page = 1
      await querySelections(true)
    })
    return {
      items,
      search,
      openDialog,
      endIntersect,
      loading,
      querySelections,
      queryOptions,
    }
  },
}
