<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault
      @changeheadershow="changeheadershow"
      :options="shopRequestMagnit"
    />
  </div>
  <!--</Layout>-->
</template>

<script>
import { shopRequestMagnit } from '@/pages'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Shop-Request-Magnit-View',
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
      shopRequestMagnit,
    }
  },
}
</script>
