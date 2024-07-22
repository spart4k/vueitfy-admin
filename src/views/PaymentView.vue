<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="config" />
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'
import { onMounted, ref } from 'vue'
import useView from '@/compositions/useView.js'

// import { payment } from '@/pages'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { personalTabs as personalTabsOrig } from '@/pages/personal/index'
import { initPaymentZayavka } from '@/utils/helpers.js'

export default {
  name: 'Payment-View',

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
    } = useView({})
    const config = _.cloneDeep(paymentConfigOrig)
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
    config.detail.tabs.push(...personalTabs)
    configRouteConvert({
      config: config,
      newPath: 'personal',
      // route: 'personal_id',
      settings: {
        oldPath: 'edit',
      },
    })

    onMounted(() => {})
    return {
      config,
    }
  },
}
</script>
