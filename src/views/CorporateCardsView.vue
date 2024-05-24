<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!-- <TableDefault
      v-if="tableView"
      @changeComp="changeComp"
      @changeheadershow="changeheadershow"
      :options="config"
    /> -->
    <v-tabs
      v-if="tableView"
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in config.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-if="tableView" v-model="activeTab">
      <v-tab-item v-for="item in config.tabs" :key="item.options.title">
        <component
          :is="item.type"
          @changeheadershow="changeheadershow"
          @changeComp="changeComp"
          :options="item"
        />
      </v-tab-item>
    </v-tabs-items>
    <CorpCards v-else :config="config" @changeComp="changeComp" />
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'
import { onMounted, ref } from 'vue'
import useView from '@/compositions/useView.js'

import { config as cardConfigOrig } from '@/pages/card/index'
import CorpCards from '@/components/Cards/default/index.vue'

export default {
  name: 'CorporateCards-View',

  components: {
    //Layout,
    CorpCards,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    const tableView = ref(false)
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
      convertFormConfig,
    } = useView()
    const config = _.cloneDeep(cardConfigOrig)
    const activeTab = ref(0)

    configRouteConvert({
      config: config.tabs[0],
      newPath: 'edit',
      settings: {
        index: [1],
      },
    })

    configRouteConvert({
      config: config.tabs[1],
      newPath: 'edit',
      settings: {
        index: [0],
      },
    })

    const changeComp = () => {
      tableView.value = !tableView.value
    }
    onMounted(() => {})
    return {
      config,
      changeComp,
      tableView,
      activeTab,
    }
  },
}
</script>
