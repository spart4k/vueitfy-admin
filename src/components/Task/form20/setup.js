import { defineComponent, ref } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import store from '@/store'
import useRequest from '@/compositions/useRequest'

const Form20 = defineComponent({
  name: 'Form20',
  components: {
    FormError,
    FormComment,
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

    const dopData = JSON.parse(props.data.task.dop_data)
    const personal = props.data.data.personal
    const dataRojd = personal.data_rojd
    const name = personal.name

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
      },
      context,
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            process_id: props.data.task.process_id,
            task_id: props.data.entity.id,
            parent_action: props.data.entity.id,
            user_key: props.data.entity.id,
            photo_path: dopData.photo_path ?? '',
            obd_id: props.data.entity.id,
            comment: keyForm.comment,
            okk_id: props.data.task.from_account_id,
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
      personal,
      dataRojd,
      name,
    }
  },
})
export default Form20
