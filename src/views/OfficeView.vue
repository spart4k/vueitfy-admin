<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="config" />
    <!-- <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in officesConfig.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab">
      <v-tab-item v-for="item in officesConfig.tabs" :key="item.options.title">
        <component
          ref="tabs"
          :is="item.type"
          @changeheadershow="changeheadershow"
          :options="item"
        />
      </v-tab-item>
    </v-tabs-items> -->
  </div>
  <!--</Layout>-->
</template>

<script type="module">
import { ref } from 'vue'
import officesConfig from '@/pages/offices/index'
import _ from 'lodash'
import useView from '@/compositions/useView.js'
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
    const activeTab = ref(0)
    const tabs = ref([])
    useView({
      tabs,
      activeTab,
    })
    return {
      officesConfig,
      config,
      tabs,
      activeTab,
    }
  },
}
</script>
