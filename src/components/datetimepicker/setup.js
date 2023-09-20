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
    const field = ref({
      id: 5,
      label: 'Время создания',
      name: 'datetime',
      value: '',
      type: 'datetime',
      subtype: 'datetime',
      readonly: false,
      menu: false,
      placeholder: '',
      class: [''],
      position: {
        cols: 12,
        sm: 4,
      },
      bootstrapClass: [''],
      disable: false,
    })
    const formData = ref({
      datetime: '',
    })
    const tabs = ref({
      date: {
        id: 0,
        name: 'Дата',
        value: '',
      },
      time: {
        id: 1,
        name: 'Время',
        value: '',
      },
    })
    const activeTab = ref(null)
    const formatedValue = computed(() => {
      return `${tabs.value.date.value} ${tabs.value.time.value}`
    })
    onMounted(() => {
      if (props.value) {
        console.log(props.value)
      }
    })
    watch(
      () => formatedValue.value,
      (newValue) => {
        emit('input', newValue)
      }
    )
    return {
      menu,
      field,
      formData,
      tabs,
      activeTab,
      formatedValue,
    }
  },
}
