<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in config.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab">
      <v-tab-item v-for="item in config.tabs" :key="item.options.title">
        <component
          ref="tabs"
          :is="item.type"
          @changeheadershow="changeheadershow"
          :options="item"
        />
      </v-tab-item>
    </v-tabs-items>
    <!-- <TableFixed @changeheadershow="changeheadershow" :options="config" /> -->
  </div>
  <!--</Layout>-->
</template>

<script>
import { ref } from 'vue'
import _ from 'lodash'

import pivotMagnit from '@/pages/magnit/pivot/index'
import TableFixed from '@/components/Table/fixed/index.vue'
import useView from '@/compositions/useView.js'

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
    const activeTab = ref(0)
    const tabs = ref([])
    useView({
      tabs,
      activeTab,
    })
    console.log(pivotMagnit)
    const config = _.cloneDeep(pivotMagnit)

    return {
      config,
      activeTab,
      tabs,
    }
  },
}
</script>
