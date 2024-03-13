import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'sidelist-search',
  props: {
    value: {
      type: String,
    },
  },
  setup(props, ctx) {
    const { emit } = ctx
    const proxyValue = toRef(props, 'value')

    watch(
      () => proxyValue.value,
      (newVal) => {
        emit('input', newVal)
      }
    )
    return {
      proxyValue,
    }
  },
}
