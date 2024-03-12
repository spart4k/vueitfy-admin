import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

export default {
  name: 'sidelist-header',
  props: {
    date: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      default: () => {},
    },
    stage: {
      type: Boolean,
      default: false,
    },
    lockColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {}
  },
}
