import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'

const Form15 = defineComponent({
  name: 'Form15',
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
    const isFormConfirmed = ref(null)
    let confirmData = null
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
      avatar: {
        key: 'Аватар',
        value: props.data.entity.avatar_name,
      },
      position: {
        key: 'Должность',
        value: props.data.entity.doljnost_name,
      },
      personal_key: {
        key: 'Личный ключ',
        value: props.data.entity.print_key,
      },
      object: {
        key: 'Объект',
        value: props.data.entity.object_name,
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

    const { makeRequest: setPersonalTarget } = useRequest({
      context,
      request: () => {
        const data = props.data
        const finalData = {
          process_id: data.task.process_id,
          manager_id: data.entity.manager_id,
          task_id: data.task.id,
          parent_action: data.task.id,
          personal_target_id: data.entity.id,
          auto:
            data.entity.vid_vedomost_id === 3 ||
            data.entity.vid_vedomost_id === 5
              ? 1
              : 0,
          x5:
            data.entity.subtype_object === 9 && data.entity.direction_id === 1
              ? 0
              : 0,
          ozon: data.entity === 2 ? 1 : 0,
          need_input:
            data.entity.direction_id === 6 ||
            data.entity.doljnost_id === 5 ||
            data.entity.doljnost_id === 7 ||
            data.entity.doljnost_id === 32
              ? 1
              : 0,
          need_parse:
            data.entity.direction_id === 1 &&
            data.entity.doljnost_id !== 5 &&
            data.entity.doljnost_id !== 7 &&
            data.entity.doljnost_id !== 32
              ? 1
              : 0,
        }
        if (finalData.auto === 1 || finalData.ozon === 1) {
          finalData.need_input = 0
          finalData.need_parse = 0
        }
        confirmData = finalData
        return store.dispatch('taskModule/setPersonalTarget', {
          data: {
            id: data.entity.id,
            status: isFormConfirmed.value ? 3 : 2,
          },
        })
      },
    })

    const { makeRequest: changeStatusTask } = useRequest({
      context,
      request: () => {
        return store.dispatch('taskModule/setPartTask', {
          status: isFormConfirmed.value ? 2 : 6,
          data: isFormConfirmed.value
            ? confirmData
            : {
                process_id: props.data.task.process_id,
                manager_id: props.data.task.from_account_id,
                parent_action: props.data.task.id,
                task_id: props.data.task.id,
              },
        })
      },
    })

    const confirm = async () => {
      isFormConfirmed.value = true
      console.log('confirm')
      await setPersonalTarget()
      await changeStatusTask()
    }
    const reject = async () => {
      isFormConfirmed.value = false
      console.log('confirm')
      await setPersonalTarget()
      const { success } = await changeStatusTask()
      success && ctx.emit('closePopup')
    }
    return { infoObj, confirm, reject }
  },
})
export default Form15
