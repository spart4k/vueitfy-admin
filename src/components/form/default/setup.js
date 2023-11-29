import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/autocomplete'
import FormDefault from '@/components/form/default/index.vue'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/dropzone/default/index.vue'
import Datetimepicker from '@/components/datetimepicker/index.vue'
import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
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
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    //const syncForm = ref({})
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)
    // function addOrUpdateURLParam(key, value) {
    //   const searchParams = new URLSearchParams(window.location.search)
    //   searchParams.set(key, value)
    //   const newRelativePathQuery =
    //     window.location.pathname + '?' + searchParams.toString()
    //   history.pushState(null, '', newRelativePathQuery)
    // }

    // addOrUpdateURLParam('add', 'zxczxc')

    // console.log('new URL', window.location.href)
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const loading = ref(true)
    const stage = ref(null)
    const { alias } = props.tab
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))
    const fields = () => {
      // console.log('rebuild fields')
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          // console.log('CONDITION TRUE', el.name)
          Vue.set(fields, el.name, {})
        } else return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      // console.log(fields)
      return fields
    }
    const params = props.tab.lists
    const data = params
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${route.params.id}`),
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', data),
    })
    console.log(alias)
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log(data)
        return store.dispatch(params.module, {
          //url: `set/data/${alias}`,
          url: params.url,
          body: { data: { id: +route.params.id, ...formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) =>
        store.dispatch(params.module, {
          url: params.url,
          body: params.formData ? params.formData : formData,
        }),
    })
    // const { makeRequest: createForm } = useRequest({
    //   context,
    //   successMessage: 'Сохранено',
    //   request: () =>
    //     store.dispatch('form/create', {
    //       url: `query/${alias}`,
    //       body: formData,
    //     }),
    // })
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
      openMenu,
      disabledField,
      hideField,
      addFiles,
    } = useForm({
      form: props.tab,
      context,
      detail: props.detail,
      loading,
      fields: fields(),
      setFields: fields,
      makeRequest,
      makeRequestList,
      isEdit,
      changeForm,
      mode: isEdit.value,
      createForm,
    })
    onMounted(async () => {
      await getData()
    })
    return {
      //endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      formErrors,
      getData,
      loading,
      showField,
      autocompleteRef,
      changeAutocomplete,
      changeSelect,
      openMenu,
      stage,
      clickHandler,
      isEdit,
      disabledField,
      hideField,
      addFiles,
    }
  },
}
