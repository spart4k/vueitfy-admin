<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!-- <TableDefault @changeheadershow="changeheadershow" :options="reportTaxi" /> -->
    <v-tabs
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
    <v-tabs-items v-model="activeTab">
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

<script type="module">
import _ from 'lodash'
import useView from '@/compositions/useView.js'
import { ref, computed, onMounted } from 'vue'
import { config as habitationConfigOrig } from '@/pages/habitation/index'
import bankConfigOrig from '@/pages/personal/config/table-personal-bank'
// import TableFixed from '@/components/Table/fixed/index.vue'

//import Layout from '@/layouts/default/index'
//import Axios from 'axios'
export default {
  name: 'ReportTaxi-View',
  components: {
    //Layout,
    // TableFixed,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    const config = _.cloneDeep(habitationConfigOrig)
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
      convertFormConfig,
    } = useView()
    const activeTab = ref(0)

    configRouteConvert({
      config: config.tabs[0],
      newPath: 'habitation-edit',
      settings: {
        index: [1],
      },
    })
    configRouteConvert({
      config: config.tabs[1],
      newPath: 'habitation-realtor-edit',
      settings: {
        index: [1],
      },
    })
    configRouteConvert({
      config: config.tabs[2],
      newPath: 'habitation-owner-edit',
      settings: {
        index: [1],
      },
    })
    configRouteConvert({
      config: config.tabs[3],
      newPath: 'habitation-edit',
      settings: {
        index: [1],
      },
    })
    const bankConfig = _.cloneDeep(bankConfigOrig)

    const LIST_HEAD = ['id', 'bank_name', 'invoice', 'fio']
    const LIST_FIELD = ['bank_id', 'fio', 'invoice']

    convertConfigPanel({
      config: bankConfig.config,
      listHead: LIST_HEAD,
    })

    const bankForm = bankConfig.config.detail.tabs[0]
    convertFormConfig({
      config: bankForm,
      listField: LIST_FIELD,
    })
    bankForm.actions.unshift(_.cloneDeep(bankForm.actions[0]))

    const bankConfigRealtor = _.cloneDeep(bankConfig)
    const bankConfigOwner = _.cloneDeep(bankConfig)

    bankConfigRealtor.config.detail.tabs[0].actions[0] = {
      ...bankConfigRealtor.config.detail.tabs[0].actions[0],
      ...{
        url: 'set/data/realtors_card',
        useRouteKey: [{ requestKey: 'realtor_id', storageKey: 'realtor_id' }],
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['add'],
              type: true,
            },
          ],
        },
      },
    }

    bankConfigRealtor.config.detail.tabs[0].actions[1] = {
      ...bankConfigRealtor.config.detail.tabs[0].actions[1],
      ...{
        url: 'set/data/realtors_card',
        action: 'createForm',
        module: 'form/create',
        name: 'createForm',
        useRouteParam: undefined,
        useRouteKey: [{ requestKey: 'realtor_id', storageKey: 'realtor_id' }],
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['edit'],
              type: true,
            },
          ],
        },
      },
    }

    bankConfigOwner.config.detail.tabs[0].actions[0] = {
      ...bankConfigOwner.config.detail.tabs[0].actions[0],
      ...{
        url: 'set/data/owner_habitation_card',
        useRouteKey: [
          {
            requestKey: 'owner_habitation_id',
            storageKey: 'owner_id',
          },
        ],
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['add'],
              type: true,
            },
          ],
        },
      },
    }

    bankConfigOwner.config.detail.tabs[0].actions[1] = {
      ...bankConfigOwner.config.detail.tabs[0].actions[1],
      ...{
        url: 'set/data/owner_habitation_card',
        action: 'createForm',
        module: 'form/create',
        name: 'createForm',
        useRouteParam: undefined,
        useRouteKey: [
          {
            requestKey: 'owner_habitation_id',
            storageKey: 'owner_id',
          },
        ],
        isHide: {
          value: false,
          type: 'every',
          condition: [
            {
              field: 'mode',
              target: 'environment',
              value: ['edit'],
              type: true,
            },
          ],
        },
      },
    }

    bankConfigRealtor.config.panel.buttons.push({
      label: 'Добавить',
      class: ['v-table-button--custom'],
      type: 'changeUrl',
      url: 'habitation/:realtor_id/add',
      backgroundColor: '#fff',
    })

    bankConfigOwner.config.panel.buttons.push({
      label: 'Добавить',
      class: ['v-table-button--custom'],
      type: 'changeUrl',
      url: 'habitation/:owner_id/add',
      backgroundColor: '#fff',
    })

    bankConfigRealtor.config.detail.tabs.push(
      _.cloneDeep(bankConfigRealtor.config.detail.tabs[0])
    )
    bankConfigRealtor.config.detail.tabs[1].path = 'add'

    bankConfigOwner.config.detail.tabs.push(
      _.cloneDeep(bankConfigOwner.config.detail.tabs[0])
    )
    bankConfigOwner.config.detail.tabs[1].path = 'add'

    bankConfigRealtor.config.detail.tabs[0].alias = 'realtors_card'
    bankConfigRealtor.config.options.url = 'get/pagination/realtor_card'
    bankConfigRealtor.config.options.alias = 'realtor_id'
    bankConfigRealtor.config.options.urlDetail = undefined

    bankConfigOwner.config.detail.tabs[0].alias = 'owner_habitation_card'
    bankConfigOwner.config.options.url = 'get/pagination/owner_card'
    bankConfigOwner.config.options.alias = 'owner_habitation_id'
    bankConfigOwner.config.options.urlDetail = undefined
    config.tabs[1].detail.tabs.push(bankConfigRealtor)
    config.tabs[2].detail.tabs.push(bankConfigOwner)
    configRouteConvert({
      config: config.tabs[1],
      newPath: 'habitation-realtor-edit',
      route: 'realtor_id',
      settings: {
        oldPath: 'edit',
      },
    })

    configRouteConvert({
      config: config.tabs[2],
      newPath: 'habitation-owner-edit',
      route: 'owner_id',
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
