<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in account.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab">
      <v-tab-item v-for="item in account.tabs" :key="item.options.title">
        <component
          :is="item.type"
          @changeheadershow="changeheadershow"
          :options="item"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
  <!--</Layout>-->
</template>

<script>
import { ref } from 'vue'
import { account } from '@/pages'

// import TableFixed from '@/components/Table/fixed/index.vue'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Account-View',
  components: {
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
    const activeTab = ref(0)
    return {
      account,
      activeTab,
    }
  },
}
</script>
