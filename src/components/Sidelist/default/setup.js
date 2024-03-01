import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

import Checklist from '@/components/Sidelist/content/checklist/index.vue'

export default {
  name: 'SideList',
  components: {
    Checklist,
  },
  props: {},
  setup() {
    const panel = ref({
      isShow: false,
      loading: false,
      stage: 1,
    })

    const closePanel = () => {
      panel.value.isShow = false
    }

    return {
      panel,

      closePanel,
    }
  },
}
