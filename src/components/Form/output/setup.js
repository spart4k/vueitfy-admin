import Vue, { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/Autocomplete'
import FormDefault from '@/components/Form/default/index.vue'

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datetimepicker from '@/components/Date/Datetimepicker/index.vue'
import ColorPicker from '@/components/Colorpicker/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'

import _ from 'lodash'

import store from '@/store'

export default {
  name: 'Form-Output',
  components: {
    Datetimepicker,
    Autocomplete,
    FormDefault,
    DropZone,
    ColorPicker,
    Datepicker,
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
    const proxyTab = ref(_.cloneDeep(props.tab))
    const { emit } = ctx
    const route = useRoute()
    const router = useRouter()

    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const loading = ref(true)
    const stageRef = ref(null)
    const stage = ref({
      value: 0,
      items: [
        {
          name: 'Загрузка',
          value: 50,
        },
        {
          name: 'Корректировка',
          value: 0,
        },
        {
          name: 'Начисление',
          value: 0,
        },
      ],
    })
    const { alias } = proxyTab.value
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))

    const fields = () => {
      const fields = {}
      console.log('proxyTab.value', proxyTab.value)
      proxyTab.value.fields?.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          Vue.set(fields, el.name, {})
        } else return
        // if (el.name === 'vector') return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }

    const params = proxyTab.value.lists
    const getRequestParam = () => {
      if (props.detail?.requestId) {
        return _.get(route.params, props.detail.requestId)
      } else if (route.params.id) {
        return route.params.id
      }
    }
    const { makeRequest } = useRequest({
      context,
      request: () => {
        return store.dispatch(
          'form/get',
          `get/form/${alias}/${getRequestParam()}`
        )
      },
    })
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { makeRequest: changeForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        console.log(+route.params.id)
        return store.dispatch(params.module, {
          //url: `set/data/${alias}`,
          url: params.url,
          body: { data: { id: +route.params.id, ...formData } },
        })
      },
    })
    const { makeRequest: changeFormId } = useRequest({
      context,
      successMessage: params?.successMessage === false ? false : 'Сохранено',
      request: (params) => {
        console.log('proxyTab.value', proxyTab.value)
        let id
        if (proxyTab.value.routeParam) {
          id = route.params[proxyTab.value.routeParam]
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
      successMessage: 'Сохранено',
      request: async (params) => {
        const zayavka = await store.dispatch(params.module, {
          url: params.url,
          body: { data: params.formData ? params.formData : formData },
        })
        if (route.meta.mode.length === 2) {
          await store.dispatch('form/bindZayavka', {
            body: { id: +route.params.id, dop: { rashod_id: zayavka.id } },
          })
          emit('refreshData')
        }
        return zayavka
      },
    })

    watch(
      () => stage.value.value,
      (newVal, oldVal) => {
        if (newVal > oldVal) {
          stage.value.items[stage.value.value - 1].value = 100
          stageRef.value[stage.value.value - 1].children[1].ontransitionend =
            () => {
              stage.value.items[stage.value.value].value = 50
            }
        } else {
          stage.value.items[stage.value.value + 1].value = 0
          stageRef.value[stage.value.value + 1].children[1].ontransitionend =
            () => {
              stage.value.items[stage.value.value].value = 50
            }
        }
      }
    )

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
      isHideBtn,
      getDependies,
    } = useForm({
      form: proxyTab.value,
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
      changeFormId,
    })
    onMounted(async () => {
      await getData()
    })
    return {
      formData,
      validate,
      vForm,
      touchedForm,
      formErrors,
      getData,
      loading,
      showField,
      changeAutocomplete,
      changeSelect,
      openMenu,
      clickHandler,
      isEdit,
      disabledField,
      hideField,
      addFiles,
      changeCheckbox,
      readonlyField,
      getDependies,
      isHideBtn,
      proxyTab,
      stage,
      stageRef,
    }
  },
}
