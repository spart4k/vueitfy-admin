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
      console.log(tab.value)
      testTask.value = tab.value
      proxyValue.value = tab.value
    }
    const thumbs = ref([])
    const testTask = ref(null)
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
    const leftThumb = computed(() =>
      proxyValue.value === 1 ? 0 : thumbs.value[0]?.offsetWidth
    )
    watch(
      () => testTask.value,
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
      leftThumb,
      testTask,
    }
  },
}
