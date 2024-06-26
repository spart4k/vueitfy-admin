import Vue, { onMounted, ref, computed, watch, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import axios from 'axios'

import Checklist from '@/components/Sidelist/content/checklist/index.vue'
import Coefficient from '@/components/Sidelist/content/coefficient/index.vue'

export default {
  name: 'SideList',
  components: {
    Checklist,
    Coefficient,
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
  setup() {
    const panel = ref({
      isShow: false,
      loading: false,
      stage: 1,
      index: 0,
    })

    const checkPermission = (val) => {
      return val.condition.includes(store.state.user.permission_id)
    }

    const closePanel = () => {
      panel.value.isShow = false
    }

    const transitionEnd = () => {}

    return {
      panel,

      closePanel,
      transitionEnd,
      checkPermission,
    }
  },
}
