<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="config" />
  </div>
  <!--</Layout>-->
</template>

<script type="module">
import officesConfig from '@/pages/offices/index'
import _ from 'lodash'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'
export default {
  name: 'Appointments-View',
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
    const config = _.cloneDeep(officesConfig)
    return {
      officesConfig,
      config,
    }
  },
}
</script>
