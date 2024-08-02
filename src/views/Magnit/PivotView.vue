<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableFixed @changeheadershow="changeheadershow" :options="config" />
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'

import { config as pivotMagnit } from '@/pages/magnit/pivot/new/index'
import TableFixed from '@/components/Table/fixed/index.vue'

// import { config as personalConfigOrig } from '@/pages/personal/index'
// import paymentConfigOrig from '@/pages/payment/index'
// import zayavkaConfigOrig from '@/pages/zayavka/index'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Pivotx5-View',
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
    const config = _.cloneDeep(pivotMagnit)

    return {
      config,
    }
  },
}
</script>
