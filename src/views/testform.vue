<template>
  <Layout>
    <div v-html="template"></div>
  </Layout>
</template>

<!--<style lang="scss" src="@/trash/nav.scss"></style>-->

<style>
@import 'https://personal-crm.ru/js/vendor/bootsrap5.1.3/css/bootstrap.min.css';
</style>

<style src="@/trash/main.css"></style>
<style src="@/trash/override.css"></style>
<style src="@/trash/choosen.min.css"></style>

<!--<script src="https://personal-crm.ru/js/vendor/jquery/jquery-with-common-plugins.js"></script>-->
<script src="@/trash/main.js"></script>
<script src="@/trash/choosen.min.js"></script>
<script src="@/trash/choosen.jquery.js"></script>
<script>
//import '@/trash/jquery.common.js'
import '@/trash/main.js'
import template from '@/testhtml.html'
import Layout from '@/layouts/default/index.vue'

export default {
  components: {
    Layout,
  },
  setup() {
    console.log(loadContentToTab)
    return {
      template,
    }
  },
}
</script>
