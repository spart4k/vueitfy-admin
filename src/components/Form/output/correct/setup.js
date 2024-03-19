import { onMounted, computed, ref } from 'vue'
import Row from './row/index.vue'
import useRequest from '@/compositions/useRequest'
import { useRouter, useRoute } from 'vue-router/composables'
import { stringAction } from '@/utils/actions'
import store from '@/store'

import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'form-output-correct',
  components: {
    Row,
  },
  props: {
    formDataParent: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const { emit } = ctx
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const addGroup = async () => {
      services.value.service.push({
        id: uuidv4(),
        service_id: null,
        qty: 0,
        price: 0,
        sum: 0,
      })
      console.log(services.service)
    }
    const removeLast = () => {
      services.value.service.pop()
    }
    const servicesRow = ref([])
    const services = ref({})
    // const { pay }
    const actions = ref([
      stringAction({
        text: 'Сохранить',
        type: 'submit',
        module: 'form/create',
        url: 'create/service_price',
        name: 'createForm',
        action: 'createForm',
      }),
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        module: '',
        name: 'saveForm',
        nextForm: true,
        color: 'transparent',
        action: 'turnOff',
        skipValidation: true,
      }),
    ])
    const payment_id = +route.params.id
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('payments/getOutput', payment_id),
    })
    const { makeRequest: updateServices } = useRequest({
      context,
      request: (body) => store.dispatch('payments/updateOutput', body),
    })
    const initData = () => {}
    const removeService = (serviceKey) => {
      console.log('remove')
      services.value.service.splice(serviceKey, 1)
    }
    const save = async () => {
      const validate = servicesRow.value.forEach((el) => el.validate(true))
      if (canSend.value) {
        console.log('send')
        const servicesFormated = servicesRow.value.map((el) => {
          const { price, qty, service_id, sum } = el.formData
          return { price, qty: +qty, service_id, sum }
        })
        const body = {
          data: {
            payment_id,
            services: {
              ...services.value,
              service: servicesFormated,
            },
          },
        }

        console.log(body)
        loading.value = true
        const result = await updateServices(body)
        const { success } = result
        if (success) {
          store.commit('notifies/showMessage', {
            color: 'success',
            content: 'Сумма успешна изменена',
            timeout: 1000,
          })
          emit('closePopup')
          emit('refreshData')
        } else {
          store.commit('notifies/showMessage', {
            color: 'error',
            content: 'Не удалость изменить сумму',
            timeout: 1000,
          })
          // emit('closePopup')
        }
        loading.value = false
      }
      console.log(validate)
    }
    const closePopup = () => {
      emit('closePopup')
    }
    const canRemoved = computed(() => services.value?.service?.length > 1)
    const canSend = computed(() => {
      servicesRow?.value?.forEach(
        (el) => el.validate(true) && !el.errorSerivce.length
      )
      return servicesRow?.value?.every(
        (el) => el.validate(true) && !el.errorSerivce.length
      )
    })
    onMounted(async () => {
      loading.value = true
      const data = await makeRequest()
      console.log(data)
      loading.value = false
      data.service.forEach((el) => {
        el.id = uuidv4()
      })
      services.value = data
      // addGroup()
    })
    return {
      services,
      addGroup,
      actions,
      loading,
      save,
      removeLast,
      removeService,
      servicesRow,
      closePopup,
      canRemoved,
      canSend,
    }
  },
}
