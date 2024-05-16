import Vue, { ref, onMounted, computed } from 'vue'
import _ from 'lodash'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'
import CardsItem from '../item/default/index.vue'
import CardsNew from '../item/new/index.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Cards',
  components: {
    CardsItem,
    CardsNew,
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const loading = ref(false)
    const { options } = props
    const searchField = ref('')
    const pagination = ref({
      totalRows: null,
      currentPage: 1,
      totalPages: null,
      countRows: options.data.pageLength,
    })

    const items = ref([])

    const createItem = () => {
      console.log('createItem')
    }

    let controller
    const getItems = async () => {
      if (controller) controller.abort()
      controller = new AbortController()
      loading.value = true

      const data = await store.dispatch('table/get', {
        url: options.options.url,
        data: {
          countRows: pagination.value.countRows,
          currentPage: pagination.value.currentPage,
          searchGlobal: searchField.value,
          filter: [],
          searchColumns: [],
          sorts: [],
        },
        params: {
          signal: controller.signal,
        },
      })
      if (data.rows) {
        pagination.value.totalPages = data.totalPage
        pagination.value.totalRows = data.total
        items.value = [...data.rows]
        for (let i = pagination.value.countRows; i < data.total; i++) {
          items.value.push({
            loaded: false,
            index: i,
            page: Math.floor(i / pagination.value.countRows) + 1,
            intersecting: i % pagination.value.countRows === 0,
          })
        }
      }

      loading.value = false
      controller = undefined
    }

    const getPage = async (entries, observer, isIntersecting) => {
      const obsObject = items.value[entries[0].target.id]
      const data = await store.dispatch('table/get', {
        url: options.options.url,
        data: {
          countRows: pagination.value.countRows,
          currentPage: obsObject.page,
          searchGlobal: searchField.value,
          filter: [],
          searchColumns: [],
          sorts: [],
        },
      })
      data.rows.forEach((item) => {
        const emptyObjectIndex = items.value.findIndex(
          (x) => x.page === obsObject.page
        )
        Vue.set(items.value, emptyObjectIndex, item)
      })
    }

    onMounted(async () => {
      await getItems()
    })

    return {
      // cards,
      loading,
      createItem,
      getItems,
      getPage,
      items,
      searchField,
    }
  },
}
