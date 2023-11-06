import { defineComponent, onMounted, ref } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import form from '@/store/modules/form'

const Form18 = defineComponent({
  name: 'Form18',
  computed: {
    form() {
      return form
    },
  },
  components: {
    TextInfo,
    FormError,
    FormComment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const textInfo = {
      obj: {
        key: 'Объект',
        value: data.entity.object_name,
      },
      employee: {
        key: 'Сотрудник',
        value: data.entity.personal_name,
      },
      position: {
        key: 'Должность',
        value: data.entity.doljnost_name,
      },
    }
    const formGroup = ref([])
    const fileOutput =
      data.task.dop_data && JSON.parse(data.task.dop_data).file_output
    const idDirection = data.entity.direction_id
    const formCommentError = ref('')
    const formComment = ref('')
    const addGroup = () => {
      formGroup.value = [
        ...formGroup.value,
        useForm({
          fields: {
            name: {},
            qty: 0,
            price: 0,
            sum: 0,
          },
          context,
        }),
      ]
    }
    const removeGroup = () => {
      if (formGroup.value.length > 1) {
        formGroup.value = formGroup.value.slice(0, formGroup.value.length - 1)
      }
    }

    onMounted(() => {
      addGroup()
    })

    const confirmTask = async () => {
      let total = 0
      const services = formGroup.value.map((group, i) => {
        const formData = group.formData
        total += formData.sum ?? 0
        return {
          service_id: i,
          qty: formData.qty,
          price: formData.price,
          sum: formData.sum,
        }
      })

      const { makeRequest: setDataPayment } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setDataPayment', {
            data: {
              account_id: data.entity.manager,
              personal_bank_id: data.entity.personal_bank_id,
              status_id: 2,
              status_account_id: 25,
              personal_id: data.entity.personal_id,
              vid_vedomost_id: 1,
              direction_id: data.entity.direction_id,
              object_id: data.entity.object_id,
              bank_id: data.entity.bank_id,
              invoice: data.entity.invoice,
              total: total,
              fio: data.entity.fio,
              doljnost_id: data.entity.doljnost_id,
              date_target: data.entity.date_target,
              personal_target_id: data.entity.id,
            },
          })
        },
      })

      const paymentData = await setDataPayment()

      let targetServicesKey = null

      if (data.entity.direction_id === 1) {
        targetServicesKey =
          [6, 9, 10, 11, 20, 21, 22, 28].indexOf(
            Number(data.entity.doljnost_id)
          ) === -1
            ? 1
            : 2
      } else if (data.entity.direction_id === 6) {
        targetServicesKey = 3
      }

      const targetServices = {
        [targetServicesKey]: [
          {
            services: services,
            payment_id: paymentData.result,
            is_hold: false,
            is_pay: false,
            sum: total,
          },
        ],
      }

      const { makeRequest: setPersonalTarget } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setPersonalData', {
            data: {
              id: data.entity.id,
              services: targetServices,
              payment_id: paymentData.result,
            },
          })
        },
      })

      const { makeRequest: changeStatusTask } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setPartTask', {
            data: {
              status: 2,
              data: {
                process_id: data.task.process_id,
                manager_id: data.task.from_account_id,
                task_id: data.task.task_id,
                parent_action: data.task.task_id,
                personal_target_id: data.entity.id,
              },
            },
          })
        },
      })

      await setPersonalTarget()
      const { success } = await changeStatusTask()
      success && ctx.emit('closePopup')
    }
    const rejectTask = async () => {
      formCommentError.value = ''
      if (confirm('Вы подтверждаете отклонение выработки?')) {
        if (!formComment.value) {
          formCommentError.value = 'Обязательное поле'
          return false
        }

        const { makeRequest: changeStatusTask } = useRequest({
          context,
          request: () => {
            return store.dispatch('taskModule/setPartTask', {
              data: {
                status: 6,
                data: {
                  process_id: data.task.process_id,
                  manager_id: data.task.from_account_id,
                  task_id: data.task.id,
                  personal_target_id: data.entity.id,
                  parent_action: data.task.id,
                  comment: formComment,
                  error: 1,
                  need_input: 1,
                  need_parse: 0,
                },
              },
            })
          },
        })
        const { success } = await changeStatusTask()
        success && ctx.emit('closePopup')
      }
    }

    return {
      textInfo,
      addGroup,
      removeGroup,
      formGroup,
      entity: data.entity,
      fileOutput,
      idDirection,
      confirmTask,
      rejectTask,
      formComment,
      formCommentError,
    }
  },
})
export default Form18
