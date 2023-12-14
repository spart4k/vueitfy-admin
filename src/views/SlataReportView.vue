<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!--<p class="text-h4 ml-2">{{ slata.title }}</p>-->
    <component
      :is="slata.type"
      @changeheadershow="changeheadershow"
      :options="slata"
    />
  </div>
  <!--</Layout>-->
</template>

<script>
import { ref, toRefs, watch } from 'vue'
import slata from '@/pages/slata/index.js'

console.log(slata)
export default {
  name: 'SlataReportView',
  components: {
    //TableDefault,
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
      slata,
    }
  },
}
</script>
