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
      console.log(fields)
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
      const result = await Promise.all(queryFields)
      console.log(result)
    }
    const getData = async () => {
      const [syncForm, lists] = await Promise.all(initPreRequest())
      for (let formKey in syncForm.data) {
        const field = props.tab.fields.find(
          (fieldEl) => fieldEl.name === formKey
        )
        //field.value = syncForm.value.data[formKey]
        if (field) {
          formData[field.name] = syncForm.data[formKey]
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
    const changeAutocomplete = (data) => {
      const { value, field } = data
      console.log(value, field)
    }
    const submit = async () => {
      validate()
    }
    onMounted(async () => {
      await getData()
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
    }
  },
}
