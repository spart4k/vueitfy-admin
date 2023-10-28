<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="object" />
    <!-- <TableFixed @changeheadershow="changeheadershow" :options="personal" /> -->
  </div>
  <!--</Layout>-->
</template>

<script>
import { object } from '@/pages'

import TableDefault from '@/components/Table/default/index.vue'
// import TableFixed from '@/components/Table/fixed/index.vue'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Object-View',
  components: {
    TableDefault,
    // TableFixed,
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
      object,
    }
  },
}
</script>
