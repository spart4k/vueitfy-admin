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
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('personal/getDocuments', +route.params.id),
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
      request: () =>
        store.dispatch('taskModule/updateFileData', {
          id: data.data.migr_card.id,
          del: 1,
        }),
    })
    const { makeRequest: loadImage } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/loadImage', {
          id: 1,
          folder: 'personal_doc',
          fileName: fileName,
          file: form_data,
        }),
      successMessage: 'Файл успешно загружен',
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
    const sendDocuments = async () => {}
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
    }
  },
}
