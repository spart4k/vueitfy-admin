import { ref, computed, watch, onMounted } from 'vue'

export default {
  name: 'date-time-picker',
  props: {
    'error-messages': {
      type: Array,
      default: () => [],
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const menu = ref(false)
    const menuRef = ref(null)
    const tabs = ref({
      date: {
        id: 0,
        name: 'Дата',
        value: props.value ? props.value.split(' ')[0] : '',
      },
      time: {
        id: 1,
        name: 'Время',
        value: props.value ? props.value.split(' ')[1] : '',
      },
    })
    const activeTab = ref(null)
    const formatedValue = computed(() => {
      return `${tabs.value.date.value} ${tabs.value.time.value}`
    })
    watch(
      () => tabs.value.date.value,
      () => {
        activeTab.value = 1
      }
    )
    watch(
      () => formatedValue.value,
      (newValue) => {
        emit('input', newValue)
      }
    )
    onMounted(() => {})
    return {
      menu,
      tabs,
      activeTab,
      formatedValue,
      menuRef,
    }
  },
}
