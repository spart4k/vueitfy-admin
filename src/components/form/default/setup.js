import Vue, { computed, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/autocomplete'

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
    //const { endIntersect, querySelections } = useAutocomplete(
    //  searchFields,
    //  props.tab.fields
    //)
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
      //const queries = searchFields.value.map((el) => {
      //  const field = props.tab.fields.find((field) => field.name === el.name)
      //  return (el = querySelections(el, field))
      //})
      //await Promise.all(queries)
      if (hasSelect()) {
        for (let keyList in lists.data) {
          const field = props.tab.fields.find((el) => el.name === keyList)
          field.items = lists.data[keyList]
        }
      }
      //const queries = props.tab.fields
      //  .filter((el) => el.search !== undefined)
      //  .map((el) => (el = querySelections('', el)))
      //console.log(queries)
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
      return type === field.type && !loading.value && allLoaded && field.isShow
    }
    //makeRequestList()
    const allLoaded = ref(!props.tab.fields.some((el) => el.loading))
    const submit = async () => {
      validate()
    }
    onMounted(async () => {
      loading.value = true
      await getData()
    })
    watch(
      () => loading.value,
      () => {
        console.log(loading.value)
      }
    )
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
      allLoaded,
    }
  },
}
