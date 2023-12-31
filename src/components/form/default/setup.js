import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/autocomplete'
import FormDefault from '@/components/form/default/index.vue'

import _ from 'lodash'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/dropzone/default/index.vue'
import Datetimepicker from '@/components/datetimepicker/index.vue'
import ColorPicker from '@/components/colorpicker/index.vue'

import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
    ColorPicker,
  },
  props: {
    content: {
      type: Object,
      default: () => {},
    },
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
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()
    const autocompleteRef = ref(null)
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
      return fields
    }
    const params = props.tab.lists
    const data = params
    const getRequestParam = () => {
      if (props.detail?.requstId)
        return _.get(route.params, props.detail.requstId)
      return route.params.id
    }
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${alias}/${getRequestParam()}`),
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log()
        return store.dispatch(params.module, {
          url: params.url,
          body: { data: { id: +route.params.id, ...params.formData } },
        })
      },
    })
    const { makeRequest: changeFormId } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log()
        return store.dispatch(params.module, {
          url: params.url + '/' + route.params.id,
          body: { data: { ...params.formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log(formData, params)
        return store.dispatch(params.module, {
          url: params.url,
          body: {
            data: params.formData ? params.formData : formData,
          },
        })
      },
    })

    const { makeRequest: deleteFormById } = useRequest({
      context,
      successMessage: 'Удалено!',
      request(params) {
        console.log('params', params)
        const req = store.dispatch(params.module, {
          url: params.url,
          id: route.params.id,
        })
        return req
      },
    })

    console.log('props.tabs', props.tab)
    if (props.tab.hasOwnProperty('content')) {
      props.tab.fields[0].items[0].id = props.content.account_id
      props.tab.fields[0].items[0].name = props.content.account_name
      props.tab.fields[0].value = props.content.account_id
      props.tab.fields[2].value = Number(props.content.hour)
      props.tab.fields[1].value = props.content.date
      props.tab.fields[4].value = props.content.date.slice(0, -3)
      if (props.content.id) {
        props.tab.fields[6].value = props.content?.id
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
      openMenu,
      disabledField,
      hideField,
      addFiles,
      changeCheckbox,
      readonlyField,
      refreshTable,
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
      deleteFormById,
      changeFormId,
    })

    onMounted(async () => {
      await getData()
    })

    return {
      readonlyField,
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
      changeCheckbox,
      refreshTable,
    }
  },
}
