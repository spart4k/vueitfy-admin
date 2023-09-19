import Vue, { onMounted, computed, watch, ref } from 'vue'
//import axios from 'axios'

import { selectsApi } from '@/api'

export default {
  name: 'Table-Filter',
  props: {
    filtersConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
      ],
      page: 0,
    }
  },
  watch: {
    async search(val) {
      if (val.length) {
        await this.querySelections(val)
      }
    },
  },
  methods: {},
  setup(props, ctx) {
    console.log(ctx)
    const { emit } = ctx
    const menuRef = ref(null)
    const saveDate = (filter) => {
      console.log(menuRef)
      menuRef.value.save(filter.date)
    }
    const querySelections = async (string, filter) => {
      console.log(string)
      if (string) {
        console.log('quiery')
        string = string.toLowerCase()
        //setTimeout(() => {
        //  const data = filter.data
        //    .filter((el) => el.toLowerCase().includes(string))
        //    .splice(0, 10)
        //  filter.loading = false
        //  console.log(data)
        //  Vue.set(filter, 'items', data)
        //}, 200)
        filter.loading = true
        //const { data } = await axios.get(`
        //  https://dummyjson.com/products/search?q=${string}&limit=${filter.page}
        //`)
        const { url } = filter
        const data = await selectsApi.getApi(url, {
          countRows: 10,
          currentPage: filter.page,
          searchValue: string,
        })
        console.log(data)
        if (data.rows) {
          filter.items = [...filter.items, ...data.rows]
        }

        //Vue.set(filter, 'items', data.rows)
        filter.loading = false
        //console.log(data.products, filter)
      }
    }
    const initData = () => {
      props.filtersConfig.map((el) => {
        //el.loading = false
        Vue.set(el, 'loading', false)
        //Vue.set(el, 'items', [])
        //el.search = 12331
        Vue.set(el, 'search', '')
        Vue.set(el, 'select', null)
        Vue.set(el, 'page', 1)
        el.component =
          el.type === 'select' ? (el.component = 'v-autocomplete') : ''
      })
    }
    const searchFields = computed(() =>
      props.filtersConfig.map((filter) => filter.search)
    )
    //const vm = this
    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        console.log(entries[0].target)
        const dataset = entries[0].target.dataset.filter
        const filter = props.filtersConfig.find((el) => el.name === dataset)
        console.log('isIntersecting')
        console.log(filter.items)
        if (filter.items.length && !filter.loading) {
          //filter.page = filter.page + 10
          //Vue.set(filter, 'page', filter.page + 1)
          filter.page = filter.page + 1
          querySelections(filter.search, filter)
        }
        //let moreVendors = loadMoreFromApi()
        //this.vendors = [ ...this.vendors, ...moreVendors]
      }
    }
    const tryClick = (data) => {
      console.log(data)
    }
    const removeSelected = (data, filter) => {
      filter.value.splice(data.index, 1)
    }
    const closeFilter = () => {
      console.log(emit)
      emit('closeFilter')
    }
    const saveFilter = () => {
      closeFilter()
      emit('saveFilter')
    }
    watch(
      () => searchFields.value,
      (newVal, oldVal) => {
        newVal.forEach((_, elIndex) => {
          if (newVal[elIndex] !== oldVal[elIndex]) {
            const string = newVal[elIndex]
            console.log(props.filtersConfig[0].search)
            const filterElement = props.filtersConfig.find(
              (el) => el.search === string
            )
            console.log(filterElement)
            querySelections(string, filterElement)
          }
        })
        //const
        //console.log(newVal)
      }
    )
    onMounted(() => {
      initData()
    })
    return {
      initData,
      searchFields,
      querySelections,
      endIntersect,
      tryClick,
      removeSelected,
      closeFilter,
      saveDate,
      saveFilter,
    }
  },
}
