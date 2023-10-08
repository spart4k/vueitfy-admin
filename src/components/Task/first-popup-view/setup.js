import { defineComponent, ref } from 'vue'
import TextInfo from '@/components/Task/el/TextInfo/index.vue'
import DocScan from '@/components/Task/el/DocScan/index.vue'
import FormComment from '@/components/Task/el/FormComment/index.vue'
import FormTitle from '@/components/Task/el/FormTitle/index.vue'

const firstPopupView = defineComponent({
  name: 'FirstPopupView',
  components: {
    FormComment,
    TextInfo,
    DocScan,
    FormTitle,
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
      manager: props.data.entity.account_name,
      obj: props.data.entity.object_name,
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
    return {
      textInfo,
      docs: props.data.data.docs_id,
      listNames: props.data.data.docs_spr,
      clickCheckBtn,
      addConfirmed,
      addUnconfirmed,
    }
  },
})
export default firstPopupView
