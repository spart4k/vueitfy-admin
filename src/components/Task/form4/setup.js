import { defineComponent, ref } from 'vue'
import Dropzone from '@/components/dropzone/default'
// import DocFormCorrect from '@/components/Task/el/DocFormCorrect/index.vue'
// import FormComment from '@/components/Task/el/FormComment/index.vue'
// import useForm from '@/compositions/useForm'
// import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
// import moment from 'moment'

const Form4 = defineComponent({
  name: 'Form4',
  components: {
    Dropzone,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  setup({ data }) {
    const context = {
      root: {
        store,
      },
    }
    let selectName = ref('')
    let options = {
      withoutSave: false,
      folder: 'tmp',
    }

    //   $('#habitation_id').on('change', function() {
    //     $.ajax('/common/save/personal', {
    //         method: "POST",
    //         data: {id: <?php echo $entity['id'] ?>, habitation_id: this.value},
    //         success: function() {
    //             checkValid();
    //         }
    //     })
    // })
    let isShowBtn = ref(false)
    let fileExt
    let fileName
    let form_data
    let file = ref('')
    let addFiles = (e) => {
      file.value = e[0]
      fileExt = file.value.type.split('/')[1]
      fileName = `personal_doc_` + Date.now() + '.' + fileExt
      form_data = new FormData()
      form_data.append('file', e[0])
      console.log(fileExt, fileName, form_data, e[0])
      isShowBtn.value = true
    }

    const { makeRequest: pushSomeShit } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setBid', {
          data: {
            id: data.entity.id,
            habitation_id: selectName.value,
          },
        }),
    })
    const { makeRequest } = useRequest({
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
    const { makeRequest: updateFileData } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/updateFileData', {
          id: 1,
          path_doc: `/personal_doc/${fileName}`,
        }),
    })
    let sendData = () => {
      pushSomeShit()
      makeRequest()
      updateFileData()
    }
    return {
      sendData,
      options,
      selectName,
      isShowBtn,
      addFiles,
    }
  },
})
export default Form4
