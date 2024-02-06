import Vue, { ref, onMounted } from 'vue'
import useForm from '@/compositions/useForm.js'
import { useRouter, useRoute } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'

import store from '@/store'
import Autocomplete from '@/components/Autocomplete'
import Row from '../row/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'

export default {
  name: 'Form-Documents',
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
    DocForm,
  },
  setup(props, ctx) {
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
    const docsData = ref(null)
    // const loading = ref(false)
    const fields = () => {
      const fields = {}
      return fields
    }
    const personal_id = +route.params.id
    const canEdit = [4, 7, 8].includes(store.state.user.permission_id)
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('personal/getDocuments', personal_id),
    })
    const prevTab = ref({})
    const rows = ref([])
    //const params = props.tab.lists
    //const queryString = '?lists=' + [...params]
    //const { makeRequest: makeRequestList } = useRequest({
    //  context,
    //  request: () => store.dispatch('list/get', `get/lists${queryString}`),
    //})

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

    const { makeRequest: updateFields } = useRequest({
      context,
      request: (body) =>
        store.dispatch('personal/updateDocumentsFields', {
          url: personal_id,
          body,
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
        console.log(params, 'path_doc')
        return store.dispatch('taskModule/updateFileData', {
          data: {
            personal_id,
            doc_id: params.doc_id,
            path_doc: params.path_doc,
          },
        })
      },
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
      form: props.tab,
      fields: fields(),
      context,
      loading,
      //makeRequestList,
    })
    const sendDocuments = async () => {
      let stack = {}
      loading.value = true
      rows.value.forEach(async (row) => {
        console.log(row.formData)
        stack = { ...stack, ...row.formData }
        console.log(row, 'row')
        console.log(row.pathDock, 'pathDock')
        if (row.pathDock.length && row.basketFiles.hasOwnProperty('file')) {
          console.log('DEL')
          await delInfoAFile(row._props.document.id)
          const result = await loadImage(row.basketFiles)
          const path_doc = `/personal_doc/${row.basketFiles.fileName}`
          console.log('FOLDER')
          const resultLoadImage = await updateFileData({
            doc_id: row._props.document.doc_id,
            path_doc,
          })
          console.log(result, resultLoadImage, 'result file')
        } else if (!row.pathDock && row.basketFiles.hasOwnProperty('file')) {
          console.log('LOAD')
          const path_doc = `/personal_doc/${row.basketFiles.fileName}`
          const result = await loadImage(row.basketFiles)
          const resultLoadImage = await updateFileData({
            doc_id: row._props.document.doc_id,
            path_doc,
          })
        }
      })
      console.log(stack, 'stack')
      const data = {
        data: stack,
      }
      const resultField = await updateFields(data)
      docsData.value = await makeRequest()
      loading.value = false
      console.log(resultField)
    }
    onMounted(async () => {
      docsData.value = await makeRequest()
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
      docsData,
      rows,
      sendDocuments,
      canEdit,
    }
  },
}
