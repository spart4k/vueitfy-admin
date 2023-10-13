import Vue, { ref } from 'vue'
import useActions from '@/compositions/useActions'
import useForm from '@/compositions/useForm.js'
import store from '@/store'
import Autocomplete from '@/components/autocomplete'

export default {
  name: 'Form-Rows',
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
  components: {
    Autocomplete,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(false)
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (el.isShow) Vue.set(fields, el.name, {})
        else return
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    const changeAutocomplete = async (params) => {
      //const { value, field } = data
      if (hasDepenceFieldsApi()) {
        await getDependies(params)
      }
      if (params.field.dependence && params.field.dependence.type) {
        console.log(params)
        params.field.dependence.fillField.forEach(
          (el) => (formData[el] = params.item[el])
        )
      }
    }
    const { clickHandler } = useActions({
      context,
      tab: props.tab,
      loading,
    })
    const showField = (type, field) => {
      return (
        type === field.type && !loading.value && field.isShow
        //(field.mode === 'all' || field.mode === isEdit.value)
      )
    }
    const getDependies = async (params) => {
      const { value, field } = params
      const depField = field.dependence.field
      field.loading = true
      const data = await store.dispatch(field.dependence.module, {
        value,
        field,
      })

      const targetField = props.tab.fields.find((el) => el.name === depField)
      targetField.items = targetField.defaultItems
        ? [...targetField.defaultItems, ...data]
        : data
      let card = targetField.items.find((el) => el.id === formData[depField])

      //if (data.length === 1) formData[depField] = card.id
      if (card)
        field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
      else if (data.length === 1) {
        formData[depField] = data[0].id
        card = targetField.items.find((el) => el.id === formData[depField])
        field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
      } else if (data.length === 0) {
        formData[depField] = 11
        field.dependence.fillField.forEach((el) => (formData[el] = ''))
      } else {
        field.dependence.fillField.forEach((el) => (formData[el] = ''))
      }
      field.loading = false
      //formData[field.dependence.field] = data
    }
    const hasDepenceFieldsApi = () =>
      props.tab.fields.some(
        (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
      )
    return {
      clickHandler,
      loading,
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      changeAutocomplete,
      getDependies,
    }
  },
}
