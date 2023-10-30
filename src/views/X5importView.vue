<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableFixed @changeheadershow="changeheadershow" :options="x5import" />
  </div>
  <!--</Layout>-->
</template>

<script>
import { x5import } from '@/pages'

import TableFixed from '@/components/Table/fixed/index.vue'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'X5import-View',
  components: {
    TableFixed,
    //Layout,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    return {
      x5import,
    }
  },
}
</script>
