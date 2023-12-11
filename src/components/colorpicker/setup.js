import { ref, computed, watch, onMounted } from 'vue'

export default {
  name: 'date-time-picker',
  props: {
    'error-messages': {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    field: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const menu = ref(false)
    const color = ref('#000000')
    const mask = '!#XXXXXXXX'
    const menuRef = ref(null)
    const proxyVal = ref(props.value)
    const swatchStyle = computed(() => {
      return {
        backgroundColor: color.value,
        cursor: 'pointer',
        height: '25px',
        width: '25px',
        borderRadius: menu.value ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      }
    })
    watch(
      () => proxyVal.value,
      (newValue) => {
        emit('input', newValue)
      }
    )
    onMounted(() => {})
    return {
      menu,
      menuRef,
      swatchStyle,
      color,
      mask,
    }
  },
}
