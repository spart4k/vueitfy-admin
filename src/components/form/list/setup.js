import Vue, { ref, onMounted } from 'vue'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/autocomplete'
import Row from './row/index.vue'

export default {
  name: 'Form-Rows',
  props: {
    tab: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Autocomplete,
    Row,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(false)
    // const fields = () => {
    //   const fields = {}
    //   props.tab.formData.date_target.forEach((date) => {
    //     props.tab.fields.forEach((el) => {
    //       const { validations } = el
    //       if (!el.isShow) return
    //       const fieldName = date + '/' + el.name
    //       Vue.set(fields, fieldName, {})
    //       Vue.set(fields[fieldName], 'validations', validations)
    //       console.log(props.tab.formData[el.name])
    //       Vue.set(fields[fieldName], 'default', props.tab.formData[el.name])
    //       if (el.type === 'autocomplete' && el.alias) {
    //         Vue.set(fields[fieldName], 'default', props.tab.formData[el.alias])
    //       }
    //     })
    //   })
    //   console.log(fields)
    //   return fields
    // }
    const prevTab = ref({})
    const params = props.tab.lists
    const data = params
    const { makeRequest: makeRequestList } = useRequest({
      context,
      request: () => store.dispatch('list/get', data),
    })
    const rows = ref([])
    const changeForm = async ({ url, module }) => {
      console.log(url, module)
      const {
        object_id,
        personal_id,
        doljnost_id,
        date_target,
        status,
        type_shift,
        with_nutrition,
        direction_id,
        sum_nutrition,
      } = props.tab.formData
      const defaultData = {
        object_id,
        personal_id,
        account_id: null, // ?
        doljnost_id,
        date_target: date_target[0],
        status,
        direction_id,
        comment: null,
        personal_bank_id: null, // ?
        bank_id: null, // ?
        fio: null,
        invoice: null,
        who_is_chief: null, // ?
        manager: null, // ?
        user_key: null,
        subtype: 9,
        brigadir_id: null, // ?
        type_shift,
        with_nutrition,
        sum_nutrition,
        print_form_key: null,
      }
      console.log(defaultData)
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
    } = useForm({
      form: props.tab,
      // fields: fields(),
      context,
      loading,
      makeRequestList,
      changeForm,
    })
    // const getDataFromPrevTav = () => {
    //   console.log('getPrev')
    //   prevTab.value = props.tabs[props.activeTab - 1]
    //   if (props.tab.fromLastTab) {
    //     //const field = prevTab.value.find((el) => el.name === )
    //     const fields = props.tab.fromLastTab.map((el) => {
    //       const findEl = prevTab.value.fields.find((tabField) => {
    //         //console.log(tabField[el.alias], el.alias)
    //         return tabField[el.alias] === el.name
    //       })
    //       console.log(findEl)
    //       if (el.type === 'list') {
    //         console.log(findEl.items)
    //         console.log(formData)
    //         for (let key in formData) {
    //           const splited = key.split('/')
    //           console.log(splited)
    //           if (splited[1] === el.nameInTab) {
    //             console.log(splited)
    //             formData[key] = findEl.items.find(
    //               (elItem) => elItem.id === props.tab.formData[el.name]
    //             ).name
    //             console.log(formData[key])
    //           }
    //         }
    //       }
    //     })
    //   }
    // }
    onMounted(async () => {
      // if (props.tabs && props.activeTab) getDataFromPrevTav()
      await getData()
    })
    return {
      clickHandler,
      loading,
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      changeAutocomplete,
      getData,
      changeSelect,
      prevTab,
      rows,
    }
  },
}
