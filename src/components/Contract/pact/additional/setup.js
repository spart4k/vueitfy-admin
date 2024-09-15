import Vue, { onMounted, computed, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'

export default {
  name: 'Additional',
  props: {},
  components: {},
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)

    onMounted(() => {})

    return {
      loading,
    }
  },
}
