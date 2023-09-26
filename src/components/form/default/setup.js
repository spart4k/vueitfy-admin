import Vue, { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'
//import DatetimePicker from 'vuetify-datetime-picker'
//import store from '@/store/index.js'
//import { email, phone, required, onlyNumeric } from '@/utills/validation.js'
import useForm from '@/compositions/useForm.js'
import Datetimepicker from '@/components/datetimepicker/index.vue'

//import { selectsApi } from '@/api'
import { form, list } from '@/api'
import autocomplete from '@/compositions/autocomplete'

export default {
  name: 'Form-Default',
  components: {
    //DatetimePicker,
    Datetimepicker,
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
    syncData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const loading = ref(false)
    const syncForm = ref({})
    const route = useRoute()
    const { alias } = props.tab
    const searchFields = computed(() =>
      props.tab.fields.map((field) => field.search)
    )
    const { endIntersect } = autocomplete(searchFields, props.tab.fields)
    const fields = async () => {
      const fields = {}
      loading.value = true
      await getData()
      loading.value = false
      props.tab.fields.forEach((el) => {
        const { validations } = el
        //fields[el.name] = {}
        Vue.set(fields, el.name, {})
        //fields[el.name].validations = validations
        Vue.set(fields[el.name], 'validations', validations)
        //fields[el.name].default = el.value
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const getData = async () => {
      syncForm.value = await form.get(
        `http://10.63.1.132:5000/get/form/${alias}/${route.params.id}`,
        {
          method: 'get',
        }
      )
      for (let formKey in syncForm.value.data) {
        console.log(formKey)
        const field = props.tab.fields.find(
          (fieldEl) => fieldEl.name === formKey
        )
        //field.value = syncForm.value.data[formKey]
        if (field) {
          formData[field.name] = syncForm.value.data[formKey]
        }
      }
      console.log(formData)
      await getLists()
      loading.value = false
    }
    const getLists = async () => {
      const params = props.tab.lists
      const queryString = '?lists=' + [...params]
      const lists = await list.get(
        `http://10.63.1.132:5000/get/lists${queryString}`,
        {
          method: 'get',
        }
      )
      for (let keyList in lists.data) {
        console.log(lists.data[keyList], keyList)
        const field = props.tab.fields.find((el) => el.name === keyList)
        console.log(field)
        field.items = lists.data[keyList]
      }
    }
    console.log(fields())
    const { formData, validate, formErrors, vForm, touchedForm } = useForm({
      fields: fields(),
    })
    console.log(formData)
    const submit = async () => {
      validate()
      console.log(vForm.value)
      console.log(formData)
      console.log(formErrors.value)
    }
    onMounted(async () => {
      //loading.value = true
      //getData()
      //loading.value = false
    })
    //watch(
    //  () => searchFields.value,
    //  (newVal, oldVal) => {
    //    newVal.forEach((_, elIndex) => {
    //      if (newVal[elIndex] !== oldVal[elIndex]) {
    //        const string = newVal[elIndex]
    //        const fieldElement = props.tab.fields.find(
    //          (el) => el.search === string
    //        )
    //        querySelections(string, fieldElement)
    //      }
    //    })
    //    //const
    //    //console.log(newVal)
    //  }
    //)
    return {
      searchFields,
      endIntersect,
      formData,
      validate,
      //$errors,
      vForm,
      touchedForm,
      submit,
      formErrors,
      getData,
    }
  },
}
