import { defineComponent, onMounted, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import moment from 'moment'

import Popup from '@/components/Popup/index.vue'
import paymentConfigOrig from '@/pages/payment/index'
import useView from '@/compositions/useView.js'
import _ from 'lodash'

const Form28 = defineComponent({
  name: 'Form28',
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

    const directionToMagnit = props.data.entity.object_type === 2
    const pathAct = props.data.data.shop_request_magnit.path_act
    const comment = JSON.parse(
      props.data.task.dop_data.replace(/[\u0000-\u0019]+/g, '')
    ).comment
    const valid_lu = JSON.parse(
      props.data.task.dop_data.replace(/[\u0000-\u0019]+/g, '')
    ).valid_lu
    const loading = ref(false)
    const confirm = ref(false)
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

    const { makeRequest: changeStatusConfirm } = useRequest({
      context,
      request: (cup) => {
        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: {
            process_id: props.data.task.process_id,
            task_id: props.data.task.id,
            parent_action: props.data.task.id,
            payment_id: props.data.entity.id,
            manager_id: props.data.task.to_account_id,
            account_id: cup ? props.data.data.cup_id : undefined,
            everyday: cup
              ? undefined
              : props.data.entity.vid_vedomost_id === 1
              ? 1
              : 0,
            cup: cup ? 1 : 0,
          },
        })
      },
    })

    const { makeRequest: confirmPayment } = useRequest({
      context,
      request: (data) => {
        return store.dispatch('form/putForm', data)
      },
    })

    const endTask = async () => {
      const data = {
        url: `update/payment/${props.data.entity.id}`,
        body: {
          data: {
            status_id: 1,
            from_task_accept: true,
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
      } else if (code === 3) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Начисление уже оплачено',
          timeout: 1000,
        })
      } else if (code === 4) {
        store.commit('notifies/showMessage', {
          color: 'error',
          content: 'Недостаточно данных',
          timeout: 1000,
        })
      } else if (code === 1) {
        endTaskConfirm()
      }
    }

    const endTaskConfirm = async (cup) => {
      if (cup && props.data.data.cup_id === 0) {
        store.commit('notifies/showMessage', {
          color: 'warning',
          content: 'попробуйте позже',
          timeout: 1000,
        })
        return
      }
      confirm.value = false
      loading.value = true
      const { success } = await changeStatusConfirm(cup)
      loading.value = false
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

    return {
      infoObj,
      directionToMagnit,
      pathAct,
      convertDate,
      endTask,
      endTaskConfirm,
      confirm,
      loading,
      comment,
      valid_lu,

      config,
      openPayment,
      popupForm,
      closePopupForm,
    }
  },
})
export default Form28
