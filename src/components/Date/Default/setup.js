import { ref, computed, watch, onMounted, toRef } from 'vue'
import _ from 'lodash'

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
    const mask = computed(() => {
      if (props.field.subtype === 'multiple') return ''
      else if (props.field.subtype === 'period') return '####.##'
      return '####.##.##'
    })
    const proxyValue = toRef(props, 'value')
    const dateValue = ref()

    const changeValue = () => {
      if (props.field.subtype === 'multiple') {
        dateValue.value = _.cloneDeep(proxyValue.value)
        dateValue.value?.forEach((item, index) => {
          dateValue.value[index] = item.replaceAll('.', '-')
        })
      } else {
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
    }

    const changeDate = () => {
      if (props.field.subtype === 'multiple') {
        proxyValue.value = _.cloneDeep(dateValue.value)
        proxyValue.value?.forEach((item, index) => {
          proxyValue.value[index] = item.replaceAll('-', '.')
        })
      } else {
        if (dateValue.value?.includes('-'))
          proxyValue.value = dateValue.value.replaceAll('-', '.')
      }
    }

    onMounted(() => {
      if (props.field.subtype === 'multiple') {
        proxyValue.value?.forEach((item, index) => {
          proxyValue.value[index] = item.replaceAll('-', '.')
        })
        dateValue.value = _.cloneDeep(proxyValue.value)
        dateValue.value.forEach((item, index) => {
          dateValue.value[index] = item.replaceAll('.', '-')
        })
      } else {
        if (proxyValue.value?.includes('-'))
          proxyValue.value = proxyValue.value.replaceAll('-', '.')
        if (proxyValue.value?.includes('.'))
          dateValue.value = proxyValue.value.replaceAll('.', '-')
      }
      if (proxyValue.value === '0000.00.00') {
        proxyValue.value = ''
      }
    })

    const clearField = () => {}
    watch(
      () => proxyValue.value,
      (newVal) => {
        if (props.field.subtype === 'multiple') {
          proxyValue.value?.forEach((item, index) => {
            proxyValue.value[index] = item.replaceAll('-', '.')
          })
        } else {
          if (proxyValue.value?.includes('-'))
            proxyValue.value = proxyValue.value.replaceAll('-', '.')
        }
        emit('input', newVal)
        emit('change', newVal)
      }
    )

    return {
      menu,
      proxyValue,
      dateValue,
      mask,

      changeDate,
      changeValue,
      clearField,
    }
  },
}
