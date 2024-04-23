import Vue, { ref, onMounted, watch } from 'vue'
import { stringField, selectField, dateField } from '@/utils/fields.js'
import { required } from '@/utils/validation.js'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import useForm from '@/compositions/useForm.js'
import Datepicker from '@/components/Date/Default/index.vue'
import Autocomplete from '@/components/Autocomplete/form'
import { stringAction } from '@/utils/actions'

export default {
  name: 'DocMain',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    docMainData: {
      type: Object,
      default: () => {},
    },
    correct: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Datepicker,
    Autocomplete,
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const osnConfirmed = ref(false)
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const fieldsConfig = ref([
      stringField({
        label: 'ФИО',
        name: 'name',
        placeholder: '',
        class: [''],
        prescription: 'items',
        notSend: true,
        position: {
          cols: 12,
          sm: 12,
        },
        value: props.docMainData.name,
        validations: { required },
        bootstrapClass: [''],
      }),
      dateField({
        label: 'Дата рождения',
        name: 'data_rojd',
        value: props.docMainData.data_rojd,
        type: 'date',
        readonly: true,
        menu: false,
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 6,
        },
        bootstrapClass: [''],
        disable: true,
        //mode: 'edit',
        validations: { required },
        isShow: true,
      }),
      selectField({
        label: 'Гражданство',
        name: 'grajdanstvo_id',
        // alias: 'status_pt',
        value: props.docMainData.grajdanstvo_id,
        placeholder: '',
        class: [''],
        selectOption: {
          text: 'name',
          value: 'id',
        },
        defaultItems: [
          {
            id: 1,
            name: 'РФ',
          },
          {
            id: 2,
            name: 'Узбекистан',
          },
          {
            id: 3,
            name: 'Таджикистан',
          },
          {
            id: 4,
            name: 'Киргизия',
          },
          {
            id: 5,
            name: 'Украина',
          },
          {
            id: 6,
            name: 'Казахстан',
          },
          {
            id: 7,
            name: 'Бєларусь',
          },
          {
            id: 8,
            name: 'Азербайджан',
          },
          {
            id: 9,
            name: 'Армения',
          },
          {
            id: 10,
            name: 'Молдова',
          },
          {
            id: 11,
            name: 'Туркменистан',
          },
        ],
        items: [
          {
            id: 1,
            name: 'РФ',
          },
          {
            id: 2,
            name: 'Узбекистан',
          },
          {
            id: 3,
            name: 'Таджикистан',
          },
          {
            id: 4,
            name: 'Киргизия',
          },
          {
            id: 5,
            name: 'Украина',
          },
          {
            id: 6,
            name: 'Казахстан',
          },
          {
            id: 7,
            name: 'Бєларусь',
          },
          {
            id: 8,
            name: 'Азербайджан',
          },
          {
            id: 9,
            name: 'Армения',
          },
          {
            id: 10,
            name: 'Молдова',
          },
          {
            id: 11,
            name: 'Туркменистан',
          },
        ],
        position: {
          cols: 12,
          sm: 6,
        },
        disable: true,
        validations: { required },
        bootstrapClass: [''],
      }),
    ])
    const tab = {
      path: 'add',
      id: 0,
      name: 'Заявка на расход',
      detail: false,
      lists: [{ alias: 'status_zr', filter: [] }],
      alias: 'zayavka',
      active: false,
      fields: fieldsConfig.value,
      actions: [
        stringAction({
          text: 'Исправить',
          type: 'submit',
          color: 'primary',
          module: 'form/create',
          url: 'create/zayavka',
          name: 'createForm',
          action: 'createForm',
          // useStorageKey: [{ requestKey: 'personal_id', storageKey: 'id' }],
        }),
      ],

      formData: {},
    }
    const fields = () => {
      const fields = {}
      fieldsConfig.value.forEach((el) => {
        const { validations } = el
        if (typeof el.isShow === 'boolean' && el.isShow)
          Vue.set(fields, el.name, {})
        else if (typeof el.isShow === 'object' && el.isShow.value) {
          //
          Vue.set(fields, el.name, {})
        } else {
          return
        }
        Vue.set(fields, el.name, {})
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const { makeRequest: makeRequestList, loading } = useRequest({
      context,
      request: (data) => store.dispatch('list/get', data),
    })
    const { formData, formErrors, getData, vForm, readonlyField } = useForm({
      form: tab,
      context,
      // detail: props.detail,
      loading,
      fields: fields(),
      setFields: fields,
      makeRequestList,
      // isEdit: ref('edit'),
      // mode: 'add',
    })
    const sumbitDoc = () => {
      osnConfirmed.value = true
    }
    watch(formData, () => {
      console.log(formData)
      osnConfirmed.value = false
    }),
      { deep: true }
    onMounted(async () => {
      // await getData()
    })
    return {
      fieldsConfig,
      formData,
      // fieldsTemplate: fieldsTemplate(),
      // showField,
      vForm,
      formErrors,
      readonlyField,
      osnConfirmed,
      sumbitDoc,
      tab,
    }
  },
}
