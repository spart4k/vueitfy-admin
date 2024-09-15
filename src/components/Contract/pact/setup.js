import Vue, { onMounted, computed, ref, watch } from 'vue'
import store from '@/store'
import _ from 'lodash'
import Additional from './additional/index.vue'

export default {
  name: 'Pact',
  props: {},
  components: { Additional },
  setup(props, ctx) {
    const { emit } = ctx
    const loading = ref(false)

    onMounted(() => {})

    return {
      loading,
    }
  },
}
