import { defineComponent, ref } from 'vue'
import DocFormWithConfirm from '@/components/Task/el/DocFormWithConfirm/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'

const FifthPopupView = defineComponent({
  name: 'FifthPopupView',
  components: {
    DocFormWithConfirm,
    FormComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const finalData = ref({})
    const isFormValid = ref(false)
    console.log(props.data)
    const changeDocs = (data) => {
      finalData.value = data
      isFormValid.value =
        data.confirmed.length + data.rejected.length ===
        props.data.data.docs_id.length
    }

    const sendData = () => {
      console.log(finalData.value)
    }

    return {
      docsData: props.data.data.personal_doc_data,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      changeDocs,
      sendData,
      isFormValid,
      finalData,
    }
  },
})
export default FifthPopupView
