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
      // countRows: options.data.pageLength,
      countRows: 5,
    })

    const createItem = () => {
      console.log('createItem')
    }

    // const items = ref([
    //   {
    //     vidana: '20.01.2023',
    //     block: '20.01.2024',
    //     bik: '888 888 888',
    //     lico: 'Координатор',
    //     validity: '10/23',
    //     cvv: '265',
    //     name: 'Сафонов Евгений',
    //     number: '1234 5678 9123 4567',
    //     bank_id: 1,
    //     id: 1,
    //     status: 1,
    //   },
    //   {
    //     vidana: '20.01.2023',
    //     block: '20.01.2024',
    //     bik: '888 888 888',
    //     lico: 'Координатор',
    //     validity: '10/23',
    //     cvv: '265',
    //     name: 'Сафонов Евгений',
    //     number: '1234 5678 9123 4567',
    //     bank_id: 1,
    //     id: 1,
    //     status: 2,
    //   },
    //   {
    //     vidana: '20.01.2023',
    //     block: '20.01.2024',
    //     bik: '888 888 888',
    //     lico: 'Координатор',
    //     validity: '10/23',
    //     cvv: '265',
    //     name: 'Сафонов Евгений',
    //     number: '1234 5678 9123 4567',
    //     bank_id: 2,
    //     id: 2,
    //     status: 3,
    //   },
    //   {
    //     vidana: '20.01.2023',
    //     block: '20.01.2024',
    //     bik: '888 888 888',
    //     lico: 'Координатор',
    //     validity: '10/23',
    //     cvv: '265',
    //     name: 'Сафонов Евгений',
    //     number: '1234 5678 9123 4567',
    //     bank_id: 2,
    //     id: 2,
    //     status: 4,
    //   },
    // ])

    const getItems = async () => {
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
      })
      if (data.rows?.length) {
        pagination.value.totalPages = data.totalPage
        pagination.value.totalRows = data.total
        options.data.rows = data.rows
        for (let i = pagination.value.countRows; i < data.total; i++) {
          options.data.rows.push({
            loaded: false,
            index: i,
            page: Math.floor(i / pagination.value.countRows) + 1,
            intersecting: i % pagination.value.countRows === 0,
            id: uuidv4(),
          })
        }
      }

      loading.value = false
    }

    const getPage = async (entries, observer, isIntersecting) => {
      const obsObject = options.data.rows[entries[0].target.id]
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
      options.data.rows.forEach((item, index) => {
        if (item.page === obsObject.page) {
          Vue.set(item, 'zxc', 'zxc')
          console.log(item)
        }
      })
    }

    onMounted(async () => {
      await getItems()
    })

    return {
      // cards,
      loading,
      createItem,
      getPage,
    }
  },
}
