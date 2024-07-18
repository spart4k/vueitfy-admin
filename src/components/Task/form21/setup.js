import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import { useRouter, useRoute } from 'vue-router/composables'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import moment from 'moment'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'
import { stringField, checkboxField } from '@/utils/fields.js'

const Form21 = defineComponent({
  name: 'Form21',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    PersTitle,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const isBtnDisabled = ref(true)
    const isKeyConfrmed = ref(null)
    const formComment = ref('')
    const formCommentError = ref('')
    const personal = props.data.data.personal
    const dataRojd = moment(personal.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const name = personal.name
    const dopData = JSON.parse(props.data.task.dop_data)
    const fields = ref([
      stringField({
        label: 'Фио',
        name: 'fio',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        value: props.data.entity.fio,
        bootstrapClass: [''],
        validations: { required },
        readonly: true,
      }),
      stringField({
        label: 'Ключ',
        name: 'user_key',
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 3,
        },
        value: props.data.entity.user_key,
        bootstrapClass: [''],
        validations: { required },
        readonly: true,
      }),
      checkboxField({
        label: 'Стажерская',
        name: 'is_stager',
        value: props.data.entity.is_stager,
        placeholder: '',
        class: [''],
        position: {
          cols: 12,
          sm: 12,
        },
        disabled: true,
        isShow: {
          value: true,
        },
        bootstrapClass: [''],
        readonly: true,
      }),
    ])
    const { formData, formErrors: keyFormErrors } = useForm({
      form: {
        fields: fields.value,
      },
      context,
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: isKeyConfrmed.value ? 2 : 6,
          data: {
            process_id: props.data.task.process_id,
            task_id: props.data.task.id,
            parent_action: props.data.task.id,
            user_key: props.data.entity.id,
            photo_path: JSON.parse(props.data.task.dop_data).photo_path,
            obd_id: props.data.entity.id,
            comment: formComment.value,
            okk_id: props.data.task.from_account_id,
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
      if (!formComment.value && !isKeyConfrmed.value) {
        formCommentError.value = 'Заполните комментарий'
        return false
      }
      if (isKeyConfrmed.value) {
        await setUserKey()
        // await addKeyToPersonal()
      }
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
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
      formData,
      isBtnDisabled,
      isKeyConfrmed,
      confirmKey,
      rejectKey,
      keyFormErrors,
      completeTask,
      formComment,
      formCommentError,
      dataRojd,
      name,
      dopData,
    }
  },
})
export default Form21
