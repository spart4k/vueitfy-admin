import { computed, defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import useForm from '@/compositions/useForm'
import { requiredIf } from '@/utils/validation'
import moment from 'moment'

import Popup from '@/components/Popup/index.vue'
import paymentConfigOrig from '@/pages/payment/index'
import useView from '@/compositions/useView.js'
import _ from 'lodash'

const Form31 = defineComponent({
  name: 'Form31',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    Popup,
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

    const { configRouteConvert } = useView({})
    const config = _.cloneDeep(paymentConfigOrig)
    configRouteConvert({
      config: config,
      route: 'form_id',
      newPath: 'zayavka-edit',
      settings: {
        oldPath: 'add-edit-logistic',
      },
    })
    const popupForm = ref({
      isShow: false,
    })
    const openPayment = (val) => {
      router.push({
        name: 'main/:id/:form_id',
        params: {
          form_id: val,
        },
      })
      popupForm.value.isShow = true
    }
    const closePopupForm = () => {
      router.back()
      popupForm.value.isShow = false
    }

    // const account_id = computed(() => store.state.user.account_id)
    const directionToMagnit = props.data.entity.object_type === 2
    const pathAct = props.data.data.shop_request_magnit.path_act
    const isFormConfirmed = ref(null)
    const commentErr = ref('')
    const loading = ref(false)
    const infoObj = {
      account_name: {
        key: 'Менеджер заявки',
        value: props.data.entity.account_name,
      },
      vid_vedomost_name: {
        key: 'Вид ведомости',
        value: props.data.entity.vid_vedomost_name,
      },
      personal_name: {
        key: 'Сотрудник',
        value: props.data.entity.personal_name,
      },
      object_name: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
      doljnost_name: {
        key: 'Должность',
        value: props.data.entity.doljnost_name,
      },
      hour: {
        key: 'Часы',
        value: props.data.entity.hour,
      },
      total: {
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
    }

    const convertDate = (val) => {
      return moment(val, 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    const { formData } = useForm({
      form: {
        fields: {
          comment: {
            validations: { requiredIf: requiredIf(!isFormConfirmed.value) },
          },
        },
      },
      context,
    })

    const { makeRequest: changeStatusConfirm } = useRequest({
      context,
      request: ({ type }) => {
        const dataForConfirm = {
          process_id: props.data.task.process_id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          payment_id: props.data.entity.id,
          manager_id: JSON.parse(
            props.data.task.dop_data.replace(/[\u0000-\u0019]+/g, '')
          ).manager_id,
          comment: formData.comment ?? '',
          account_id: props.data.task.to_account_id,
          valid_lu: 0,
        }

        return store.dispatch('taskModule/setPartTask', {
          status: type === 2 ? 6 : 2,
          data: dataForConfirm,
        })
      },
    })

    const { makeRequest: confirmPayment } = useRequest({
      context,
      request: (data) => {
        return store.dispatch('form/putForm', data)
      },
    })

    const endTask = async ({ type }) => {
      if (type === 2) {
        isFormConfirmed.value = false
        if (!formData.comment) {
          commentErr.value = 'Обязательное поле'
          return
        }
      } else {
        commentErr.value = ''
        isFormConfirmed.value = true
      }

      const data = {
        url: `update/payment/${props.data.entity.id}`,
        body: {
          data: {
            status_id: type === 2 ? 3 : 2,
            from_task_accept: true,
            comment_okk: formData.comment ?? '',
          },
        },
      }
      loading.value = true
      const { code } = await confirmPayment(data)
      if (code === 2) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Ошибка сервера',
          timeout: 1000,
        })
      } else if (code === 4) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Недостаточно данных',
          timeout: 1000,
        })
      } else if (code === 1 || code === 3) {
        let data
        if (type === 1) {
          data = await changeStatusConfirm({ type: 1 })
        } else if (type === 2) {
          if (code === 1) {
            data = await changeStatusConfirm({ type: 2 })
          } else if (code === 3) {
            data = await changeStatusConfirm({ type: 1 })
          }
        }
        loading.value = false
        const { success } = data
        if (success) {
          store.commit('notifies/showMessage', {
            color: 'success',
            content: 'Задача выполнена',
            timeout: 1000,
          })
          ctx.emit('closePopup')
          ctx.emit('getItems')
        }
      }
    }

    return {
      convertDate,
      infoObj,
      endTask,
      formData,
      directionToMagnit,
      pathAct,
      commentErr,
      loading,

      config,
      openPayment,
      popupForm,
      closePopupForm,
    }
  },
})
export default Form31
