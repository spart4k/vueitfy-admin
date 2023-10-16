import Vue, { ref, onMounted } from 'vue'
import useActions from '@/compositions/useActions'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/autocomplete'
import { getList } from '@/api/selects'
import form from '../../../store/modules/form'
import Row from './row/index.vue'

export default {
  name: 'Form-Rows',
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Autocomplete,
    Row,
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
      props.tab.formData.date_target.forEach((date) => {
        props.tab.fields.forEach((el) => {
          const { validations } = el
          if (!el.isShow) return
          const fieldName = date + '/' + el.name
          Vue.set(fields, fieldName, {})
          Vue.set(fields[fieldName], 'validations', validations)
          console.log(props.tab.formData[el.name])
          Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
          if (el.type === 'autocomplete' && el.alias) {
            Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
          }
        })
      })
      console.log(fields)
      return fields
    }
    const prevTab = ref({})
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
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
          (el) => (formData[el] = params.item[el])
        )
      }
    }
    const changeSelect = ({ value, field }) => {
      if (field.dependence) {
        const data = field.items.find((el) => el.id === value)
        field.dependence.fields.forEach((el) => (formData[el] = data[el]))
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
    const hasSelect = () =>
      props.tab.fields.some((field) => field.type === 'select' && field.isShow)
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
          } else if (el.source === 'formData') {
            url = '/' + formData[el.field]
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
      let card = targetField.items.find((el) => el.id === formData[depField])

      //if (data.length === 1) formData[depField] = card.id
      console.log(formData[depField])
      console.log(targetField)
      console.log(card)
      if (card)
        if (field.dependence.fillField) {
          field.dependence.fillField.forEach((el) => (formData[el] = card[el]))
        } else if (data.length === 1) {
          formData[depField] = data[0].id
          card = targetField.items.find((el) => el.id === formData[depField])
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach(
              (el) => (formData[el] = card[el])
            )
          }
        } else if (data.length === 0) {
          formData[depField] = 11
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach((el) => (formData[el] = ''))
          }
        } else {
          if (field.dependence.fillField) {
            field.dependence.fillField.forEach((el) => (formData[el] = ''))
          }
        }
      field.loading = false
      //formData[field.dependence.field] = data
    }
    const hasDepenceFieldsApi = () =>
      props.tab.fields.some(
        (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
      )
    const stringIsArray = (str) => {
      try {
        return new Function(`return Array.isArray(${str})`)()
      } catch {
        return false
      }
    }
    const params = props.tab.lists
    const queryString = '?lists=' + [...params]
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', `get/lists${queryString}`),
    })
    const loadAutocompletes = async () => {
      const fields = props.tab.fields
        .filter((el) => el.type === 'autocomplete' && el.isShow)
        .map((el) => el)
      const queryFields = fields.map(async (el) => {
        const filters = []
        const { url } = el
        console.log(el)
        if (el.filters && el.filters.length) {
          el.filters.forEach((filter) => {
            console.log(formData[filter.field])
            filters.push({
              field: filter.field,
              value: formData[filter.field],
            })
          })
        }
        const data = await getList(url, {
          countRows: 10,
          currentPage: 1,
          searchValue: '',
          id: formData[el.name],
          filters,
        })
        if (data.rows) {
          el.items = [...el.items, ...data.rows]
          el.items = data.rows
        }
        return data
      })
      await Promise.all(queryFields)
    }
    const initPreRequest = () => {
      let queries = []
      if (hasSelect()) {
        const lists = makeRequestList()
        queries = [undefined, lists]
        return queries
      } else return undefined
    }
    const getData = async () => {
      const [syncForm, lists] = await Promise.all(initPreRequest())
      if (syncForm) {
        for (let formKey in syncForm.data) {
          const field = props.tab.fields.find(
            (fieldEl) => fieldEl.name === formKey
          )
          if (field) {
            if (stringIsArray(syncForm.data[formKey]))
              syncForm.data[formKey] = JSON.parse(syncForm.data[formKey])
            formData[field.name] = syncForm.data[formKey]
            // Подгрузка полей с дополнительными зависимостями ( Например загрузка банк-их карт по id сотрудника)
            if (
              field.hasOwnProperty('dependence') &&
              field.dependence.type === 'api'
            ) {
              await getDependies({ value: formData[field.name], field })
            }
          }
        }
      }
      if (hasSelect()) {
        for (let keyList in lists.data) {
          console.log(keyList)
          const field = props.tab.fields.find((el) =>
            el.alias ? el.alias === keyList : el.name === keyList
          )
          if (field) field.items = lists.data[keyList]
        }
      }
      await loadAutocompletes()
      loading.value = false
    }
    const findSame = (arr1, arr2, property) => {
      const leastArr = arr1.length < arr2.length ? arr1 : arr2
      const biggestArr = arr1.length >= arr2.length ? arr1 : arr2

      const resultArray = leastArr.filter((item) => {
        return biggestArr.some((item2) => item2[property] === item[property])
      })
      return resultArray
    }
    const getDataFromPrevTav = () => {
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
            for (let key in formData) {
              const splited = key.split('/')
              console.log(splited)
              if (splited[1] === el.nameInTab) {
                console.log(splited)
                formData[key] = findEl.items.find(
                  (elItem) => elItem.id === props.tab.formData[el.name]
                ).name
                console.log(formData[key])
              }
            }
          }
        })
      }
    }
    onMounted(async () => {
      if (props.tabs && props.activeTab) getDataFromPrevTav()
      await getData()
    })
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
      getData,
      changeSelect,
      prevTab,
    }
  },
}
