import { defineComponent, ref } from 'vue'
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
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }

    const dopData = JSON.stringify(props.data.task.dop_data)

    const {
      formData: keyForm,
      validate: keyFormValidate,
      formErrors: keyFormErrors,
    } = useForm({
      fields: {
        key: {
          validations: { required },
          default: '',
        },
        name: {
          validations: { required },
          default: '',
        },
        trainee: {
          default: false,
        },
        comment: {
          validations: { required },
          default: '',
        },
      },
      context,
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          data: {
            status: 2,
            data: {
              process_id: props.data.entity.process_id,
              task_id: props.data.entity.id,
              parent_action: props.data.entity.id,
              user_key: props.data.entity.id,
              photo_path: dopData.photo_path ?? '',
              obd_id: props.data.entity.id,
              comment: keyForm.comment,
              okk_id: props.data.task.from_account_id,
            },
          },
        })
      },
    })

    const { makeRequest: setUserKey } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setUserKey', {
          data: {
            id: props.data.entity.id,
            user_key: keyForm.key,
            fio: keyForm.name,
          },
        })
      },
    })

    const completeTask = async () => {
      await setUserKey()
      const { success } = await changeStatusTask()
      success && ctx.emit('closePopup')
    }

    return {
      keyForm,
      keyFormErrors,
      keyFormValidate,
      completeTask,
      dopData,
      entity: props.data.entity,
    }
  },
})
export default Form17
