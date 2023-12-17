import { ref, computed, watch, onMounted, readonly } from 'vue'

export default {
  name: 'color-field',
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
    readonly: {
      type: Boolean,
      default: false,
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
