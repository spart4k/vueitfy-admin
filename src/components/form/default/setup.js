import { computed } from 'vue'
//import DatetimePicker from 'vuetify-datetime-picker'
//import store from '@/store/index.js'
//import { email, phone, required, onlyNumeric } from '@/utills/validation.js'
import useForm from '@/compositions/useForm.js'
import Datetimepicker from '@/components/datetimepicker/index.vue'

//import { selectsApi } from '@/api'
import autocomplete from '@/compositions/autocomplete'

export default {
  name: 'Form-Default',
  components: {
    //DatetimePicker,
    Datetimepicker,
  },
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    //const querySelections = async (string, field) => {
    //  console.log(string)
    //  if (string) {
    //    console.log('quiery')
    //    string = string.toLowerCase()
    //    //setTimeout(() => {
    //    //  const data = field.data
    //    //    .field((el) => el.toLowerCase().includes(string))
    //    //    .splice(0, 10)
    //    //  field.loading = false
    //    //  console.log(data)
    //    //  Vue.set(field, 'items', data)
    //    //}, 200)
    //    field.loading = true
    //    //const { data } = await axios.get(`
    //    //  https://dummyjson.com/products/search?q=${string}&limit=${field.page}
    //    //`)
    //    const { url } = field
    //    const data = await selectsApi.getApi(url, {
    //      countRows: 10,
    //      currentPage: field.page,
    //      searchValue: string,
    //    })
    //    console.log(data)
    //    if (data.rows) {
    //      field.items = [...field.items, ...data.rows]
    //    }

    //    //Vue.set(field, 'items', data.rows)
    //    field.loading = false
    //    //console.log(data.products, field)
    //  }
    //}
    const searchFields = computed(() =>
      props.tab.fields.map((field) => field.search)
    )
    const { endIntersect } = autocomplete(searchFields, props.tab.fields)
    //const endIntersect = (entries, observer, isIntersecting) => {
    //  if (isIntersecting) {
    //    console.log(entries[0].target)
    //    const dataset = entries[0].target.dataset.field
    //    const field = props.tab.fields.find((el) => el.name === dataset)
    //    console.log('isIntersecting')
    //    console.log(field.items)
    //    if (field.items.length && !field.loading) {
    //      //field.page = field.page + 10
    //      //Vue.set(field, 'page', field.page + 1)
    //      field.page = field.page + 1
    //      querySelections(field.search, field)
    //    }
    //    //let moreVendors = loadMoreFromApi()
    //    //this.vendors = [ ...this.vendors, ...moreVendors]
    //  }
    //}
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        fields[el.name] = {}
        fields[el.name].validations = validations
        fields[el.name].default = el.value
      })
      return fields
    }
    console.log(fields())
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    const submit = async () => {
      validate()
      console.log(vForm.value)
      console.log(formData)
      console.log(formErrors.value)
    }
    console.log(formData)
    //watch(
    //  () => searchFields.value,
    //  (newVal, oldVal) => {
    //    newVal.forEach((_, elIndex) => {
    //      if (newVal[elIndex] !== oldVal[elIndex]) {
    //        const string = newVal[elIndex]
    //        const fieldElement = props.tab.fields.find(
    //          (el) => el.search === string
    //        )
    //        querySelections(string, fieldElement)
    //      }
    //    })
    //    //const
    //    //console.log(newVal)
    //  }
    //)
    return {
      searchFields,
      endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      submit,
      formErrors,
    }
  },
}
