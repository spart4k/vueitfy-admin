import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import store from '@/store'
import useRequest from '@/compositions/useRequest'

const Form21 = defineComponent({
  name: 'Form21',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const context = {
      root: {
        store,
      },
    }
    const isBtnDisabled = ref(true)
    const isKeyConfrmed = ref(null)
    const { formData: keyForm, formErrors: keyFormErrors } = useForm({
      fields: {
        key: {
          default: props.data.entity.user_key,
        },
        name: {
          default: props.data.entity.fio,
        },
        trainee: {
          default: false,
        },
        comment: {
          validations: { required },
          default: '',
        },
      },
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          data: {
            status: isKeyConfrmed.value ? 2 : 6,
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

    const { makeRequest: addKeyToPersonal } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/addKeyToPersonal', {
          data: {
            id: props.data.entity.id,
            personal_id: props.data.entity.personal_id,
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
            unfinished: 0,
          },
        })
      },
    })

    const completeTask = async () => {
      await setUserKey()
      await addKeyToPersonal()
      await changeStatusTask()
    }

    const confirmKey = () => {
      isKeyConfrmed.value = true
      isBtnDisabled.value = false
    }
    const rejectKey = () => {
      isKeyConfrmed.value = false
      isBtnDisabled.value = false
    }

    return {
      keyForm,
      isBtnDisabled,
      isKeyConfrmed,
      confirmKey,
      rejectKey,
      keyFormErrors,
      completeTask,
    }
  },
})
export default Form21
