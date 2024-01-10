import Vue, { onMounted, ref, watch, toRef, computed } from 'vue'
import useForm from '@/compositions/useForm.js'

import Autocomplete from '@/components/Autocomplete'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import _ from 'lodash'

export default {
  name: 'Form-Rows-Row',
  props: {
    //field: {
    //  type: Object,
    //  default: () => {},
    //},
    formData: {
      type: Object,
      default: () => {},
    },
    formErrors: {
      type: Object,
      default: () => {},
    },
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    row: {
      type: [String, Object],
    },
    error: {
      type: String,
      default: '',
    },
    //loading: {
    //  type: Boolean,
    //  default: false,
    //},
    activeTab: {
      type: Number,
      default: null,
    },
  },
  components: {
    Autocomplete,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(true)
    const fields = () => {
      console.log('fields')
      const fields = {}
      props.tab.fields.forEach((el) => {
        const { validations } = el
        if (!el.isShow) return
        const fieldName = el.name
        Vue.set(fields, fieldName, {})
        Vue.set(fields[fieldName], 'validations', validations)
        Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
        if (el.type === 'autocomplete' && el.alias) {
          Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
        }
      })
      return fields
    }
    const propsActiveTab = toRef(props, 'activeTab')
    const prevTab = ref({})
    const getDataFromPrevTav = () => {
      console.log(props.activeTab - 1, props.tabs)
      prevTab.value = props.tabs[0]
      if (props.tab.fromLastTab) {
        //const field = prevTab.value.find((el) => el.name === )
        const fields = props.tab.fromLastTab.map((el) => {
          const findEl = prevTab.value.fields.find((tabField) => {
            //console.log(tabField[el.alias], el.alias)
            return tabField[el.alias] === el.name
          })
          if (el.type === 'list') {
            formData[el.nameInTab] = findEl.items.find(
              (elItem) => elItem.id === props.tab.formData[el.name]
            ).name
          }
        })
      }
    }
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: (listdata) => store.dispatch('list/get', listdata),
    })
    const cloneForm = ref(_.cloneDeep(props.tab))
    const formatedRow = computed(() => {
      const splited = props.row.split('-')
      return `${splited[1]}.${splited[2]}.${splited[0]}`
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
    } = useForm({
      form: cloneForm.value,
      fields: fields(),
      isEdit: {
        value: true,
      },
      setFields: fields,
      context,
      loading,
      prevTab,
      makeRequestList,
    })
    onMounted(async () => {
      console.log('moun row')
      getDataFromPrevTav()
      loading.value = true
      await getData()
      loading.value = false
    })
    return {
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      showField,
      changeAutocomplete,
      clickHandler,
      getData,
      changeSelect,
      fields,
      prevTab,
      cloneForm,
      propsActiveTab,
      loading,
      formatedRow,
    }
  },
}
