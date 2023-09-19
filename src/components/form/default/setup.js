import { computed, watch } from 'vue'

import { selectsApi } from '@/api'

export default {
  name: 'Form-Default',
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const querySelections = async (string, field) => {
      console.log(string)
      if (string) {
        console.log('quiery')
        string = string.toLowerCase()
        //setTimeout(() => {
        //  const data = field.data
        //    .field((el) => el.toLowerCase().includes(string))
        //    .splice(0, 10)
        //  field.loading = false
        //  console.log(data)
        //  Vue.set(field, 'items', data)
        //}, 200)
        field.loading = true
        //const { data } = await axios.get(`
        //  https://dummyjson.com/products/search?q=${string}&limit=${field.page}
        //`)
        const { url } = field
        const data = await selectsApi.getApi(url, {
          countRows: 10,
          currentPage: field.page,
          searchValue: string,
        })
        console.log(data)
        if (data.rows) {
          field.items = [...field.items, ...data.rows]
        }

        //Vue.set(field, 'items', data.rows)
        field.loading = false
        //console.log(data.products, field)
      }
    }
    const searchFields = computed(() =>
      props.tab.fields.map((field) => field.search)
    )
    const endIntersect = (entries, observer, isIntersecting) => {
      if (isIntersecting) {
        console.log(entries[0].target)
        const dataset = entries[0].target.dataset.field
        const field = props.tab.fields.find((el) => el.name === dataset)
        console.log('isIntersecting')
        console.log(field.items)
        if (field.items.length && !field.loading) {
          //field.page = field.page + 10
          //Vue.set(field, 'page', field.page + 1)
          field.page = field.page + 1
          querySelections(field.search, field)
        }
        //let moreVendors = loadMoreFromApi()
        //this.vendors = [ ...this.vendors, ...moreVendors]
      }
    }
    watch(
      () => searchFields.value,
      (newVal, oldVal) => {
        newVal.forEach((_, elIndex) => {
          if (newVal[elIndex] !== oldVal[elIndex]) {
            const string = newVal[elIndex]
            const fieldElement = props.tab.fields.find(
              (el) => el.search === string
            )
            querySelections(string, fieldElement)
          }
        })
        //const
        //console.log(newVal)
      }
    )
    return {
      searchFields,
      endIntersect,
    }
  },
}
