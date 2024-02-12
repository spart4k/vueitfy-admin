import { defineComponent } from 'vue'

const textInfo = defineComponent({
  name: 'TextInfo',
  props: {
    infoObj: {
      type: Object,
    },
  },
  setup(props) {
    return {
      formData: props.infoObj,
    }
  },
})
export default textInfo
