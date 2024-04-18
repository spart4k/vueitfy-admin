<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="config" />
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'
import { onMounted, ref } from 'vue'

import config from '@/pages/card/index'

export default {
  name: 'CorporateCards-View',

  components: {
    //Layout,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    onMounted(() => {})
    return {
      config,
    }
  },
}
</script>
