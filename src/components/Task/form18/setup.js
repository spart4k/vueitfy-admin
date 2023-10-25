import { defineComponent, onMounted, ref } from 'vue'
import FormError from '@/components/Task/el/FormError/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import store from '@/store'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import useForm from '@/compositions/useForm'

const Form18 = defineComponent({
  name: 'Form18',
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
    const context = {
      root: {
        store,
        ctx,
      },
    }
    const textInfo = {
      obj: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
      employee: {
        key: 'Сотрудник',
        value: props.data.entity.personal_name,
      },
      position: {
        key: 'Должность',
        value: props.data.entity.doljnost_name,
      },
    }
    const formGroup = ref([])
    const addGroup = () => {
      formGroup.value = [
        ...formGroup.value,
        useForm({
          fields: {
            name: {},
            qty: 0,
            tarif: 0,
            sum: 0,
          },
          context,
        }),
      ]
    }
    const removeGroup = () => {
      if (formGroup.value.length > 1) {
        formGroup.value = formGroup.value.splice(-1)
      }
    }

    onMounted(() => {
      addGroup()
    })

    return { textInfo, addGroup, removeGroup, formGroup }
  },
})
export default Form18
