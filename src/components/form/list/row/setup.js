import Vue, { onMounted, ref } from 'vue'
import useForm from '@/compositions/useForm.js'

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
    activeTab: {
      type: Number,
      default: null,
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
        if (!el.isShow) return
        const fieldName = el.name
        console.log(fieldName)
        Vue.set(fields, fieldName, {})
        Vue.set(fields[fieldName], 'validations', validations)
        console.log(props.tab.formData[el.name])
        Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
        if (el.type === 'autocomplete' && el.alias) {
          Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
        }
      })
      console.log(fields)
      return fields
    }
    // const showField = (type, field) => {
    //   return (
    //     type === field.type && !props.loading.value && field.isShow
    //     //(field.mode === 'all' || field.mode === isEdit.value)
    //   )
    // }
    // const changeAutocomplete = async (params) => {
    //   //const { value, field } = data
    //   console.log(params)
    //   if (hasDepenceFieldsApi()) {
    //     await getDependies(params)
    //   }
    //   if (
    //     params.field.dependence &&
    //     params.field.dependence.type &&
    //     params.field.dependence.fillField
    //   ) {
    //     console.log(params)
    //     params.field.dependence.fillField.forEach(
    //       (el) => (props.formData[el] = params.item[el])
    //     )
    //   }
    // }
    // const getDependies = async (params) => {
    //   const { value, field } = params
    //   const depField = field.dependence.field
    //   let url = ''
    //   if (field.dependence.url) {
    //     //const splitedUrl = field.dependence.url.split('/')
    //     field.dependence.url.forEach((el) => {
    //       console.log(el.source)
    //       if (el.source === 'props') {
    //         url = '/' + props.tab.formData[el.field]
    //       } else if (el.source === 'props.formData') {
    //         url = '/' + props.formData[el.field]
    //       }
    //     })
    //   }
    //   console.log(url)
    //   field.loading = true
    //   const data = await store.dispatch(field.dependence.module, {
    //     value,
    //     field,
    //     url,
    //   })

    //   const targetField = props.tab.fields.find((el) => el.name === depField)
    //   console.log(targetField)
    //   targetField.items = targetField.defaultItems
    //     ? [...targetField.defaultItems, ...data]
    //     : data
    //   let card = targetField.items.find(
    //     (el) => el.id === props.formData[depField]
    //   )

    //   //if (data.length === 1) props.formData[depField] = card.id
    //   console.log(props.formData[depField])
    //   console.log(targetField)
    //   console.log(card)
    //   if (card)
    //     if (field.dependence.fillField) {
    //       field.dependence.fillField.forEach(
    //         (el) => (props.formData[el] = card[el])
    //       )
    //     } else if (data.length === 1) {
    //       props.formData[depField] = data[0].id
    //       card = targetField.items.find(
    //         (el) => el.id === props.formData[depField]
    //       )
    //       if (field.dependence.fillField) {
    //         field.dependence.fillField.forEach(
    //           (el) => (props.formData[el] = card[el])
    //         )
    //       }
    //     } else if (data.length === 0) {
    //       props.formData[depField] = 11
    //       if (field.dependence.fillField) {
    //         field.dependence.fillField.forEach(
    //           (el) => (props.formData[el] = '')
    //         )
    //       }
    //     } else {
    //       if (field.dependence.fillField) {
    //         field.dependence.fillField.forEach(
    //           (el) => (props.formData[el] = '')
    //         )
    //       }
    //     }
    //   field.loading = false
    //   //props.formData[field.dependence.field] = data
    // }
    // const hasDepenceFieldsApi = () =>
    //   props.tab.fields.some(
    //     (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
    //   )
    const prevTab = ref({})
    const getDataFromPrevTav = () => {
      console.log('getPrev')
      console.log(prevTab.value)
      prevTab.value = props.tabs[props.activeTab - 1]
      if (props.tab.fromLastTab) {
        //const field = prevTab.value.find((el) => el.name === )
        const fields = props.tab.fromLastTab.map((el) => {
          const findEl = prevTab.value.fields.find((tabField) => {
            //console.log(tabField[el.alias], el.alias)
            return tabField[el.alias] === el.name
          })
          console.log(findEl)
          if (el.type === 'list') {
            console.log(findEl.items)
            console.log(formData)
            formData[el.nameInTab] = findEl.items.find(
              (elItem) => elItem.id === props.tab.formData[el.name]
            ).name
          }
        })
      }
    }
    const {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      clickHandler,
      getData,
      changeAutocomplete,
      changeSelect,
      showField,
    } = useForm({
      form: props.tab,
      fields: fields(),
      context,
      loading,
      prevTab,
      // makeRequestList,
    })
    onMounted(async () => {
      getDataFromPrevTav()
      await getData()
    })
    return {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      showField,
      changeAutocomplete,
      clickHandler,
      getData,
      changeSelect,
      fields,
      prevTab,
    }
  },
}
