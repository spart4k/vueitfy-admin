<template>
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      value="1"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in config.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab" value="1">
      <v-tab-item v-for="item in config.tabs" :key="item.options.title">
        <component
          :is="item.type"
          @changeheadershow="changeheadershow"
          :options="item"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { ref, toRefs, watch } from 'vue'
import useView from '@/compositions/useView.js'

import { config as realtyConfigOrig } from '@/pages/realty/index'
import _ from 'lodash'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { initPaymentZayavka } from '@/utils/helpers.js'

export default {
  name: 'Realty-View',
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
    const config = _.cloneDeep(realtyConfigOrig)
    const activeTab = ref(0)
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
      convertFormConfig,
    } = useView()
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

    config.tabs[0].detail.tabs[0].fields.splice(9, 1)

    const { paymentConfig, zayavkaConfig } = initPaymentZayavka(
      paymentConfigOrig,
      zayavkaConfigOrig
    )

    configRouteConvert({
      config: zayavkaConfig.config,
      route: 'zayavka',
      newPath: 'realty-zayavka',
      settings: {
        oldPath: 'id',
      },
    })
    config.tabs[0].detail.tabs.push(zayavkaConfig)
    config.tabs[1].detail.tabs.push(zayavkaConfig)

    console.log(config.tabs[0].detail.tabs)

    return {
      config,
      activeTab,
    }
  },
}
</script>
