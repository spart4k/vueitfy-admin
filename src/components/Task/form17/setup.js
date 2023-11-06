import { defineComponent, ref, computed } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import Dropzone from '@/components/dropzone/default'

const Form17 = defineComponent({
  name: 'Form17',
  components: {
    FormError,
    FormComment,
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
    let qty = ref(10.5)
    // let sum = computed(() => Number(qty) / )
    let updateFileData
    let loadImage
    let changeStatusTask
    const dopData = JSON.stringify(data.task.dop_data)
    const addFiles = (e) => {
      let fileExt = e[0].type.split('/')[1]
      let fileName = `workout_25_` + Date.now() + '.' + fileExt
      let form_data = new FormData()
      form_data.append('file', e[0])
      updateFileData = useRequest({
        context,
        request: () =>
          store.dispatch('taskModule/updateFileData', {
            personal_id: data.entity.id,
            doc_id: e.item,
            path_doc: `/workout/${fileName}`,
            from_task: true,
          }),
      })

      loadImage = useRequest({
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

      changeStatusTask = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setPartTask', {
            data: {
              status: 2,
              data: {
                process_id: data.task.process_id,
                manager_id: data.task.from_account_id,
                task_id: data.task.id,
                parent_action: data.task.id,
                personal_target_id: data.entity.id,
                file_output: fileName,
                have_price: 1,
                object_id: data.entity.object_id,
                date_target: data.entity.date_target,
              },
            },
          })
        },
      })
    }
    // const {
    //   formData: keyForm,
    //   validate: keyFormValidate,
    //   formErrors: keyFormErrors,
    // } = useForm({
    //   fields: {
    //     key: {
    //       validations: { required },
    //       default: '',
    //     },
    //     name: {
    //       validations: { required },
    //       default: '',
    //     },
    //     trainee: {
    //       default: false,
    //     },
    //     comment: {
    //       validations: { required },
    //       default: '',
    //     },
    //   },
    //   context,
    // })

    // const { makeRequest: changeStatusTask } = useRequest({
    //   context,
    //   request: () => {
    //     return store.dispatch('taskModule/setPartTask', {
    //       data: {
    //         status: 2,
    //         data: {
    //           process_id: props.data.entity.process_id,
    //           task_id: props.data.entity.id,
    //           parent_action: props.data.entity.id,
    //           user_key: props.data.entity.id,
    //           photo_path: dopData.photo_path ?? '',
    //           obd_id: props.data.entity.id,
    //           comment: keyForm.comment,
    //           okk_id: props.data.task.from_account_id,
    //         },
    //       },
    //     })
    //   },
    // })

    // const { makeRequest: setUserKey } = useRequest({
    //   context,
    //   request: () => {
    //     return store.dispatch('taskModule/setUserKey', {
    //       data: {
    //         id: props.data.entity.id,
    //         user_key: keyForm.key,
    //         fio: keyForm.name,
    //       },
    //     })
    //   },
    // })

    const completeTask = async () => {
      // await setUserKey()
      // const { success } = await changeStatusTask()

      if (
        data.entity.doljnost_id == 5 ||
        data.entity.doljnost_id == 7 ||
        data.entity.doljnost_id == 32
      ) {
        updateFileData.makeRequest()
        loadImage.makeRequest()
        changeStatusTask.makeRequest()
      }
      ctx.emit('closePopup')
    }

    return {
      // keyForm,
      // keyFormErrors,
      // keyFormValidate,
      completeTask,
      dopData,
      entity: data.entity,
      addFiles,
      qty,
      // sum,
    }
  },
})
export default Form17
