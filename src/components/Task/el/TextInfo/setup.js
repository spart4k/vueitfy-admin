import { defineComponent } from 'vue'

const textInfo = defineComponent({
  name: 'TextInfo',
  props: {
    infoObj: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    return {
      data: props.infoObj,
    }
  },
})
export default textInfo
