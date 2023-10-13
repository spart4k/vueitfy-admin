<template>
  <!-- <Layout> -->
  <div class="d-flex flex-column flex-grow-1 h-100">
    <MailsDefault />
  </div>
  <!-- </Layout> -->
</template>

<script>
// import Vue from 'vue'
import MailsDefault from '@/components/Mails/default/index.vue'

export default {
  name: 'Mails-View',
  components: {
    MailsDefault,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
