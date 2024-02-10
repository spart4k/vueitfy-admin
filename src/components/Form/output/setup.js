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
    const outputData = ref(proxyTab.value.outputData)
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
      showForm: true,
      errors: [],
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
    const confirm = ref({
      isShow: false,
      text: '',
      width: null,
      action: null,
    })
    const subButtons = ref([
      {
        text: 'Отменить',
        color: 'error',
        action: 'changeFormStatus',
        local: true,
        icon: '$IconClose',
      },
      {
        text: 'Загрузить',
        type: 'submit',
        color: 'primary',
        name: 'saveFormStore',
        action: 'saveFormStore',
        notClose: true,
        module: 'form/loadParser',
        url: `load/parser/`,
        icon: '$IconDownload',
      },
    ])
    const { alias } = proxyTab.value
    const isEdit = computed(() => (route.params.id ? 'edit' : 'add'))

    const fields = () => {
      const fields = {}
      proxyTab.value.fields?.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          Vue.set(fields, el.name, {})
        } else return
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

    const { makeRequest: createForm } = useRequest({
      context,
      // successMessage: 'Сохранено',
      request: async (params) => {
        const requestData = _.cloneDeep(params.formData)
        if (stage.value.value) requestData.reparse = true
        const data = await store.dispatch(params.module, {
          url: params.url + proxyTab.value.outputType,
          body: requestData,
        })
        stage.value.value = 1
        stage.value.showForm = false
        stage.value.errors = data.errors
        setOutputData(data.data)
        return data
      },
    })

    const { makeRequest: getOutput } = useRequest({
      context,
      request: (url) => {
        return store.dispatch('form/get', url)
      },
    })

    const setOutputData = (data) => {
      Object.keys(data).forEach((item) => {
        Object.entries(data[item]).forEach((key) => {
          outputData.value[key[0]].value = key[1]
        })
      })
    }

    const checkOutputStage = async () => {
      const response = await getOutput(
        proxyTab.value.initialRequestUrl + proxyTab.value.outputType
      )
      stage.value.outputId = response.id
      stage.value.value = response.stage - 1
      if (stage.value.value) {
        stage.value.showForm = false
        stage.value.errors = response.errors
        setOutputData(response.data)
      }
    }

    const { makeRequest: changeOutputStage } = useRequest({
      context,
      request: (data) => {
        return store.dispatch('form/update', data)
      },
    })

    const changeStage = async (val) => {
      stage.value.value = stage.value.value + val
      await changeOutputStage({
        url: 'set/data/active_parsers',
        body: {
          data: {
            id: stage.value.outputId,
            stage: stage.value.value + 1,
          },
        },
      })
    }

    const loadParser = async () => {
      await changeOutputStage({
        url: `add/target/service/${stage.value.outputId}`,
        body: { data: {} },
      })
      await changeOutputStage({
        url: 'set/data/active_parsers',
        body: {
          data: {
            id: stage.value.outputId,
            status: 3,
          },
        },
      })
      // if (data.success) {
      // }
    }

    const buttonHandler = (action) => {
      if (action.confirm && !confirm.value.isShow) {
        console.log('actiom', confirm.value)
        confirm.value = {
          isShow: true,
          text: eval(action.confirm.text),
          width: action.confirm.width,
          action: action,
        }
        return
      } else if (action.local) {
        if (action.action === 'changeStage') changeStage(action.changeDirection)
        if (action.action === 'loadParser') loadParser()
        stage.value.showForm = false
      } else {
        clickHandler({ action, skipValidation: action.skipValidation })
      }
      confirm.value.isShow = false
    }

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

    onMounted(async () => {
      await checkOutputStage()
      await getData()
    })

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
      mode: isEdit.value,
      createForm,
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
      outputData,
      confirm,
      buttonHandler,
      subButtons,
      changeStage,
    }
  },
}
