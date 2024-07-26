import Vue, {
  nextTick,
  computed,
  ref,
  onMounted,
  watch,
  onUnmounted,
} from 'vue'
import { useRouter, useRoute } from 'vue-router/composables'
import Autocomplete from '@/components/Autocomplete/form'
import FormDefault from '@/components/Form/default/index.vue'
import DefaultStage from './LastStage/default/index.vue'
import PaymentStage from './LastStage/payment/index.vue'

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
    DefaultStage,
    PaymentStage,
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
      count: 0,
      count_payment: null,
      type: null,
      showForm: true,
      errors: [],
      targets: {},
      firstLoad: true,
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
        stage.value.outputId = data.parser_id
        stage.value.showForm = false
        stage.value.errors = data.errors
        stage.value.targets = data.targets
        stage.value.type = requestData.type_parser
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
      Object.keys(data)?.forEach((item) => {
        Object.entries(data[item])?.forEach((key) => {
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
        stage.value.targets = response.targets
        stage.value.type = response.subtype
        setOutputData(response.data)
      } else {
        stage.value.firstLoad = false
      }
    }

    const { makeRequest: changeOutputStage } = useRequest({
      context,
      request: (data) => {
        return store.dispatch('form/update', data)
      },
    })

    const { makeRequest: setFinalOutput } = useRequest({
      context,
      request: (data) => {
        return store.dispatch('form/update', data)
      },
    })

    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: async (data) => {
        const response = await store.dispatch('list/get', data)
        return response
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
      if (proxyTab.value.outputType === 1) {
        const firstReq = await changeOutputStage({
          url: 'create/pay/by_import',
          body: {
            data: {
              parser_id: stage.value.outputId,
              type_parser: stage.value.type,
            },
          },
        })
        if (firstReq.code !== 1) return
        stage.value.count_payment = firstReq.data.count_payment
      } else if (proxyTab.value.outputType === 2) {
        console.log('zxc')
      } else if (proxyTab.value.outputType === 3) {
        const firstReq = await changeOutputStage({
          url: `add/target/service/${stage.value.outputId}`,
          body: { data: {} },
        })
        if (firstReq.code !== 1) return
      }
      const secondReq = await setFinalOutput({
        url: 'set/data/active_parsers',
        body: {
          data: {
            id: stage.value.outputId,
            status: 3,
          },
        },
      })
      if (secondReq.result === 1) {
        store.commit('notifies/showMessage', {
          color: 'success',
          content:
            proxyTab.value.outputType === 1
              ? `Создано ${stage.value.count_payment} начислений`
              : proxyTab.value.outputType === 2
              ? ''
              : `Добавлена выработка на ${stage.value.count} назначений`,
          timeout: 3000,
        })
      }
      if (secondReq.type === 'success') {
        emit('getItems')
        emit('closePopup')
      }
    }

    const getDownloadPath = async () => {
      const data = await store.dispatch('table/get', {
        url: 'report/excel/parser_error',
        data: {
          parser_id: stage.value.outputId,
        },
      })
      if (data.code === 1) {
        Vue.downloadFile(data.result)
      } else if (data.code === 2) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: data.result,
          timeout: 1000,
        })
      }
    }

    const buttonHandler = (action) => {
      if (action.confirm && !confirm.value.isShow) {
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

    const equateStages = (val) => {
      let nextStage = 1
      if (stage.value.value < val) nextStage = -1
      stage.value.items[val].value = nextStage > 0 ? 100 : 0
      stageRef.value[val].children[1].ontransitionend = () => {
        stage.value.items[val + nextStage].value = 50
      }
      stageRef.value[val + nextStage].children[1].ontransitionend = () => {
        if (val + nextStage !== stage.value.value) equateStages(val + nextStage)
        else if (stage.value.firstLoad) stage.value.firstLoad = false
      }
    }

    watch(
      () => stage.value.value,
      (newVal, oldVal) => {
        equateStages(oldVal)
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
      // fields: fields(),
      // setFields: fields,
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
      getDownloadPath,

      DefaultStage,
    }
  },
}
