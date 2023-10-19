import { defineComponent } from 'vue'
import Dropzone from '@/components/dropzone/default'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
// import useForm from '@/compositions/useForm'
// import { required } from '@/utils/validation'
// import useRequest from '@/compositions/useRequest'
// import store from '@/store'
// import moment from 'moment'

const Form3 = defineComponent({
  name: 'Form3',
  components: {
    Dropzone,
  },
  setup() {
    let options = {
      withoutSave: true,
      folder: 'tmp',
    }
    return {
      options,
    }
  },
})
export default Form3
