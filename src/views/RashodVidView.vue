<template>
  <div class="d-flex flex-column flex-grow-1 h-100">
    <TableDefault @changeheadershow="changeheadershow" :options="config" />
  </div>
</template>

<script>
import { rashod_vid as config } from '@/pages'
import useView from '@/compositions/useView.js'

export default {
  name: 'RashodVid-View',

  components: {},
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
      convertFormConfig,
    } = useView()
    configRouteConvert({
      config: config,
      newPath: 'edit',
      settings: {
        index: [1],
      },
    })
    return {
      config,
    }
  },
}
</script>
