import { defineComponent } from 'vue'
import { toRefs } from '@vue/composition-api'

const formComment = defineComponent({
  name: 'FormComment',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    console.log(toRefs(props))
    const { value } = toRefs(props)
    const text = value.value
    return {
      text,
    }
  },
})
export default formComment
