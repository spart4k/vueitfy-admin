import { defineComponent } from 'vue'
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
              photo_path: JSON.parse(props.data.task.dop_data).photo_path,
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
      await changeStatusTask()
    }

    return { keyForm, keyFormErrors, keyFormValidate, completeTask }
  },
})
export default Form20
