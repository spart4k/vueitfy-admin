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

import { config as pivotRetailConfigOrig } from '@/pages/pivot_retail/index'
import TableFixed from '@/components/Table/fixed/index.vue'

import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { personalTabs as personalTabsOrig } from '@/pages/personal/index'
import { initPaymentZayavka } from '@/utils/helpers.js'
import { objectTabs as objectTabsOrig } from '@/pages/object/index'
import tableAccountBankOrig from '@/pages/account/config/table-account-bank'
import formAccountEditOrig from '@/pages/account/config/form-account-edit'
import formPaymentEditOrig from '@/pages/payment/config/form-add-edit'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'
export default {
  name: 'PivotxRetail-View',
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
    } = useView({})
    const config = _.cloneDeep(pivotRetailConfigOrig)
    const personalTabs = _.cloneDeep(personalTabsOrig)
    const objectTabs = _.cloneDeep(objectTabsOrig)

    const formAccountEdit = _.cloneDeep(formAccountEditOrig)
    const tableAccountBank = _.cloneDeep(tableAccountBankOrig)
    const formPaymentEdit = _.cloneDeep(formPaymentEditOrig)

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
    personalTabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])

    config.detail.tabs.push(...personalTabs)

    configRouteConvert({
      config: config.detail.tabs[2].config,
      route: 'scan',
      newPath: 'personal-scan',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: config.detail.tabs[3].config,
      route: 'card',
      newPath: 'personal-card',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: config,
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })

    config.detail.tabs.push(...objectTabs)
    configRouteConvert({
      config: config,
      newPath: 'object',
      settings: {
        oldPath: 'edit',
      },
    })

    config.detail.tabs.push(formAccountEdit, tableAccountBank)
    configRouteConvert({
      config: config,
      newPath: 'account',
      settings: {
        oldPath: 'edit',
      },
    })
    config.detail.tabs.push(formPaymentEdit)
    configRouteConvert({
      config: config,
      newPath: 'edit',
      settings: {
        oldPath: 'add-edit-logistic',
      },
    })

    return {
      config,
    }
  },
}
</script>
