<template>
  <div class="">
    <keep-alive>
      <component v-if="tableApiTemplate.length" :is="tableComponent" />
    </keep-alive>

    <!--<div class="" v-html="tableApiTemplate"></div>-->
    <!--{{ tableApiTemplate }}-->
    <!--<div v-html="tableTemplate"></div>-->
    <!--{{ tableTemplate }}-->
  </div>
  <!--<div @click="loadContentToTab" class="">TEST</div>-->
</template>

<!--<style lang="scss" src="@/trash/nav.scss"></style>-->

<style scoped>
/*@import 'https://personal-crm.ru/js/vendor/bootsrap5.1.3/css/bootstrap.min.css';
@import '@/trash/main.css';
@import '@/trash/override.css';
@import '@/trash/choosen.min.css';*/
</style>

<!--<style scoped src="@/trash/main.css"></style>
<style scoped src="@/trash/override.css"></style>
<style scoped src="@/trash/choosen.min.css"></style>-->

<!--<script src="https://personal-crm.ru/js/vendor/jquery/jquery-with-common-plugins.js"></script>
<script src="@/trash/main.js"></script>
<script src="@/trash/jquery.common.js"></script>
<script src="@/trash/choosen.min.js"></script>
<script src="@/trash/choosen.jquery.js"></script>-->
<script>
//import '@/trash/jquery.common.js'
import Vue, { onMounted, computed, ref, onBeforeUnmount } from 'vue'

//import '@/trash/jquery.common.js'
//import '@/trash/main.js'
//import template from '@/testhtml.html'
import tableTemplate from '@/tableTemplate.html'
//import template from '@/testhtmlAPI.html'
//import Layout from '@/layouts/default/index.vue'
import axios from 'axios'
//import { loadContentToTab } from '@/trash/main.js'

export default {
  components: {
    //Layout,
  },
  setup() {
    const initTemplate = () => {}
    const tableApiTemplate = ref('')
    const tableComponent = ref(null)
    const testTemplate = computed(() => {
      return {
        name: 'templateTable',
        template: tableApiTemplate.value,
      }
    })
    onMounted(async () => {
      console.log('FETCH')
      const { data } = await axios(
        'http://10.63.1.132:5000/view/table/shop_request_magnit',
        {
          method: 'post',
        }
      )
      console.log(data)
      tableComponent.value = Vue.component('table-component', {
        template: data,
      })
      console.log(tableTemplate)
      tableApiTemplate.value = data
      //console.log(tableApiTemplate.value)
    })
    onBeforeUnmount(() => {
      console.log('destroy')
      //tableComponent.value = ''
      tableComponent.value.$destroy()
    })
    return {
      //template,
      testTemplate,
      initTemplate,
      tableApiTemplate,
      tableTemplate,
      tableComponent,
    }
  },
}
</script>
