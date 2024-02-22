<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault
      @changeheadershow="changeheadershow"
      :options="appointments"
    />
  </div>
  <!--</Layout>-->
</template>

<script type="module">
import { appointments } from '@/pages'

import TableDefault from '@/components/Table/default/index.vue'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'
console.log('APPOINTMENT MOUNTED SCRIPT')
export default {
  name: 'Appointments-View',
  components: {
    TableDefault,
    //Layout,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    console.log('APPOINTMENT MOUNTED')
    return {
      appointments,
    }
  },
}
</script>
