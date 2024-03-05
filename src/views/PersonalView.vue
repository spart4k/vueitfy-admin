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
    >
      <v-tab v-for="item in availableTabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
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
import { ref, computed } from 'vue'
import { config } from '@/pages/personal/index'
import store from '@/store'
import _ from 'lodash'

import { stringAction } from '@/utils/actions'
import paymentConfigOrig from '@/pages/payment/index'
import { zayavkaConfigOrig } from '@/pages/zayavka/index'

//import TableDefault from '@/components/Table/default/index.vue'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Personal-View',
  components: {
    //TableDefault,
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
    const permission = computed(() => store.state.user.permission_id)

    const checkIncludesPermissions = (el) => {
      if (!el.permissions) return true
      return el.permissions.includes(permission.value)
    }

    const availableTabs = computed(() => {
      return config.tabs.filter((tab) => {
        if (!tab.isShow) return tab
        else {
          return tab.isShow.condition.some((el) => {
            return checkIncludesPermissions(el) === el.type
          })
        }
      })
    })

    const paymentConfig = _.cloneDeep(paymentConfigOrig)
    const zayavkaConfig = _.cloneDeep(zayavkaConfigOrig)

    // const LIST_HEAD_PAYMENTS = [
    //   'status_name',
    //   'account_name',
    //   'date_add',
    //   'bank_fio',
    //   'total',
    // ]
    // const LIST_PANEL_PAYMENTS = ['Обновить']
    // const LIST_HEAD_ZAYAVKA = [
    //   'status_name',
    //   'category_name',
    //   'schet',
    //   'date_create',
    //   'total',
    //   'price',
    // ]

    // paymentConfig.options = {
    //   ...paymentConfig.options,
    //   urlDetail: 'personal_id',
    //   alias: 'pb.personal_id',
    // }

    // zayavkaConfig.options = {
    //   ...zayavkaConfig.options,
    //   urlDetail: 'personal_id',
    //   alias: 'z.personal_id',
    // }

    // const headDateCreate = {
    //   title: 'Создано',
    //   type: 'default',
    //   align: 'center',
    //   fixed: {
    //     value: false,
    //     position: 'left',
    //   },
    //   sorts: [
    //     {
    //       type: 'string',
    //       default: '',
    //       value: '',
    //       isShow: false,
    //     },
    //   ],
    //   alias: 'z.date_create',
    //   isShow: true,
    //   width: '40',
    //   value: 'date_create',
    //   search: {
    //     field: '',
    //     isShow: true,
    //   },
    // }
    // zayavkaConfig.head.push(headDateCreate)

    // const actions = [
    //   stringAction({
    //     text: 'Закрыть',
    //     type: 'submit',
    //     color: 'textDefault',
    //     name: 'closePopup',
    //     action: 'closePopup',
    //     skipValidation: true,
    //   }),
    // ]

    // const converConfig = (config, listHead, listPanel) => {
    //   const spliceHeads = (list) => {
    //     config.head = config.head.flatMap((head) => {
    //       const { value } = head
    //       if (list.includes(value)) {
    //         return head
    //       } else {
    //         return []
    //       }
    //     })
    //   }
    //   const splicePanel = (list) => {
    //     config.panel.buttons = config.panel.buttons.flatMap((button) => {
    //       const { label } = button
    //       if (list.includes(label)) {
    //         return button
    //       } else {
    //         return []
    //       }
    //     })
    //   }
    //   if (config.filter) {
    //     config.filter = undefined
    //   }
    //   config.actions = actions
    //   spliceHeads(listHead)
    //   splicePanel(listPanel)
    // }

    // // Convert payment view
    // converConfig(paymentConfig, LIST_HEAD_PAYMENTS, LIST_PANEL_PAYMENTS)
    // converConfig(zayavkaConfig, LIST_HEAD_ZAYAVKA, LIST_PANEL_PAYMENTS)
    // paymentConfig.detail.requestId = 'payment'
    // paymentConfig.detail.tabs[0].path = 'edit-payment'
    // paymentConfig.detail.tabs[0].routeParam = 'payment'
    // paymentConfig.detail.tabs[0].id = 15

    // // Convert zayavka view
    // zayavkaConfig.detail.requestId = 'zayavka'
    // const editTabZayavka = zayavkaConfig.detail.tabs.find(
    //   (el) => el.path === 'id'
    // )
    // editTabZayavka.path = 'edit-zayavka'
    // editTabZayavka.routeParam = 'edit-zayavka'

    return {
      config,
      activeTab,
      availableTabs,
    }
  },
}
</script>
