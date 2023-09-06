<template>
  <Layout>
    <!--<div @click="loadContentToTab" class="">TEST</div>-->
    <component :is="testTemplate"></component>
    {{ testTemplate }}
    <!--<div v-html="tableTemplate"></div>-->
    <!--{{ tableTemplate }}-->
  </Layout>
</template>

<!--<style lang="scss" src="@/trash/nav.scss"></style>-->

<!-- <style>
// @import 'https://personal-crm.ru/js/vendor/bootsrap5.1.3/css/bootstrap.min.css';
</style> -->

<style scoped src="@/trash/main.css"></style>
<style scoped src="@/trash/override.css"></style>
<style scoped src="@/trash/choosen.min.css"></style>

<!--<script src="https://personal-crm.ru/js/vendor/jquery/jquery-with-common-plugins.js"></script>-->
<!--<script src="@/trash/main.js"></script>-->
<!--<script src="@/trash/jquery.common.js"></script>-->
<!--<script src="@/trash/choosen.min.js"></script>-->
<!--<script src="@/trash/choosen.jquery.js"></script>-->
<script>
//import '@/trash/jquery.common.js'
import { computed, onMounted, ref } from 'vue'

//import '@/trash/jquery.common.js'
//import '@/trash/main.js'
import template from '@/testhtml.html'
import tableTemplate from '@/tableTemplate.html'
//import template from '@/testhtmlAPI.html'
import Layout from '@/layouts/default/index.vue'
import axios from 'axios'
//import { loadContentToTab } from '@/trash/main.js'

export default {
  components: {
    Layout,
  },
  setup() {
    console.log(template)
    const initTemplate = () => {}
    const tableApiTemplate = ref('')
    const testTemplate = computed(() => {
      return {
        name: 'templateTable',
        template: tableTemplate,
      }
    })
    onMounted(async () => {
      console.log('FETCH')
      const { data } = await axios(
        'http://10.63.1.132:5000/view/table/shop_request_magnit',
        {
          method: 'get',
        }
      )
      console.log(data)
      tableApiTemplate.value = data
    })
    return {
      template,
      testTemplate,
      initTemplate,
      tableApiTemplate,
      tableTemplate,
    }
  },
}
</script>
