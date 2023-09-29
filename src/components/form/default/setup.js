import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import Datetimepicker from '@/components/datetimepicker/index.vue'
import store from '@/store'
import autocomplete from '@/compositions/useAutocomplete'

export default {
  name: 'Form-Default',
  components: {
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
  setup(props, _) {
    //const syncForm = ref({})
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        _,
      },
    }
    const { alias } = props.tab
    const fields = () => {
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    const searchFields = computed(() => {
      console.log(props.tab.fields)
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
    const { endIntersect, querySelections } = autocomplete(
      searchFields,
      props.tab.fields
    )
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const getData = async () => {
      //÷const autocompletesFields =
      const syncForm = await makeRequest()
      const lists = await makeRequestList()
      for (let formKey in syncForm.data) {
        const field = props.tab.fields.find(
          (fieldEl) => fieldEl.name === formKey
        )
        //field.value = syncForm.value.data[formKey]
        console.log(field)
        if (field) {
          console.log('change field')
          formData[field.name] = syncForm.data[formKey]
        }
      }
      const queries = searchFields.value.map((el) => {
        const field = props.tab.fields.find((field) => field.name === el.name)
        console.log(field)
        return (el = querySelections(el, field))
      })
      const autocompletesFields = await Promise.all(queries)
      console.log(autocompletesFields)
      for (let keyList in lists.data) {
        console.log(lists.data, keyList)
        const field = props.tab.fields.find((el) => el.name === keyList)
        console.log(field)
        field.items = lists.data[keyList]
      }
      //const queries = props.tab.fields
      //  .filter((el) => el.search !== undefined)
      //  .map((el) => (el = querySelections('', el)))
      //console.log(queries)
      console.log(queries)
      //props.tab.fields.forEach( async (el) => {
      //  const result = await querySelections({id: -1, string: ''}, el)
      //})
    }
    const params = props.tab.lists
    const queryString = '?lists=' + [...params]
    const { loading, makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', `get/lists${queryString}`),
    })
    const showField = (type, field) => {
      return type === field.type && !loading.value && allLoaded
    }
    //makeRequestList()
    const allLoaded = ref(!props.tab.fields.some((el) => el.loading))
    const submit = async () => {
      validate()
    }
    onMounted(async () => {
      await getData()
    })
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
      getData,
      loading,
      showField,
      allLoaded,
    }
  },
}
