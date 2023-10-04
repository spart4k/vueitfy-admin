import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/autocomplete'
import { selectsApi } from '@/api'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'

import Datetimepicker from '@/components/datetimepicker/index.vue'
import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
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
  setup(props, _) {
    //const syncForm = ref({})
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)
    const context = {
      root: {
        store,
        router,
        _,
      },
    }
    const loading = ref(true)
    const { alias } = props.tab
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (el.isShow) Vue.set(fields, el.name, {})
        else return
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      console.log(fields)
      return fields
    }
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    const searchFields = computed(() => {
      return props.tab.fields
        .filter((field) => field.search !== undefined)
        .map((field) => {
          return {
            id: formData[field.name],
            search: field.search,
            name: field.name,
          }
        })
    })
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const hasSelect = () =>
      props.tab.fields.some((field) => field.type === 'select' && field.isShow)
    const initPreRequest = () => {
      let queries = []
      if (hasSelect()) {
        const syncForm = makeRequest()
        const lists = makeRequestList()
        queries = [syncForm, lists]
        return queries
      } else {
        const syncForm = makeRequest()
        queries = [syncForm]
        return queries
      }
    }
    const loadAutocompletes = async () => {
      const fields = props.tab.fields
        .filter((el) => el.type === 'autocomplete' && el.isShow)
        .map((el) => el)
      const queryFields = fields.map(async (el) => {
        const { url } = el
        const data = await selectsApi.getApi(url, {
          countRows: 10,
          currentPage: 1,
          searchValue: '',
          id: formData[el.name],
        })
        if (data.rows) {
          el.items = [...el.items, ...data.rows]
          el.items = data.rows
        }
        return data
      })
      await Promise.all(queryFields)
    }
    const hasDepenceFieldsApi = () =>
      props.tab.fields.some(
        (el) => el.hasOwnProperty('dependence') && el.dependence.type === 'api'
      )
    const getData = async () => {
      console.log(formData.hour_fact)
      const [syncForm, lists] = await Promise.all(initPreRequest())
      for (let formKey in syncForm.data) {
        const field = props.tab.fields.find(
          (fieldEl) => fieldEl.name === formKey
        )
        if (field) {
          formData[field.name] = syncForm.data[formKey]
          console.log(formData.hour_fact)
          // Подгрузка полей с дополнительными зависимостями ( Например загрузка банк-их карт по id сотрудника)
          if (
            field.hasOwnProperty('dependence') &&
            field.dependence.type === 'api'
          ) {
            await getDependies({ value: formData[field.name], field })
          }
        }
      }
      if (hasSelect()) {
        for (let keyList in lists.data) {
          const field = props.tab.fields.find((el) => el.name === keyList)
          field.items = lists.data[keyList]
        }
      }
      await loadAutocompletes()
      loading.value = false
    }
    const params = props.tab.lists
    const queryString = '?lists=' + [...params]
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', `get/lists${queryString}`),
    })
    const showField = (type, field) => {
      return type === field.type && !loading.value && field.isShow
    }
    //makeRequestList()
    const changeAutocomplete = async (params) => {
      //const { value, field } = data
      if (hasDepenceFieldsApi()) {
        await getDependies(params)
      }
    }
    const getDependies = async (params) => {
      console.log(formData.hour_fact)
      const { value, field } = params
      const depField = field.dependence.field
      console.log(field)
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
      console.log(formData)
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
    //const setDepField = () => {

    //}
    const changeSelect = ({ value, field }) => {
      console.log(value, field)
      const data = field.items.find((el) => el.id === value)
      console.log(data)
      field.dependence.fields.forEach((el) => (formData[el] = data[el]))
    }
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: () =>
        store.dispatch('form/update', {
          url: `set/data/${alias}`,
          body: { data: { id: +route.params.id, ...formData } },
        }),
    })
    const submit = async () => {
      if (!validate()) return
      loading.value = true
      const result = await changeForm()
      console.log(result)
      loading.value = false
    }
    const openMenu = (field) => {
      field.menu = true
      console.log(field)
    }
    onMounted(async () => {
      await getData()
      console.log(formData.hour_fact)
    })
    return {
      searchFields,
      //endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      submit,
      formErrors,
      getData,
      loading,
      showField,
      autocompleteRef,
      changeAutocomplete,
      changeSelect,
      openMenu,
    }
  },
}
