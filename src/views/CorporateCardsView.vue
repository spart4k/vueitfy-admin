<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault
      v-if="tableView"
      @changeComp="changeComp"
      @changeheadershow="changeheadershow"
      :options="config"
    />
    <!-- <CorpCards :options="config" @changeComp="changeComp" /> -->
  </div>
  <!--</Layout>-->
</template>

<script>
import _ from 'lodash'
import { onMounted, ref } from 'vue'
import useView from '@/compositions/useView.js'

import { config as cardConfigOrig } from '@/pages/card/index'
import CorpCards from '@/components/Cards/default/index.vue'

export default {
  name: 'CorporateCards-View',

  components: {
    //Layout,
    // CorpCards,
  },
  methods: {
    changeheadershow(options) {
      const { headerEl, value } = options
      headerEl.isShow = value
    },
  },
  setup() {
    const tableView = ref(true)
    const {
      initTableConfig,
      createHeadItem,
      convertConfigPanel,
      addCloseButton,
      configRouteConvert,
      convertFormConfig,
    } = useView()
    const config = _.cloneDeep(cardConfigOrig)

    configRouteConvert({
      config: config,
      newPath: 'edit',
      settings: {
        index: [1],
      },
    })

    const changeComp = () => {
      tableView.value = !tableView.value
    }
    onMounted(() => {})
    return {
      config,
      changeComp,
      tableView,
    }
  },
}
</script>
