<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault
      @changeheadershow="changeheadershow"
      :options="paymentConfig"
    />
  </div>
  <!--</Layout>-->
</template>

<script>
import { payment } from '@/pages'

import TableDefault from '@/components/Table/default/index.vue'
import { defaultForm as personalConfig } from '@/pages/personal/index'
import _ from 'lodash'
import { onMounted, ref } from 'vue'

export default {
  name: 'Payment-View',

  components: {
    TableDefault,
    //Layout,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  async mounted() {},
  setup() {
    let paymentConfig = {}
    const loading = ref(true)
    const initConfig = () => {
      // const changeActionTo = (array, key, oldPath, newPath) => {
      //   console.log('changeActionTo')
      //   array.forEach((tab) => {
      //     if (tab.path === oldPath) {
      //       tab.path = newPath
      //     }
      //     if (tab.actions) {
      //       tab.actions.forEach((el) => {
      //         if (el.action === 'closePopup') {
      //           el.to = key
      //         }
      //       })
      //     }
      //   })
      // }
      // const personalConfigForms = _.cloneDeep(personalConfig)
      paymentConfig = _.cloneDeep(payment)
      // changeActionTo(personalConfigForms, 'pivot', 'edit', 'edit-personal')
      // paymentConfig.detail.tabs.push(personalConfigForms)
      loading.value = false
    }
    onMounted(() => {
      initConfig()
    })
    return {
      // payment,
      paymentConfig,
    }
  },
}
</script>
