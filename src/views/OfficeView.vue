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
import { initPaymentZayavka } from '@/utils/helpers.js'
import paymentConfigOrig from '@/pages/payment/index'
import zayavkaConfigOrig from '@/pages/zayavka/index'
import { stringAction } from '@/utils/actions'

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
    // const { paymentConfig, zayavkaConfig } = initPaymentZayavka(
    //   paymentConfigOrig,
    //   zayavkaConfigOrig
    // )
    const { configRouteConvert, initTableConfig, convertConfigPanel } = useView(
      {
        tabs,
        activeTab,
      }
    )

    const zayavkaConfig = initTableConfig({
      path: 'edit',
      name: 'Расход',
      config: _.cloneDeep(zayavkaConfigOrig),
      isShow: {
        value: true,
        condition: [
          {
            permissions: [7],
            type: false,
          },
        ],
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
    zayavkaConfig.config.options = {
      ...zayavkaConfig.config.options,
      // urlDetail: 'office_id',
      alias: 'z.office_id',
    }
    const LIST_HEAD_ZAYAVKA = [
      'status_name',
      'category_name',
      'schet',
      'date_create',
      'total',
      'price',
    ]
    const LIST_PANEL = ['Обновить']
    convertConfigPanel({
      config: zayavkaConfig.config,
      listHead: LIST_HEAD_ZAYAVKA,
      listPanel: LIST_PANEL,
    })

    // zayavkaConfig.options.alias = 'office_id'
    console.log(zayavkaConfig)
    ;(zayavkaConfig.config.actions = [
      stringAction({
        text: 'Закрыть',
        type: 'submit',
        color: 'textDefault',
        name: 'closePopup',
        action: 'closePopup',
        to: 'personal',
        skipValidation: true,
      }),
    ]),
      config.detail.tabs.push(zayavkaConfig)
    return {
      officesConfig,
      config,
      tabs,
      activeTab,
    }
  },
}
</script>
