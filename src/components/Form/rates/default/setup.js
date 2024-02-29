import Vue, { onMounted, ref, watch } from 'vue'
import tab from '../tab/index.vue'
import { stringAction } from '@/utils/actions'
import { useRoute, useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest.js'

import store from '@/store'
import { stringField, dateField, selectField, textBlock } from '@/utils/fields'
import { numeric, required } from '@/utils/validation.js'

export default {
  name: 'Rates',
  components: { tab },
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
      },
    }
    const objectInfo = ref({})
    const dialogParams = ref({
      id: '',
      name: '',
    })
    const listFields = ref([
      // selectField({
      //   label: 'E',
      //   name: 'status_id',
      //   subtype: 'single',
      //   placeholder: '',
      //   class: [''],
      //   selectOption: {
      //     text: 'name',
      //     value: 'id',
      //   },
      //   items: [
      //     {
      //       id: 1,
      //       name: '1',
      //     },
      //     {
      //       id: 2,
      //       name: '2',
      //     },
      //   ],
      //   position: {
      //     cols: 12,
      //     sm: 2,
      //   },
      //   bootstrapClass: [''],
      //   alias: 'p.status_id',
      // }),
      stringField({
        label: 'Сумма',
        name: 'price',
        placeholder: '',
        readonly: false,
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        validations: { numeric, required },
      }),
      // stringField({
      //   label: 'Категория',
      //   name: 'category',
      //   placeholder: '',
      //   readonly: false,
      //   class: [''],
      //   position: {
      //     cols: 12,
      //     sm: 3,
      //   },
      //   bootstrapClass: [''],
      //   validations: { numeric, required },
      // }),
      selectField({
        label: 'Категория',
        name: 'category',
        subtype: 'single',
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        items: [
          {
            id: 1,
            name: '1',
          },
          {
            id: 2,
            name: '2',
          },
        ],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.status_id',
        validations: { required },
      }),
      dateField({
        label: 'Дата ',
        name: 'date_active_s',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.date_add',
        validations: { required },
        max: 'date_active_po',
      }),
      dateField({
        label: 'Дата',
        name: 'date_active_po',
        placeholder: '',
        classes: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        bootstrapClass: [''],
        alias: 'p.date_add',
        validations: { required },
        min: 'date_active_s',
      }),
      textBlock({
        label: 'Сервис id',
        name: 'service_id',
        placeholder: '',
        readonly: true,
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        value: dialogParams.value.id,
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
      }),
      textBlock({
        label: 'Объект id',
        name: 'object_id',
        placeholder: '',
        readonly: true,
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        // value: dialogParams.value.id,
        bootstrapClass: [''],
        //validations: { required },
        //isShow: false,
      }),
    ])
    const dialog = ref(false)
    const actionsDialog = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/create',
        url: 'create/service_price',
        name: 'createForm',
        action: 'createForm',
      }),
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
        color: 'transparent',
        action: 'turnOff',
        variable: dialog,
        skipValidation: true,
      }),
    ])
    const activeTab = ref(0)
    const loading = ref(false)
    const fields = () => {
      //
      const fields = {}
      listFields.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          //
          Vue.set(fields, el.name, {})
        } else return
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      //
      return fields
    }
    const { makeRequest: createForm } = useRequest({
      context,
      successMessage: 'Сохранено',
      request: (params) => {
        formData.service_id = dialogParams.value.id
        formData.object_id = +route.params.id
        params.formData.service_id = dialogParams.value.id
        params.formData.object_id = +route.params.id
        const result = store.dispatch(params.module, {
          url: params.url,
          body: {
            data: params.formData ? params.formData : formData,
          },
        })
        dialog.value = false

        tabRef.value[activeTab.value].items = []
        tabRef.value[activeTab.value].loading = true
        tabRef.value[activeTab.value].querySelections(true)
        for (let key in formData) {
          formData[key] = ''
        }
        return result
      },
    })
    watch(
      () => activeTab.value,
      () => {
        tabRef.value[activeTab.value].items = []
        tabRef.value[activeTab.value].loading = true
        tabRef.value[activeTab.value].queryOptions.page = 1
        tabRef.value[activeTab.value].querySelections(true)
      }
    )
    const {
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
      clickHandler,
    } = useForm({
      form: { fields: listFields.value },
      fields: fields(),
      setFields: fields,
      context,
      loading,
      createForm,
      //makeRequestList,
    })
    const sendRates = async () => {}
    const { id } = route?.params
    const actions = ref([
      // stringAction({
      //   text: 'Сохранить',
      //   type: 'submit',
      //   module: 'form/create',
      //   url: 'create/object_price',
      //   name: 'createForm',
      //   action: 'createForm',
      //   // nextForm: true,
      // }),
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'transparent',
        name: 'closePopup',
        action: 'closePopup',
        to: 'object',
        skipValidation: true,
        notClose: true,
      }),
    ])
    const tabRef = ref(null)
    const tabs = ref([
      {
        id: 0,
        name: 'Активные',
        type: 'active',
        url: 'object_price_active',
      },
      {
        id: 1,
        name: 'Не выставленный',
        type: 'unassigned',
        url: 'object_price_unassigned',
      },
      // {
      //   id: 2,
      //   name: 'Не активные',
      //   type: 'not_active',
      //   url: 'object_price_active',
      // },
    ])
    const openDialog = (param) => {
      dialog.value = true
      //
      dialogParams.value.id = param.id
      dialogParams.value.name = param.name
      // dialogName.value = name
    }
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${props.tab.alias}/${id}`),
    })
    onMounted(async () => {
      //
      //const { data } = await makeRequest()
      //
      //objectInfo.value = data
    })
    return {
      tabs,
      activeTab,
      actions,
      loading,
      dialog,
      openDialog,
      formData,
      showField,
      validate,
      formErrors,
      vForm,
      openMenu,
      listFields,
      actionsDialog,
      clickHandler,
      dialogParams,
      objectInfo,
      tabRef,
    }
  },
}
