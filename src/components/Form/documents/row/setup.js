import Vue, { ref, onMounted, computed } from 'vue'
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
    skan: {
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
    const dropZoneOptions = {
      withoutSave: true,
      folder: 'tmp',
    }
    // const documentData = computed(() => {
    //   let result = []
    //   result = Object.values(props.document)[0].reduce((acc, item) => {
    //     acc.push({
    //       name: Object.keys(item)[0],
    //       value: Object.values(item)[0],
    //     })
    //     return acc
    //   }, [])
    //   return result
    // })
    const documentName = computed(() => Object.keys(props.document)[0])

    const fields = () => {
      const fields = {}
      props.document.docs_data.forEach((el) => {
        // const { validations } = el
        const name = Object.keys(el)[0]
        Vue.set(fields, name, {})
        // // else return
        Vue.set(fields[name], 'validations', {})
        if (Object.values(el)[0]) {
          Vue.set(fields[name], 'default', Object.values(el)[0])
        } else {
          Vue.set(fields[name], 'default', '')
        }
      })
      console.log(fields)
      return fields
    }
    fields()
    const {
      showField,
      formData,
      validate,
      formErrors,
      vForm,
      touchedForm,
      openMenu,
    } = useForm({
      // form: props.document,
      fields: fields(),
      context,
      loading,
      //makeRequestList,
    })
    const switchLabel = (key) => {
      let result = ''
      switch (key) {
        case 'pasp_data_vid':
          result = 'Дата выдачи'
          break
        case 'pasp_ser':
          result = 'Серия'
          break
        case 'pasp_num':
          result = 'Номер'
          break
        case 'pasp_kod_podr':
          result = 'Код подразделения'
          break
        case 'pasp_kem':
          result = 'Кем выдан'
          break
        case 'snils':
          result = 'Снилс'
          break
        case 'invoice':
          result = 'Номер Р/С'
          break
        case 'priority':
          result = 'Приоритет'
          break
        case 'bank_id':
          result = 'Банк'
          break
        case 'comment':
          result = 'Примечание'
          break
        case 'registration_address':
          result = 'Адрес'
          break
        case 'patent_ser':
          result = 'Серия'
          break
        case 'patent_num':
          result = 'Номер'
          break
        case 'patent_prof':
          result = 'Профессия'
          break
        case 'pasp_address_reg':
          result = 'Адрес'
          break
        case 'med_book_date':
          result = 'Дата'
          break
        case 'view_home_ser':
          result = 'Серия'
          break
        case 'view_home_num':
          result = 'Номер'
          break
        default:
          result = key
      }
      return result
    }
    let fileExt
    let fileName
    let form_data
    const isEdit = ref(false)
    let file = ref('')
    const basketFiles = ref({})
    const pathDock = ref('')
    const toEdit = () => {
      isEdit.value = true
    }
    const toPreview = () => {
      isEdit.value = false
    }
    let addFiles = (e) => {
      file.value = e[0]
      fileExt = file.value.type.split('/')[1]
      fileName = `personal_doc_` + Date.now() + '.' + fileExt
      form_data = new FormData()
      form_data.append('file', e[0])
      console.log(fileExt, fileName, form_data, e[0])
      basketFiles.value = {
        fileExt,
        fileName,
        form_data,
        file,
      }
    }
    onMounted(async () => {
      // if (props.document.path_doc) {
      //   isEdit.value = false
      // }
      pathDock.value = [props.document.path_doc]
    })
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
      documentName,
      switchLabel,
      basketFiles,
      pathDock,
      addFiles,
      isEdit,
      toEdit,
      toPreview,
      // documentData,
    }
  },
}
