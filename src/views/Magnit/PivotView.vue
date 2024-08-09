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
import useView from '@/compositions/useView.js'
import TableFixed from '@/components/Table/fixed/index.vue'

import { config as pivotMagnitConfigOrig } from '@/pages/magnit/pivot/index'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { personalTabs as personalTabsOrig } from '@/pages/personal/index'
import { initPaymentZayavka } from '@/utils/helpers.js'
import { objectTabs as objectTabsOrig } from '@/pages/object/index'
import tableAccountBankOrig from '@/pages/account/config/table-account-bank'
import formAccountEditOrig from '@/pages/account/config/form-account-edit'
import formPaymentEditOrig from '@/pages/payment/config/form-add-edit'
import formMagnitRequestAddEditOrig from '@/pages/magnit/shop-request/config/form-magnit-request-add-edit'

// import { config as personalConfigOrig } from '@/pages/personal/index'

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
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
    } = useView({
      tabs,
      activeTab,
    })
    const config = _.cloneDeep(pivotMagnitConfigOrig)
    const personalTabs = _.cloneDeep(personalTabsOrig)
    const objectTabs = _.cloneDeep(objectTabsOrig)

    const formAccountEdit = _.cloneDeep(formAccountEditOrig)
    const formMagnitRequestAddEdit = _.cloneDeep(formMagnitRequestAddEditOrig)
    const tableAccountBank = _.cloneDeep(tableAccountBankOrig)

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
    const tabNew = config.tabs[0]
    const tabWorked = config.tabs[1]

    tabNew.detail.tabs.push(..._.cloneDeep(objectTabs))
    configRouteConvert({
      config: tabNew,
      newPath: 'object',
      settings: {
        oldPath: 'edit',
      },
    })
    tabNew.detail.tabs.push(formAccountEdit, tableAccountBank)
    configRouteConvert({
      config: tabNew,
      newPath: 'account',
      settings: {
        oldPath: 'edit',
      },
    })
    tabNew.detail.tabs.push(formMagnitRequestAddEdit)
    configRouteConvert({
      config: tabNew,
      newPath: 'edit',
      settings: {
        oldPath: 'add-or-edit',
      },
    })

    tabWorked.detail.tabs.push(...personalTabs)
    configRouteConvert({
      config: tabWorked.detail.tabs[2].config,
      route: 'scan',
      newPath: 'personal-scan',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: tabWorked.detail.tabs[3].config,
      route: 'card',
      newPath: 'personal-card',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: tabWorked,
      newPath: 'personal',
      settings: {
        oldPath: 'edit',
      },
    })

    tabWorked.detail.tabs.push(..._.cloneDeep(objectTabs))
    configRouteConvert({
      config: tabWorked,
      newPath: 'object',
      settings: {
        oldPath: 'edit',
      },
    })
    tabWorked.detail.tabs.push(
      _.cloneDeep(formAccountEdit),
      _.cloneDeep(tableAccountBank)
    )
    configRouteConvert({
      config: tabWorked,
      newPath: 'account',
      settings: {
        oldPath: 'edit',
      },
    })
    tabWorked.detail.tabs.push(_.cloneDeep(formMagnitRequestAddEdit))
    configRouteConvert({
      config: tabWorked,
      newPath: 'edit',
      settings: {
        oldPath: 'add-or-edit',
      },
    })

    return {
      config,
      activeTab,
      tabs,
    }
  },
}
</script>
