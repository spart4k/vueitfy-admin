import Vue, { ref, onMounted, computed, toRef, watch } from 'vue'
import _ from 'lodash'

export default {
  name: 'Switch',
  props: {
    button: {
      type: Object,
      default: () => [],
    },
    value: {
      type: Number || String,
      default: 1,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = toRef(props, 'value')
    const button = toRef(props, 'button')
    const handlerSwitch = (tab) => {
      tab.action && tab.action(tab)
      button.value.refreshTable && emit('getItems')
      proxyValue.value = tab.value
    }
    const thumbs = ref([])
    onMounted(() => {
      if (props.value === undefined) {
        proxyValue.value = button.value.values[0].value
        // Vue.set()
        console.log(proxyValue.value)
      }
    })
    const widthThumb = computed(
      () => thumbs.value[proxyValue.value - 1]?.offsetWidth
    )
    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      }
    )
    return {
      handlerSwitch,
      proxyValue,
      button,
      thumbs,
      widthThumb,
    }
  },
}
