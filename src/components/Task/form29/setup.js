import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUpdated,
  reactive,
} from 'vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import useRequest from '@/compositions/useRequest'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router/composables'

const form29 = defineComponent({
  name: 'Form29',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    // TODO: Моковые данные
    const mockUser = ref({
      name: 'Шерзоди Умрибой',
      birthday: '15.03.1993',
      manager: 'Насыров Авазбек',
      object: `РЦ Толмачево | Новосибирская обл, Толмачевский с/с, Новосибирский р-н, 3307 км платформа 25`,
    })

    // TODO: Методы

    return {
      mockUser,
    }
  },
})

export default form29
