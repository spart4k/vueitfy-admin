import Vue, { watch, ref, computed, onMounted, toRef, reactive } from 'vue'
import { getList } from '@/api/selects'

export default {
  name: 'Date-Range',
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number, Object, Array],
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)
    const proxyValue = toRef(props, 'value')
    const searchProps = ref(props.field.search)
    const dateMenu = reactive({
      start: false,
      end: false,
    })
    const date = reactive({
      start: '',
      end: '',
    })
    const openMenu = (property) => {
      dateMenu[property] = true
    }
    const closeMenu = (property) => {
      dateMenu[property] = false
    }
    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      }
    )

    onMounted(() => {})

    return {
      proxyValue,
      date,
      dateMenu,
      openMenu,
      closeMenu,
    }
  },
}
