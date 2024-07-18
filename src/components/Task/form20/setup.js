import { defineComponent, ref } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import moment from 'moment/moment'
import PersTitle from '@/components/Task/el/PersTitle/index.vue'
import { stringField, checkboxField } from '@/utils/fields.js'

const Form20 = defineComponent({
  name: 'Form20',
  components: {
    FormError,
    FormComment,
    PersTitle,
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
    const dataRojd = moment(personal.data_rojd, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
    const name = personal.name
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
        value: props.data.entity.fio ? props.data.entity.fio : '',
        bootstrapClass: [''],
        validations: { required },
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
        value: props.data.entity.user_key ? props.data.entity.user_key : '',
        bootstrapClass: [''],
        validations: { required },
      }),
      checkboxField({
        label: 'Стажерская',
        name: 'is_stager',
        value: props.data.entity.is_stager
          ? props.data.entity.is_stager
          : false,
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
      }),
    ])
    const {
      formData,
      validate: keyFormValidate,
      formErrors: keyFormErrors,
      vForm,
    } = useForm({
      form: {
        fields: fields.value,
      },
      context,
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        const dataRequest = {
          process_id: props.data.task.process_id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          user_key: props.data.entity.id,
          photo_path: dopData.photo_path ?? '',
          obd_id: props.data.entity.id,
        }
        if (dopData.comment) {
          dataRequest.okk_id = props.data.task.from_account_id
        }
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: dataRequest,
        })
      },
    })

    const { makeRequest: setUserKey } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setUserKey', {
          data: {
            id: props.data.entity.id,
            ...formData,
            is_stager: formData.is_stager ? 1 : 0,
          },
        })
      },
    })

    const completeTask = async () => {
      await setUserKey()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
    }

    return {
      formData,
      keyFormErrors,
      keyFormValidate,
      completeTask,
      dopData,
      personal,
      dataRojd,
      name,
      vForm,
    }
  },
})
export default Form20
