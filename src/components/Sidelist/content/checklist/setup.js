import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'CheckList',
  props: {},
  setup() {
    const stage = ref(0)
    return {
      stage,
    }
  },
}
