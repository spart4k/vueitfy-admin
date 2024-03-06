import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

import SidelistHeader from '@/components/Sidelist/content/header/index.vue'
import SidelistSearch from '@/components/Sidelist/content/search/index.vue'

export default {
  name: 'CheckList',
  components: {
    SidelistHeader,
    SidelistSearch,
  },
  props: {
    date: {
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    onMounted(() => {
      // getData()
    })
    return {}
  },
}
