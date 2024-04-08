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

import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'
//import useAutocomplete from '@/compositions/useAutocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datetimepicker from '@/components/Date/Datetimepicker/index.vue'
import ColorPicker from '@/components/Colorpicker/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'
import moment from 'moment'

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
      count: 0,
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
    const list = ref({
      service: [],
      personal: [],
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
      request: async (data) => {
        const response = await store.dispatch('list/get', data)
        if (response.data.service_spr)
          list.value.service = response.data.service_spr
        return response
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
        if (stage.value.value === 2 && !list.value.personal.length) {
          getPersonal()
        }
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
      successMessage: `Добавлена выработка на ${stage.value.count} назначений`,
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
      if (stage.value.value === 2 && !list.value.personal.length) {
        getPersonal()
      }
    }

    const loadingPersonal = ref(false)
    const getPersonal = async () => {
      const requestList = Object.keys(stage.value.targets).map((item) => {
        return +item
      })
      loadingPersonal.value = true
      const responseData = await makeRequestList([
        {
          alias: 'parser_personal_id',
          filter: [{ alias: 'personal_id', value: requestList }],
        },
      ])
      list.value.personal = responseData.data.parser_personal_id
      loadingPersonal.value = false
    }

    const loadParser = async () => {
      const firstReq = await changeOutputStage({
        url: `add/target/service/${stage.value.outputId}`,
        body: { data: {} },
      })
      stage.value.count = firstReq.count
      const secondReq = await setFinalOutput({
        url: 'set/data/active_parsers',
        body: {
          data: {
            id: stage.value.outputId,
            status: 3,
          },
        },
      })
      if (secondReq.type === 'success') {
        emit('getItems')
        emit('closePopup')
      }
    }

    const getDownloadPath = async () => {
      const data = await store.dispatch('table/getList', {
        url: 'report/excel/parser_error',
        data: {
          parser_id: stage.value.outputId,
        },
      })
      // Vue.downloadFile(data.url)
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

    const convertData = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    const getPersonalName = (val) => {
      return list.value.personal.find((x) => x.id === +val)?.name
    }

    const getFinalSum = (val) => {
      return val.reduce((acc, item) => acc + item.sum, 0)
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
      convertData,
      list,
      getPersonalName,
      loadingPersonal,
      getFinalSum,
      getDownloadPath,
    }
  },
}
