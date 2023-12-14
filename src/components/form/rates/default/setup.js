import Vue, { onMounted, ref } from 'vue'
import tab from '../tab/index.vue'
import { stringAction } from '@/utils/actions'
import { useRoute, useRouter } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest.js'

import store from '@/store'
import { stringField, dateField, selectField } from '@/utils/fields'
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
    const listFields = ref([
      selectField({
        label: 'E',
        name: 'status_id',
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
          sm: 2,
        },
        bootstrapClass: [''],
        alias: 'p.status_id',
      }),
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
      stringField({
        label: 'Категория',
        name: 'category',
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
      }),
    ])
    const dialog = ref(false)
    const actionsDialog = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
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
    const loading = ref(false)
    const fields = () => {
      // console.log('rebuild fields')
      const fields = {}
      listFields.value.forEach((el) => {
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
      fields: fields(),
      context,
      loading,
      //makeRequestList,
    })
    const sendRates = async () => {
      console.log('test')
    }
    const { id } = route?.params
    const activeTab = ref(0)
    const actions = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
      }),
    ])
    const dialogName = ref('')
    const tabs = ref([
      {
        id: 0,
        name: 'Активные',
      },
      {
        id: 1,
        name: 'Не выставленный',
      },
      {
        id: 2,
        name: 'Не активные',
      },
    ])
    const openDialog = (name) => {
      dialog.value = true
      console.log(name)
      dialogName.value = name
    }
    const { makeRequest } = useRequest({
      context,
      request: () =>
        store.dispatch('form/get', `get/form/${props.tab.alias}/${id}`),
    })
    onMounted(async () => {
      //console.log(type)
      //const { data } = await makeRequest()
      //console.log(data)
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
      dialogName,
      objectInfo,
    }
  },
}
