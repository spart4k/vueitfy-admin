<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableFixed @changeheadershow="changeheadershow" :options="config" />
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'
import useView from '@/compositions/useView.js'

import { config as pivotConfigOrig } from '@/pages/pivot/index'
import TableFixed from '@/components/Table/fixed/index.vue'

import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { personalTabs as personalTabsOrig } from '@/pages/personal/index'
import { initPaymentZayavka } from '@/utils/helpers.js'
import { objectTabs as objectTabsOrig } from '@/pages/object/index'
// import { config as personalConfigOrig } from '@/pages/personal/index'
// import paymentConfigOrig from '@/pages/payment/index'
// import zayavkaConfigOrig from '@/pages/zayavka/index'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Pivot-View',
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
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
    } = useView()
    const config = _.cloneDeep(pivotConfigOrig)
    const personalTabs = _.cloneDeep(personalTabsOrig)
    const objectTabs = _.cloneDeep(objectTabsOrig)

    const { paymentConfig, zayavkaConfig } = initPaymentZayavka(
      paymentConfigOrig,
      zayavkaConfigOrig
    )
    paymentConfig.isShow = {
      value: true,
      condition: [
        {
          permissions: [4, 3, 15, 1, 8, 17],
          type: true,
        },
      ],
    }

    zayavkaConfig.isShow = {
      value: true,
      condition: [
        {
          permissions: [4, 3, 15, 1, 8, 17, 16, 19],
          type: true,
        },
      ],
    }
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
    console.log(paymentConfig)
    personalTabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])

    config.detail.tabs.push(...personalTabs)
    configRouteConvert({
      config: config,
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
        exceptName: ['Редактирование выработки'],
      },
    })

    config.detail.tabs.push(...objectTabs)
    configRouteConvert({
      config: config,
      newPath: 'object',
      settings: {
        oldPath: 'edit',
        exceptName: ['Редактирование выработки'],
      },
    })

    return {
      config,
    }
  },
}
</script>
