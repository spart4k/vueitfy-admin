import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'
import useRequest from '@/compositions/useRequest'
import { useRoute } from 'vue-router/composables'
import { useRouter } from 'vue-router/composables'
import form from '@/store/modules/form'
import { required } from '@/utils/validation'
import moment from 'moment/moment'

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
  setup(props, ctx) {
    const { data } = props
    const route = useRoute()
    const router = useRouter()
    const context = {
      root: {
        store,
        ctx,
        router,
      },
    }
    const dateTarget = moment(data.entity.date_target).format('DD.MM.YYYY')
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
    const account_id = computed(() => store.state.user.id)
    const formGroup = ref([])
    const idDirection = data.entity.direction_id
    // const fileOutput =
    //   data.task.dop_data &&
    //   'personal_doc/' + JSON.parse(data.task.dop_data).file_output
    const fileOutput =
      JSON.parse(data.task.dop_data).file_output &&
      '/personal_doc/' + JSON.parse(data.task.dop_data).file_output
    const formCommentError = ref('')
    const formComment = ref('')
    const servicesDetail = data.data.services
    const rejectedPrice = ref('')
    const isFormValid = ref(false)
    const addGroup = async () => {
      console.log('addGroup')
      let qty
      let serviceId
      let dataForService
      if (data.entity.direction_id === 6) {
        const dolToService = {
          24: 61,
          25: 62,
          26: 63,
          27: 64,
          49: 70,
          55: 70,
          51: 78,
        }
        console.log('getService')
        qty = JSON.parse(data.entity.services)['3'][0].services[0].qty
        serviceId = dolToService[data.entity.doljnost_id]
        console.log(serviceId)
        dataForService = await getServiceInfo(serviceId)
      }
      console.log(qty, serviceId, dataForService)
      console.log(
        useForm({
          fields: {
            name: {
              validations: { required },
              default:
                dataForService && dataForService.length ? serviceId : undefined,
            },
            qty: {
              validations: { required },
              default:
                dataForService && dataForService.length ? qty : undefined,
            },
            price: {
              validations: { required },
              default:
                dataForService && dataForService.length
                  ? dataForService[0].price
                  : undefined,
            },
            sum: {
              validations: { required },
              default:
                dataForService && dataForService.length
                  ? qty * dataForService[0].price
                  : undefined,
            },
          },
          context,
        })
      )
      formGroup.value = [
        ...formGroup.value,
        useForm({
          fields: {
            name: {
              validations: { required },
              default:
                dataForService && dataForService.length ? serviceId : undefined,
            },
            qty: {
              validations: { required },
              default:
                dataForService && dataForService.length ? qty : undefined,
            },
            price: {
              validations: { required },
              default:
                dataForService && dataForService.length
                  ? dataForService[0].price
                  : undefined,
            },
            sum: {
              validations: { required },
              default:
                dataForService && dataForService.length
                  ? qty * dataForService[0].price
                  : undefined,
            },
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
          service_id: formData.name,
          qty: formData.qty,
          price: formData.price,
          sum: formData.sum,
        }
      })

      const { makeRequest: setDataPayment } = useRequest({
        context,
        request: () => {
          console.log('useRequest 144')
          return store.dispatch('taskModule/setDataPayment', {
            data: {
              account_id: data.entity.manager,
              personal_bank_id: data.data.rek.id,
              status_id: 2,
              status_account_id: account_id.value,
              personal_id: data.entity.personal_id,
              vid_vedomost_id: 1,
              direction_id: data.entity.direction_id,
              object_id: data.entity.object_id,
              bank_id: data.data.rek.bank_id,
              invoice: data.data.rek.invoice,
              total: total,
              fio: data.data.rek.fio,
              doljnost_id: data.entity.doljnost_id,
              date_target: data.entity.date_target,
              personal_target_id: data.entity.id,
              date_add: moment(
                new Date().toLocaleString('en-US', {
                  timeZone: 'Europe/Moscow',
                })
              ).format('YYYY-MM-DD'),
              date_status: moment(
                new Date().toLocaleString('en-US', {
                  timeZone: 'Europe/Moscow',
                })
              ).format('YYYY-MM-DD HH:mm:ss'),
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
          console.log('useRequest 197')
          return store.dispatch('taskModule/setPersonalData', {
            data: {
              id: data.entity.id,
              services: JSON.stringify(targetServices),
              payment_id: paymentData.result,
            },
          })
        },
      })

      const { makeRequest: changeStatusTask } = useRequest({
        context,
        request: () => {
          console.log('useRequest 211')
          return store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: data.task.from_account_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_target_id: data.task.entity.id,
            },
          })
        },
      })

      await setPersonalTarget()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
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
            console.log('useRequest 243')
            return store.dispatch('taskModule/setPartTask', {
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
            })
          },
        })
        const { success } = await changeStatusTask()
        if (success) {
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
    }

    const getServiceInfo = async (idService) => {
      const { makeRequest } = useRequest({
        context,
        request: () => {
          console.log('useRequest 272')
          return store.dispatch(
            'taskModule/getServicePrice',
            `object_id=${data.entity.object_id}&service_id=${idService}&date_target=${data.entity.date_target}`
          )
        },
      })
      return await makeRequest()
    }
    const isReject = ref(false)
    const changeServiceDetail = async (i, idService) => {
      rejectedPrice.value = ''
      isReject.value = false
      console.log(i, idService)
      const data = await getServiceInfo(idService)
      console.log(data)
      if (!data.length) {
        rejectedPrice.value = servicesDetail.find(
          (item) => item.id == idService
        ).name
        rejectedPrice.value ? (isReject.value = true) : (isReject.value = false)
        formGroup.value[i].formData.price = 0
        return false
      } else {
        formGroup.value[i].formData.price = data[0]?.price ?? ''
      }
      console.log(formGroup.value[i].formData.price, data[0].price)
      changeSum(i)
    }

    const changeSum = (i) => {
      if (
        formGroup.value[i].formData.price &&
        formGroup.value[i].formData.qty
      ) {
        const sum =
          formGroup.value[i].formData.price * formGroup.value[i].formData.qty
        formGroup.value[i].formData.sum = Math.round(sum * 100) / 100
      } else {
        formGroup.value[i].formData.sum = 0
      }
    }

    watch(
      formGroup,
      () => {
        if (formGroup) {
          isFormValid.value = formGroup.value.every((group) => group.validate())
          console.log(isFormValid, formGroup.value)
        }
      },
      { deep: true }
    )

    return {
      textInfo,
      addGroup,
      removeGroup,
      formGroup,
      entity: data.entity,
      typeShift: data.entity.type_shift,
      fileOutput,
      idDirection,
      confirmTask,
      rejectTask,
      formComment,
      formCommentError,
      servicesDetail,
      changeServiceDetail,
      changeSum,
      rejectedPrice,
      isFormValid,
      dateTarget,
      isReject,
    }
  },
})
export default Form18
