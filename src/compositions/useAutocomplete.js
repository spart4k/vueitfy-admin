import { selectsApi } from '@/api'
import { watch } from 'vue'

export default function (searchFields, fields) {
  const endIntersect = (entries, observer, isIntersecting) => {
    if (isIntersecting) {
      const dataset = entries[0].target.dataset.field
      const field = fields.find((el) => el.name === dataset)
      if (field.items.length && !field.loading) {
        //field.page = field.page + 10
        //Vue.set(field, 'page', field.page + 1)
        field.page = field.page + 1
        const params = {
          searc: field.search,
          name: field.name,
        }
        querySelections(params, field)
      }
    }
  }
  const querySelections = async (params, field) => {
    if (params.search || params.id) {
      if (params.search) params.search = params.search.toLowerCase()
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
        searchValue: params.search ? params.search : '',
        id: params.id ? params.id : -1,
      })
      if (data.rows) {
        field.items = [...field.items, ...data.rows]
        field.items = data.rows
      }

      //Vue.set(field, 'items', data.rows)
      field.loading = false
      //console.log(data.products, field)
    }
  }
  const deepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }
  watch(
    () => searchFields.value,
    (newVal, oldVal) => {
      newVal.forEach((_, elIndex) => {
        if (!deepEqual(newVal[elIndex], oldVal[elIndex])) {
          const params = newVal[elIndex]
          const fieldElement = fields.find((el) => el.search === params.search)
          querySelections(params, fieldElement)
        }
      })
      //const
      //console.log(newVal)
    }
  )
  return {
    querySelections,
    endIntersect,
  }
}
