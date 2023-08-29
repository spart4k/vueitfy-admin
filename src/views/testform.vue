<template>
  <Layout>
    <div v-html="template"></div>
  </Layout>
</template>

<style src="@/trash/main.css"></style>
<style src="@/trash/override.css"></style>
<style src="@/trash/choosen.min.css"></style>
<style lang="scss" src="@/trash/nav.scss"></style>

<script src="@/trash/choosen.min.js"></script>
<script>
import 'https://personal-crm.ru/js/vendor/chosen1.1.0/chosen.jquery.min.js'
import template from '@/testhtml.html'
import Layout from '@/layouts/default/index.vue'

export default {
  components: {
    Layout,
  },
  setup() {
    return {
      template,
    }
  },
}
</script>
