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

const form16 = defineComponent({
  name: 'Form16',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup({ data }, ctx) {
    // TODO: Моковые данные
    const purpose = ref({
      id: 23424,
      date: '02.06.2023',
      person: 'Погосян Артур Самсонович',
      position: 'Комплектовщик',
      object: 'РЦ Южный Урал',
    })

    const sendTaskFinish = () => {
      // Завершение
    }

    return {
      purpose,
      sendTaskFinish,
    }
  },
})

export default form16
