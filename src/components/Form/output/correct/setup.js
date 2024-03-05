import { onMounted, reactive, ref } from 'vue'
import Row from './row/index.vue'
import useRequest from '@/compositions/useRequest'
import { useRouter, useRoute } from 'vue-router/composables'
import { stringAction } from '@/utils/actions'
import store from '@/store'

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
    const context = {
      root: {
        store,
        router,
        ctx,
        route,
      },
    }
    const addGroup = async () => {
      services.value.services.push({
        service_id: null,
        qty: 0,
        price: 0,
        sum: 0,
      })
      console.log(services.services)
    }
    const removeLast = () => {
      services.value.services.pop()
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
    const { makeRequest, loading } = useRequest({
      context,
      request: () => store.dispatch('payments/getOutput', +route.params.id),
    })
    const initData = () => {}
    const removeService = (serviceKey) => {
      console.log('remove')
      services.value.services.splice(serviceKey, 1)
    }
    const save = () => {
      console.log(save)
    }
    onMounted(async () => {
      services.value = await makeRequest()
      // addGroup()
    })
    return {
      services,
      addGroup,
      actions,
      save,
      removeLast,
      removeService,
      servicesRow,
    }
  },
}
