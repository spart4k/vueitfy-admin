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
  setup(props) {
    const context = {
      root: {
        store,
      },
    }
    const directionToMagnit = props.data.entity.direction_id === 5
    const infoObj = {
      creator: {
        key: 'Создатель',
        value: props.data.entity.account_name,
      },
      ved_type: {
        key: 'Вид ведомости',
        value: props.data.entity.vedomost_name,
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
            ? `${props.data.entity.bank_name} ${props.data.entity.fio}... ${props.data.entity.object_name} ${props.data.entity.invoice} `
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
          data: {
            status: 2,
            data: {
              process_id: props.data.task.process_id,
              task_id: props.data.task.id,
              parent_action: props.data.task.id,
              payment_id: props.data.entity.id,
              manager_id: JSON.parse(props.data.task.dop_data).manager_id,
              everyday: 1, //TODO: Вставить поле "vid_vedomost_id" из data
            },
          },
        })
      },
    })

    const confirm = async () => {
      console.log(getPaymentId)
      // const data = await getPaymentId() TODO: Доделать, когда запрос поправят
      if ((() => true)()) {
        // TODO: Сюда закинуть data из строки выше
        await changeStatustask()
      }
    }

    return { infoObj, confirm, directionToMagnit }
  },
})
export default Form28
