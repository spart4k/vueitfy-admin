<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <PaymentList />
  </div>
  <!--</Layout>-->
</template>

<script>
import { payment } from '@/pages'

// import TableDefault from '@/components/Table/default/index.vue'
import PaymentList from '@/components/PaymentList/default/index.vue'

export default {
  name: 'Payment-View',

  components: {
    PaymentList,
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
    return {
      payment,
    }
  },
}
</script>
