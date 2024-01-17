import Vue, { ref, onMounted } from 'vue'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'

export default {
  name: 'Form-Documents-Row',
  props: {
    document: {
      type: Object,
      default: () => {},
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Autocomplete,
    DropZone,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
      },
    }
    const loading = ref(false)
    const fields = () => {
      const fields = {}
      props.document.fields.forEach((el) => {
        const { validations } = el
        if (el.isShow) Vue.set(fields, el.name, {})
        else return
        Vue.set(fields[el.name], 'validations', validations)
        Vue.set(fields[el.name], 'default', el.value)
      })
      return fields
    }
    const dropZoneOptions = {
      withoutSave: true,
      folder: 'tmp',
    }
    const {
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
    } = useForm({
      form: props.document,
      fields: fields(),
      context,
      loading,
      //makeRequestList,
    })
    onMounted(async () => {})
    return {
      loading,
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
      dropZoneOptions,
    }
  },
}
