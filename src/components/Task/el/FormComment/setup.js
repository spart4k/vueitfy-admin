import { defineComponent, watch, ref } from 'vue'

const formComment = defineComponent({
  name: 'FormComment',
  props: {
    value: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = ref(props.value)
    watch(
      () => proxyValue.value,
      (newVal) => emit('input', newVal)
    )
    return {
      proxyValue,
    }
  },
})
export default formComment
