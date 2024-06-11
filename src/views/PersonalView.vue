<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!--<p class="text-h4 ml-2">{{ personal.title }}</p>-->
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in availableTabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab">
      <v-tab-item v-for="item in availableTabs" :key="item.options.title">
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
import store from '@/store'
import { ref, computed, onMounted } from 'vue'
import _ from 'lodash'
import useView from '@/compositions/useView.js'

// import { stringAction } from '@/utils/actions'
import { config as personalConfigOrig } from '@/pages/personal/index'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { initPaymentZayavka } from '@/utils/helpers.js'
// import personalTabs from '@/pages/zayavka/index'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Personal-View',
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
    const config = _.cloneDeep(personalConfigOrig)

    const activeTab = ref(0)
    const permission = computed(() => store.state.user.permission_id)

    const checkIncludesPermissions = (el) => {
      if (!el.permissions) return true
      return el.permissions.includes(permission.value)
    }

    const availableTabs = computed(() => {
      return config.tabs.filter((tab) => {
        if (!tab.isShow) return tab
        else {
          return tab.isShow.condition.every((el) => {
            if (el.permissions) {
              return checkIncludesPermissions(el) === el.type
            } else if (el.funcComputed) {
              const context = {
                store,
              }
              return el.funcComputed(context)
            }
          })
        }
      })
    })

    const { paymentConfig, zayavkaConfig } = initPaymentZayavka(
      paymentConfigOrig,
      zayavkaConfigOrig
    )
    paymentConfig.isShow = {
      value: true,
      condition: [
        // {
        //   permissions: [13],
        //   type: false,
        // },
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
      newPath: 'edit-payment',
      settings: {
        index: [0],
      },
    })

    configRouteConvert({
      config: zayavkaConfig.config,
      route: 'zayavka',
      newPath: 'edit-zayavka',
      settings: {
        oldPath: 'id',
      },
    })

    config.tabs[0].detail.tabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])
    config.tabs[1].detail.tabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])
    config.tabs[2].detail.tabs.splice(4, 0, ...[paymentConfig, zayavkaConfig])

    return {
      config,
      activeTab,
      availableTabs,
    }
  },
}
</script>
