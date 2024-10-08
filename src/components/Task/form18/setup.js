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
import Popup from '@/components/Popup/index.vue'
import Service from '@/components/Task/el/Service/default/index.vue'
import _ from 'lodash'
import {
  dateField,
  stringField,
  selectField,
  autocompleteField,
  textareaField,
  datetimeField,
  dropZoneField,
  checkboxField,
  textBlock,
} from '@/utils/fields.js'

import config from '@/components/Task/form15/form.js'
import Autocomplete from '@/components/Autocomplete/default'

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
    Popup,
    Autocomplete,
    Service,
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
    const proxyConfig = ref(_.cloneDeep(config))
    const popupForm = ref({
      isShow: false,
    })
    const context = {
      root: {
        store,
        ctx,
        router,
      },
    }
    const dateTarget = moment(data.entity.date_target, 'YYYY-MM-DD').format(
      'DD.MM.YYYY'
    )
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
    const service = ref(null)
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
    const isFormValid = computed(() => {
      return service?.value?.serviceRows.every((el) => !el.vForm.$invalid)
    })
    const removeLast = () => {
      service?.value?.serviceRows.pop()
    }
    const autocompleteConfig = {
      label: 'Наименование',
      name: 'name',
      items: servicesDetail,
      solo: false,
      required: true,
      selectOption: {
        text: 'name',
        value: 'id',
      },
    }

    const loading = ref(false)
    const confirmTask = async () => {
      service.value.serviceRows.forEach((el) => {
        el.validate(true)
      })
      loading.value = true
      let total = 0
      const services = service?.value?.serviceRows.map((group, i) => {
        const formData = group.formData
        total += formData.sum ?? 0
        return {
          service_id: formData.name,
          qty: +formData.qty,
          price: formData.price,
          sum: formData.sum,
        }
      })

      const { makeRequest: setDataPayment } = useRequest({
        context,
        request: () => {
          let totalResult
          if (data.entity.direction_id === 6) {
            totalResult = total.toString().replaceAll(',', '.')
          } else {
            totalResult = total
          }
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
              total: +totalResult,
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
          [5, 7, 8, 23, 33].indexOf(Number(data.entity.doljnost_id)) === -1
            ? 2
            : 1
      } else if (data.entity.direction_id === 6) {
        targetServicesKey = 3
      } else if (data.entity.doljnost_id === 32) {
        targetServicesKey = 5
      }

      const targetServices = {
        [targetServicesKey]: [
          {
            service: services,
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
              services: JSON.stringify(targetServices),
              payment_id: paymentData.result,
            },
          })
        },
      })

      const { makeRequest: setDataServices } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setDataServices', {
            data: {
              services: services,
              type_id: targetServicesKey,
              target_id: data.entity.id,
              date_target: data.entity.date_target,
              personal_id: data.entity.personal_id,
              object_id: data.entity.object_id,
            },
          })
        },
      })

      const { makeRequest: changeStatusTask } = useRequest({
        context,
        request: () => {
          return store.dispatch('taskModule/setPartTask', {
            status: 2,
            data: {
              process_id: data.task.process_id,
              manager_id: data.task.from_account_id,
              task_id: data.task.id,
              parent_action: data.task.id,
              personal_target_id: data.entity.id,
            },
          })
        },
      })
      await setDataServices()
      await setPersonalTarget()
      const { success } = await changeStatusTask()
      if (success) {
        ctx.emit('closePopup')
        ctx.emit('getItems')
      }
      loading.value = false
    }
    const rejectTask = async () => {
      loading.value = true
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
      loading.value = false
    }

    const getServiceInfo = async (idService) => {
      const { makeRequest } = useRequest({
        context,
        request: () => {
          return store.dispatch(
            'taskModule/getServicePrice',
            `object_id=${data.entity.object_id}&service_id=${idService}&date_target=${data.entity.date_target}`
          )
        },
      })
      return await makeRequest()
    }
    // const isReject = ref(false)
    // const changeServiceDetail = async (i, idService) => {
    //   rejectedPrice.value = ''
    //   isReject.value = false

    //   const data = await getServiceInfo(idService)

    //   if (!data.length) {
    //     rejectedPrice.value = servicesDetail.find(
    //       (item) => item.id == idService
    //     ).name
    //     rejectedPrice.value ? (isReject.value = true) : (isReject.value = false)
    //     formGroup.value[i].formData.price = 0
    //     return false
    //   } else {
    //     formGroup.value[i].formData.price = data[0]?.price ?? ''
    //   }

    //   changeSum(i)
    // }

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

    const pushToForm = (val) => {
      router.push({
        name: 'main/:id/:form_id',
        params: {
          id: route.params.id,
          form_id: val,
        },
      })
      popupForm.value.isShow = true
    }

    const closePopupForm = (route) => {
      if (route) router.push({ name: route })
      else router.back()
      popupForm.value.isShow = false
    }

    onMounted(() => {
      if (
        proxyConfig.value.detail &&
        proxyConfig.value.detail.type === 'popup' &&
        route.meta?.mode?.length > 1
      ) {
        popupForm.value.isShow = true
      }
    })

    return {
      textInfo,
      // removeGroup,
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
      // changeServiceDetail,
      changeSum,
      rejectedPrice,
      isFormValid,
      dateTarget,
      // isReject,

      pushToForm,
      popupForm,
      proxyConfig,
      closePopupForm,
      Popup,
      autocompleteConfig,
      loading,
      service,
      removeLast,
    }
  },
})
export default Form18
