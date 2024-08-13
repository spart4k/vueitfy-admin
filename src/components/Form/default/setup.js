import Vue, { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/Autocomplete/form'
// import Autocomplete from '@/components/Autocomplete'
import Popup from '@/components/Popup/index.vue'

import _ from 'lodash'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datetimepicker from '@/components/Date/Datetimepicker/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'
import ColorPicker from '@/components/Colorpicker/index.vue'
import DateRange from '@/components/Date/Daterange/index.vue'
import store from '@/store'

export default {
  name: 'Form-Default',
  components: {
    Datetimepicker,
    Autocomplete,
    DropZone,
    ColorPicker,
    DateRange,
    Datepicker,
    Popup,
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
    formDataParent: {
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
        route,
      },
    }
    const loading = ref(true)
    const { alias } = props.tab

    const fieldsRef = ref(null)

    const isEdit = computed(() => {
      if (props.tab.routeParam) {
        return route.params[props.tab.routeParam] ? 'edit' : 'add'
        // return 'add'
      } else {
        return route.params.id ? 'edit' : 'add'
      }
    })
    // const fields = () => {
    //   const fields = {}
    //   const tabFields = {}
    //   for (let i = 0; i < props.tab.fields.length; i++) {
    //     tabFields[props.tab.fields[i].name] = props.tab.fields[i]
    //   }
    //   for (let key in tabFields) {
    //     const { validations } = tabFields[key]
    //     Vue.set(fields, tabFields[key].name, {})
    //     Vue.set(fields[tabFields[key].name], 'validations', validations)
    //     Vue.set(fields[tabFields[key].name], 'default', tabFields[key].value)
    //   }
    //   return fields
    // }

    const params = props.tab.lists
    // const data = params
    const getRequestParam = () => {
      console.log(alias, props.detail, props.detail?.requestId, 'request')
      if (props.detail?.requestId) {
        return _.get(route.params, props.detail.requestId)
      } else if (route.params.id) {
        return route.params.id
      }
    }
    const { makeRequest } = useRequest({
      context,
      request: async () => {
        const data = await store.dispatch(
          'form/get',
          `get/form/${alias}/${getRequestParam()}`
        )
        return data
      },
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: params?.successMessage === false ? false : 'Сохранено',
      request: (params) => {
        let routeParam
        if (params.action?.useRouteParam) {
          routeParam = params.action.useRouteParam
        } else {
          routeParam = 'id'
        }
        return store.dispatch(params.module, {
          url: params.url,
          body: { data: { id: +route.params[routeParam], ...params.formData } },
        })
      },
    })
    const { makeRequest: changeFormId } = useRequest({
      context,
      successMessage: params?.successMessage === false ? false : 'Сохранено',
      request: (params) => {
        let id
        console.log(route)
        if (props.tab.routeParam) {
          id = route.params[props.tab.routeParam]
        } else {
          id = route.params.id
        }
        return store.dispatch(params.module, {
          url: params.url + '/' + id,
          body: { data: { ...params.formData } },
        })
      },
    })
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: params?.successMessage === false ? false : 'Сохранено',
      request: (params) => {
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
        const req = store.dispatch(params.module, {
          url: params.url,
          id: route.params.id,
        })
        return req
      },
    })

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
    const closePopupForm = (double) => {
      router.push({ name: route.matched.at(-2).name })
      popupForm.value.isShow = false
      if (double) emit('closePopup')
    }

    const downloadFile = (link) => {
      Vue.downloadFile(link)
    }

    const getItems = () => {
      const refreshField = props.tab.fields.find((x) => {
        if (x.appendAction) {
          return x.appendAction.find(
            (y) => y.action.name === route.name && y.action.refresh
          )
        }
      })
      const refreshFullForm = props.tab.fields.find((x) => {
        if (x.appendAction) {
          return x.appendAction.find(
            (y) => y.action.name === route.name && y.action.refreshForm
          )
        }
      })
      if (refreshField) refreshSelectItems(refreshField)
      if (refreshFullForm) refreshForm()
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
      changeValue,
      showField,
      refreshSelectItems,
      refreshForm,
      openMenu,
      disabledField,
      hideField,
      changeCheckbox,
      readonlyField,
      refreshTable,
      isHideBtn,
      colsField,
      appendFieldHandler,
      popupForm,
      appendActionShow,
      isRequired,
      fields,
      emitFormData,
      environment,
    } = useForm({
      form: props.tab,
      context,
      detail: props.detail,
      loading,
      // fields: fields(),
      // setFields: fields,
      makeRequest,
      makeRequestList,
      isEdit,
      changeForm,
      mode: isEdit.value,
      createForm,
      deleteFormById,
      changeFormId,
      formDataParent: props.formDataParent,
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
      clickHandler,
      isEdit,
      disabledField,
      hideField,
      changeCheckbox,
      refreshTable,
      isHideBtn,
      route,
      colsField,
      appendFieldHandler,
      popupForm,
      closePopupForm,
      appendActionShow,
      getItems,
      fieldsRef,
      downloadFile,
      changeValue,
      isRequired,
      fields,
      mode: isEdit.value,
      emitFormData,
      environment,
    }
  },
}
