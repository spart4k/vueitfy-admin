<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableFixed @changeheadershow="changeheadershow" :options="schedule" />
  </div>
  <!--</Layout>-->
</template>

<script>
import { schedule } from '@/pages'

console.log(schedule)

import TableFixed from '@/components/Table/fixed/index.vue'

export default {
  name: 'Schedule-View',
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
      schedule,
    }
  },
}
</script>
