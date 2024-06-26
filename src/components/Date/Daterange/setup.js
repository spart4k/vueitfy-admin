import Vue, { watch, ref, computed, onMounted, toRef, reactive } from 'vue'
import { getList } from '@/api/selects'
import Datepicker from '@/components/Date/Default/index.vue'

export default {
  name: 'Date-Range',
  components: {
    Datepicker,
  },
  props: {
    field: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [Array, String],
      default: () => [null, null],
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
    const isEmpty = computed(() => !date.start && !date.end)
    const resetDate = () => {
      for (let key in date) {
        date[key] = ''
      }
    }
    const onFocus = () => (focused.value = true)
    const unFocus = () => (focused.value = false)
    const focused = ref(false)
    const hasError = computed(() => {
      if (props.errorMessages.length) {
        return props.errorMessages[0].some((el) => el)
      } else return false
    })
    watch(
      () => date,
      (newVal) => {
        proxyValue.value = [date.start, date.end]
      },
      { deep: true }
    )

    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      },
      { deep: true }
    )

    onMounted(() => {
      date.start = proxyValue.value[0]
      date.end = proxyValue.value[1]
    })

    return {
      proxyValue,
      date,
      dateMenu,
      openMenu,
      closeMenu,
      isEmpty,
      resetDate,
      onFocus,
      focused,
      unFocus,
      hasError,
    }
  },
}
