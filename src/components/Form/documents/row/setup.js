import Vue, { ref, onMounted, computed } from 'vue'
import useForm from '@/compositions/useForm.js'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete'
import DropZone from '@/components/Dropzone/default/index.vue'
import Datepicker from '@/components/Date/Default/index.vue'

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
    personalId: {
      type: Number,
      default: null,
    },
  },
  components: {
    Autocomplete,
    DropZone,
    Datepicker,
  },
  setup(props, ctx) {
    const context = {
      root: {
        ctx,
        store,
      },
    }
    const loading = ref(false)
    const dropZoneOptions = {
      withoutSave: true,
      folder: 'personal_doc',
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
    const { makeRequest: delInfoAFile } = useRequest({
      context,
      request: (id) =>
        store.dispatch('taskModule/updateFileData', {
          data: {
            id,
            del: 1,
          },
        }),
    })
    const { makeRequest: loadImage } = useRequest({
      context,
      request: (file) =>
        store.dispatch('storage/loadFilePut', {
          // id: 1,
          folder: 'personal_doc',
          fileName: file.fileName,
          file: file.file,
        }),
      successMessage: 'Файл успешно загружен',
    })
    const { makeRequest: updateFileData } = useRequest({
      context,
      request: (params) => {
        const path_doc = `/personal_doc/${basketFiles.value.fileName}`
        return store.dispatch('taskModule/updateFileData', {
          data: {
            personal_id: props.personalId,
            doc_id: props.document.doc_id,
            path_doc,
          },
        })
      },
    })
    const switchType = (key) => {
      let result = ''
      switch (key) {
        case 'pasp_data_vid':
          result = 'date'
          break
        case 'pasp_ser':
          result = 'string'
          break
        case 'pasp_num':
          result = 'string'
          break
        case 'pasp_kod_podr':
          result = 'string'
          break
        case 'pasp_kem':
          result = 'string'
          break
        case 'snils':
          result = 'string'
          break
        case 'invoice':
          result = 'string'
          break
        case 'priority':
          result = 'checkbox'
          break
        case 'bank_id':
          result = 'select'
          break
        case 'comment':
          result = 'string'
          break
        case 'registration_address':
          result = 'string'
          break
        case 'patent_ser':
          result = 'string'
          break
        case 'patent_num':
          result = 'string'
          break
        case 'patent_prof':
          result = 'string'
          break
        case 'pasp_address_reg':
          result = 'string'
          break
        case 'med_book_date':
          result = 'date'
          break
        case 'view_home_ser':
          result = 'string'
          break
        case 'view_home_num':
          result = 'string'
          break
        case 'migr_card_ser':
          result = 'string'
          break
        case 'migr_card_num':
          result = 'string'
          break
        case 'migr_card_data_in':
          result = 'date'
          break
        case 'migr_card_data_out':
          result = 'date'
          break
        case 'registration_date_c_docs_in':
          result = 'date'
          break
        case 'registration_date_do_docs_in':
          result = 'date'
          break
        case 'check_patent_date_pay':
          result = 'date'
          break
        case 'check_patent_date_pay_now':
          result = 'date'
          break
        case 'med_view_docs_in':
          result = 'date'
          break
        default:
          result = 'string'
      }
      return result
    }
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
          result = 'К/П'
          break
        case 'pasp_kem':
          result = 'Кем выдан'
          break
        case 'snils':
          result = 'Номер'
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
          result = 'Адрес регистрации'
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
        case 'migr_card_ser':
          result = 'Серия'
          break
        case 'migr_card_num':
          result = 'Номер'
          break
        case 'migr_card_data_in':
          result = 'Дата въезда'
          break
        case 'migr_card_data_out':
          result = 'Дата выезда'
          break
        case 'registration_date_c_docs_in':
          result = 'C'
          break
        case 'registration_date_do_docs_in':
          result = 'По'
          break
        case 'check_patent_date_pay':
          result = 'Дата оплаты'
          break
        case 'check_patent_date_pay_now':
          result = 'Дата оплаты'
          break
        case 'med_view_docs_in':
          result = 'Период'
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
    let addFiles = async (e) => {
      file.value = e[0]
      fileExt = file.value.type.split('/')[1]
      fileName = `personal_doc_` + Date.now() + '.' + fileExt
      form_data = new FormData()
      form_data.append('file', e[0])

      basketFiles.value = {
        fileExt,
        fileName,
        form_data,
        file,
      }
      if (pathDock.value.length) {
        await delInfoAFile(props.document.id)
      }
      await loadImage(basketFiles.value)
      await updateFileData()
      const path_doc = `/personal_doc/${basketFiles.value.fileName}`
      pathDock.value = [path_doc]
      props.document.path_doc = path_doc

      toPreview()
    }
    onMounted(async () => {
      // if (props.document.path_doc) {
      //   isEdit.value = false
      // }
      if (props.document.path_doc) {
        pathDock.value = [props.document.path_doc]
      }
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
      switchType,
      context,
      // documentData,
    }
  },
}
