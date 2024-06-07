<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!--<p class="text-h4 ml-2">{{ documents.title }}</p>-->
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
  <!--</Layout>-->
</template>

<script>
import { ref, toRefs, watch } from 'vue'

import _ from 'lodash'
import useView from '@/compositions/useView.js'

import documentsConfigOrig from '@/pages/documents/index'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { initPaymentZayavka } from '@/utils/helpers.js'
import { personalTabs as personalTabsOrig } from '@/pages/personal/index'

export default {
  name: 'Documents-View',
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
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
    } = useView()
    const config = _.cloneDeep(documentsConfigOrig)
    const activeTab = ref(0)

    watch(activeTab, (newVal) => {
      if (config.bindField) {
        config.bindField.forEach((bindField) => {
          const form = config.tabs[newVal].detail.tabs.find(
            (el) => el.path === bindField.targetForm
          )
          const targetField = form.stages[0].fields.find(
            (field) => field.name === bindField.field
          )
          targetField.value = newVal
        })
      }
    })

    const personalTabs = _.cloneDeep(personalTabsOrig)
    const { paymentConfig, zayavkaConfig } = initPaymentZayavka(
      paymentConfigOrig,
      zayavkaConfigOrig
    )

    configRouteConvert({
      config: paymentConfig.config,
      route: 'payment',
      newPath: 'personal-payment',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: zayavkaConfig.config,
      route: 'zayavka',
      newPath: 'personal-zayavka',
      settings: {
        oldPath: 'id',
      },
    })
    personalTabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])

    config.tabs[0].detail.tabs.push(...personalTabs)
    config.tabs[1].detail.tabs.push(...personalTabs)
    config.tabs[2].detail.tabs.push(...personalTabs)
    config.tabs[3].detail.tabs.push(...personalTabs)
    configRouteConvert({
      config: config.tabs[0],
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })
    configRouteConvert({
      config: config.tabs[1],
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })
    configRouteConvert({
      config: config.tabs[2],
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })
    configRouteConvert({
      config: config.tabs[3],
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })

    return {
      config,
      activeTab,
    }
  },
}
</script>
