<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="reportTaxi" />
  </div>
  <!--</Layout>-->
</template>

<script type="module">
import { reportTaxi } from '@/pages'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'
export default {
  name: 'ReportTaxi-View',
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
    return {
      reportTaxi,
    }
  },
}
</script>
