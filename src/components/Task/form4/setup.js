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

  setup({ data }, ctx) {
    const context = {
      root: {
        store,
        ctx,
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
        store.dispatch('taskModule/updateFileDataNew', {
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
          data: {
            doc_id: 10,
            personal_id: data.entity.id,
            path_doc: `/personal_doc/${fileName}`,
          },
        }),
    })
    const { makeRequest: doneTask } = useRequest({
      context,
      request: () =>
        store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            process_id: data.task.process_id,
            task_id: data.task.id,
            personal_id: data.entity.id,
            parent_action: data.task.id,
          },
        }),
    })
    let sendData = () => {
      doneTask()
      pushSomeShit()
      makeRequest()

      let fixData = updateFileData()
      const { makeRequest: startTask } = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/startProcess', {
            // status: 6,
            // data: {
            // personal_id: <?php echo $entity['id']; ?>,
            // docs_id: {"10": data.result},
            // parent_action: <?php echo $task['id']; ?>,
            // type_parent_action: 2,

            parent_process: data.task.process_id,
            process_id: data.task.process_id,
            account_id: data.task.to_account_id,
            task_id: data.task.id,
            docs_id: [{ 10: fixData.result }],
            personal_id: data.entity.id,
            parent_action: data.task.id,
            type_parent_action: 2,
            // },
          }),
      })
      startTask()
      ctx.emit('closePopup')
    }

    // let widthTrasfer = ref('')
    // widthTrasfer.value = JSON.parse(data.task.dop_data).transfer
    return {
      sendData,
      options,
      selectName,
      isShowBtn,
      addFiles,
      ticket: data.ticket,
      widthTrasfer: JSON.parse(data.task.dop_data).transfer,
    }
  },
})
export default Form4
