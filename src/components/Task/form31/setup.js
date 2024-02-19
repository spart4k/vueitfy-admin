import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const Form31 = defineComponent({
  name: 'Form31',
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

    const isWorking = ref(null)
    const obj = ref()

    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
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
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
    }

    return {
      textInfo,
      confirm,
      isWorking,
      obj,
      // directionToMagnit,
      entity: props.data.entity,
      // pathAct,
    }
  },
})
export default Form31
