import { defineComponent, ref } from 'vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocScan from '@/components/Task/el/DocScan/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'
import useForm from '@/compositions/useForm'
import { required } from '@/utils/validation'
import FormError from '@/components/Task/el/FormError/setup'
import DateTimePicker from '@/components/datetimepicker/index.vue'
import DocForm from '@/components/Task/el/DocForm/index.vue'

const firstPopupView = defineComponent({
  name: 'FirstPopupView',
  components: {
    FormError,
    FormComment,
    TextInfo,
    DocScan,
    FormTitle,
    DateTimePicker,
    DocForm,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // addConfirmed(data) {
    //   this.confirmed.push(data)
    //   this.unConfirmed = this.unConfirmed.filter(
    //     (x) => x.docs_id !== data.docs_id
    //   )
    //   console.log(this.confirmed)
    // },
    // addUnconfirmed(data) {
    //   this.unConfirmed.push(data)
    //   this.confirmed = this.confirmed.filter((x) => x.docs_id !== data.docs_id)
    //   console.log(this.unConfirmed)
    // },
  },
  setup(props) {
    const textInfo = {
      manager: {
        key: 'Менеджер',
        value: props.data.entity.account_name,
      },
      obj: {
        key: 'Объект',
        value: props.data.entity.object_name,
      },
    }
    let confirmed = ref([])
    let unConfirmed = ref([])

    const addConfirmed = (data) => {
      confirmed.value.push(data)
      unConfirmed.value = unConfirmed.value.filter(
        (x) => x.docs_id !== data.docs_id
      )
      console.log(confirmed)
    }
    const addUnconfirmed = (data) => {
      unConfirmed.value.push(data)
      confirmed.value = confirmed.value.filter(
        (x) => x.docs_id !== data.docs_id
      )
      console.log(unConfirmed)
    }

    const clickCheckBtn = async () => {
      if (unConfirmed.value.length) {}
    }

    const formSubmit = (cb) => {
      if (cb) {
        cb()
      }
      console.log('submit')
    }

    const getDocName = (id) => {
      return props.data.data.docs_spr[id]
    }

    const { formData, validate } = useForm({
      fields: {
        input: { validations: { required } },
      },
    })

    const citizenItems = Object.values(props.data.data.grajdanstvo).map(
      (citizen) => {
        return {
          text: citizen.name,
          value: citizen.id,
          disabled: false,
          divider: true,
          header: citizen.name,
        }
      }
    )

    return {
      textInfo,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      clickCheckBtn,
      addConfirmed,
      addUnconfirmed,
      getDocName,
      formData,
      validate,
      citizenItems,
      formSubmit,
    }
  },
})
export default firstPopupView
