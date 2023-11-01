import Autocomplete from '@/components/autocomplete'
import store from '@/store'

export default {
  name: 'Form-Rows-Row',
  props: {
    //field: {
    //  type: Object,
    //  default: () => {},
    //},
    formData: {
      type: Object,
      default: () => {},
    },
    formErrors: {
      type: Object,
      default: () => {},
    },
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    row: {
      type: [String, Object],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Autocomplete,
  },
  setup(props) {
    const showField = (type, field) => {
      return (
        type === field.type && !props.loading.value && field.isShow
        //(field.mode === 'all' || field.mode === isEdit.value)
      )
    }
    const changeAutocomplete = async (params) => {
      //const { value, field } = data
      console.log(params)
      if (hasDepenceFieldsApi()) {
        await getDependies(params)
      }
      if (
        params.field.dependence &&
        params.field.dependence.type &&
        params.field.dependence.fillField
      ) {
        console.log(params)
        params.field.dependence.fillField.forEach(
          (el) => (props.formData[el] = params.item[el])
        )
      }
    }
    const getDependies = async (params) => {
      const { value, field } = params
      const depField = field.dependence.field
      let url = ''
      if (field.dependence.url) {
        //const splitedUrl = field.dependence.url.split('/')
        field.dependence.url.forEach((el) => {
          console.log(el.source)
          if (el.source === 'props') {
            url = '/' + props.tab.formData[el.field]
          } else if (el.source === 'props.formData') {
            url = '/' + props.formData[el.field]
          }
        })
      }
      console.log(url)
      field.loading = true
      const data = await store.dispatch(field.dependence.module, {
        value,
        field,
        url,
      })

      const targetField = props.tab.fields.find((el) => el.name === depField)
      console.log(targetField)
      targetField.items = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      let card = targetField.items.find(
        (el) => el.id === props.formData[depField]
      )

      //if (data.length === 1) props.formData[depField] = card.id
      console.log(props.formData[depField])
      console.log(targetField)
      console.log(card)
      if (card)
        if (field.dependence.fillField) {
          field.dependence.fillField.forEach(
            (el) => (props.formData[el] = card[el])
          )
        } else if (data.length === 1) {
          props.formData[depField] = data[0].id
          card = targetField.items.find(
            (el) => el.id === props.formData[depField]
          )
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach(
              (el) => (props.formData[el] = card[el])
            )
          }
        } else if (data.length === 0) {
          props.formData[depField] = 11
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach(
              (el) => (props.formData[el] = '')
            )
          }
        } else {
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach(
              (el) => (props.formData[el] = '')
            )
          }
        }
      field.loading = false
      //props.formData[field.dependence.field] = data
    }
    const hasDepenceFieldsApi = () =>
      props.tab.fields.some(
        (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
      )
    return {
      showField,
      changeAutocomplete,
    }
  },
}
