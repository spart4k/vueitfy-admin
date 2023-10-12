import { defineComponent, ref } from 'vue'
import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'

const SixthPopupView = defineComponent({
  name: 'SixthPopupView',
  components: {
    FormComment,
    DocFormCorrect,
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
        props.data.data.docs_id.length === Object.values(data).length
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
export default SixthPopupView
