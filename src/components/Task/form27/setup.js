import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import useRequest from '@/compositions/useRequest'
import useForm from '@/compositions/useForm'
import { requiredIf } from '@/utils/validation'

const Form27 = defineComponent({
  name: 'Form27',
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
  setup(props, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const directionToMagnit = props.data.entity.direction_id === 5
    const pathAct = props.data.data.shop_request_magnit.path_act
    const isFormConfirmed = ref(null)
    const commentErr = ref('')
    const infoObj = {
      creator: {
        key: 'Создатель',
        value: props.data.entity.account_name,
      },
      ved_type: {
        key: 'Вид ведомости',
        value: props.data.entity.vid_vedomost_name,
      },
      employee: {
        key: 'Сотрудник',
        value: props.data.entity.personal_name,
      },
      object: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
      position: {
        key: 'Должность',
        value: props.data.entity.doljnost_name,
      },
      hour: {
        key: 'Часы',
        value: props.data.entity.hour,
      },
      sum: {
        key: 'Сумма',
        value: props.data.entity.total,
      },
      tarif: {
        key: 'Тариф на должность',
        value: props.data.entity.object_price_price,
      },
      details: {
        key: 'Реквизиты',
        value:
          props.data.entity.bank_id !== 11
            ? `${props.data.entity.bank_name} ${
                props.data.entity.fio
              }...${props.data.entity.invoice.split('').splice(-4).join('')}`
            : 'Наличные',
      },
      meals: {
        key: 'Питание',
        value: props.data.entity.sum_nutrition,
      },
    }

    const dataForConfirm = {
      process_id: props.data.task.process_id,
      task_id: props.data.task.id,
      parent_action: props.data.task.id,
      payment_id: props.data.entity.id,
      manager_id: JSON.parse(props.data.task.dop_data).manager_id,
    }

    const { formData } = useForm({
      fields: {
        comment: {
          validations: { requiredIf: requiredIf(!isFormConfirmed.value) },
        },
      },
      context,
    })

    const { makeRequest: changeStatusConfirm } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: dataForConfirm,
        })
      },
    })

    const { makeRequest: setPaymentData } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setDataPayment', {
          data: {
            id: props.data.entity.id,
            status_id: isFormConfirmed.value ? 2 : 3,
            status_account_id: 25, // TODO: Поменять, когда появится авторизация
          },
        })
      },
    })

    const { makeRequest: changeStatusReject } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: 6,
          data: {
            ...dataForConfirm,
            account_id: JSON.parse(props.data.task.dop_data).manager_id,
            comment: 'commentariy)',
          },
        })
      },
    })

    const confirm = async () => {
      isFormConfirmed.value = true
      const statusId = props.data.entity.status_id
      if (statusId === 4 || statusId === 5) {
        await changeStatusConfirm()
      } else {
        await setPaymentData()
        const { success } = await changeStatusConfirm()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
    }
    const reject = async () => {
      console.log('reject')
      isFormConfirmed.value = false
      if (!formData.comment) {
        commentErr.value = 'Обязательное поле'
        return
      }
      if (window.confirm('Начисление будет не согласовано, подтвердите!')) {
        const statusId = props.data.entity.status_id
        if (statusId === 4 || statusId === 5) {
          const { success } = await changeStatusReject()
          if (success) {
            ctx.emit('closePopup')
            ctx.emit('getItems')
          }
        } else {
          await setPaymentData()
          const { success } = await changeStatusReject()
          if (success) {
            ctx.emit('closePopup')
            ctx.emit('getItems')
          }
        }
      }
    }
    return {
      infoObj,
      confirm,
      reject,
      formData,
      directionToMagnit,
      entity: props.data.entity,
      pathAct,
      commentErr,
    }
  },
})
export default Form27
