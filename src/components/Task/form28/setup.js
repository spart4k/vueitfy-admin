import { defineComponent } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const Form28 = defineComponent({
  name: 'Form28',
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
      },
    }
    const directionToMagnit = props.data.entity.direction_id === 5
    const pathAct = props.data.data.shop_request_magnit.path_act
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

    const { makeRequest: getPaymentId } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/getPaymentId', props.data.entity.id)
      },
    })

    const { makeRequest: changeStatustask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            process_id: props.data.task.process_id,
            task_id: props.data.task.id,
            parent_action: props.data.task.id,
            payment_id: props.data.entity.id,
            manager_id: JSON.parse(props.data.task.dop_data).manager_id,
            everyday: props.data.entity.vid_vedomost_id === 1 ? 1 : 0,
          },
        })
      },
    })

    const confirm = async () => {
      console.log(getPaymentId)
      // const data = await getPaymentId() TODO: Доделать, когда запрос поправят
      if ((() => true)()) {
        // TODO: Сюда закинуть data из строки выше
        const { success } = await changeStatustask()
        success && ctx.emit('closePopup')
      }
    }

    return {
      infoObj,
      confirm,
      directionToMagnit,
      entity: props.data.entity,
      pathAct,
    }
  },
})
export default Form28
