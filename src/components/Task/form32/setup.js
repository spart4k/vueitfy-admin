import { computed, defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'
import useRequest from '@/compositions/useRequest'
import useForm from '@/compositions/useForm'
import { requiredIf } from '@/utils/validation'
import Dropzone from '@/components/Dropzone/default'
import moment from 'moment'

import Popup from '@/components/Popup/index.vue'
import paymentConfigOrig from '@/pages/payment/index'
import useView from '@/compositions/useView.js'
import _ from 'lodash'

const Form32 = defineComponent({
  name: 'Form32',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
    Dropzone,
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
    const isLoadedImage = ref(false)
    const dropzone = ref([])
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

    const { makeRequest: changeStatusConfirm } = useRequest({
      context,
      request: (path) => {
        const dataForConfirm = {
          process_id: props.data.task.process_id,
          task_id: props.data.task.id,
          parent_action: props.data.task.id,
          payment_id: props.data.entity.id,
          file: path,
        }

        return store.dispatch('taskModule/setPartTask', {
          status: 2,
          data: dataForConfirm,
        })
      },
    })

    const endTask = async () => {
      loading.value = true
      const file = dropzone.value[0]
      const name =
        'confirmation' +
        '_' +
        store?.state?.user.id +
        '_' +
        new Date().getTime()
      const ext = file.name.split('.').pop()
      const storeForm = new FormData()
      storeForm.append('name', name + '.' + ext)
      storeForm.append('file', file)
      const params = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const fullPath = `magnit_act_path/${name}.${ext}`
      await store.dispatch('file/create', {
        data: storeForm,
        folder: fullPath,
        params,
      })
      const { success } = await changeStatusConfirm(fullPath)
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
      convertDate,
      infoObj,
      endTask,
      directionToMagnit,
      pathAct,
      loading,
      isLoadedImage,
      dropzone,

      config,
      openPayment,
      popupForm,
      closePopupForm,
    }
  },
})
export default Form32
