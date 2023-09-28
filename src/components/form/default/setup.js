import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import Datetimepicker from '@/components/datetimepicker/index.vue'
import store from '@/store'
import autocomplete from '@/compositions/autocomplete'

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
    const syncForm = ref({})
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
    const searchFields = computed(() => {
      return props.tab.fields
        .filter((field) => field.search !== undefined)
        .map((field) => field.search)
    })
    const { endIntersect, querySelections } = autocomplete(
      searchFields,
      props.tab.fields
    )
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
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const getData = async () => {
      //÷const autocompletesFields =
      syncForm.value = await makeRequest()
      for (let formKey in syncForm.value.data) {
        const field = props.tab.fields.find(
          (fieldEl) => fieldEl.name === formKey
        )
        //field.value = syncForm.value.data[formKey]
        if (field) {
          formData[field.name] = syncForm.value.data[formKey]
        }
      }
      const lists = await makeRequestList()
      for (let keyList in lists.data) {
        const field = props.tab.fields.find((el) => el.name === keyList)
        field.items = lists.data[keyList]
      }
      const queries = props.tab.fields
        .filter((el) => el.search !== undefined)
        .map((el) => (el = querySelections('', el, formData[el.name])))
      console.log(queries)
      //props.tab.fields.forEach( async (el) => {
      //  const result = await querySelections({id: -1, string: ''}, el)
      //})
      const autocompletesFields = await Promise.all(queries)
      console.log(autocompletesFields)
    }
    const params = props.tab.lists
    const queryString = '?lists=' + [...params]
    const { loading, makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', `get/lists${queryString}`),
    })
    makeRequestList()
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
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
    }
  },
}
