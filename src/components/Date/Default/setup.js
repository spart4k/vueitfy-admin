import { ref, computed, watch, onMounted, toRef } from 'vue'

export default {
  name: 'datepicker',
  props: {
    errorMessages: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number, Object, Array],
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    edge: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const menu = ref(false)
    const proxyValue = toRef(props, 'value')
    const dateValue = ref('')

    const changeValue = () => {
      dateValue.value = proxyValue.value.replaceAll('.', '-')
      const splitedArr = dateValue.value.split('-')
      if (splitedArr.length === 2 && +splitedArr[1]) {
        dateValue.value = dateValue.value + '-'
      } else if (splitedArr.length === 2 && !+splitedArr[1]) {
        dateValue.value = dateValue.value + '01-'
      } else if (splitedArr.length === 1 && +splitedArr[0]) {
        dateValue.value = dateValue.value + '-01-'
      } else if (splitedArr.length === 1 && !+splitedArr[0]) {
        dateValue.value = new Date().toISOString().split('T')[0]
      }
    }

    const changeDate = () => {
      if (dateValue.value?.includes('-'))
        proxyValue.value = dateValue.value.replaceAll('-', '.')
    }

    onMounted(() => {
      if (proxyValue.value?.includes('-'))
        proxyValue.value = proxyValue.value.replaceAll('-', '.')
      if (proxyValue.value?.includes('.'))
        dateValue.value = proxyValue.value.replaceAll('.', '-')
    })

    watch(
      () => proxyValue.value,
      (newVal) => {
        if (proxyValue.value?.includes('-'))
          proxyValue.value = proxyValue.value.replaceAll('-', '.')
        emit('input', newVal)
      }
    )

    return {
      menu,
      proxyValue,
      dateValue,

      changeDate,
      changeValue,
    }
  },
}
