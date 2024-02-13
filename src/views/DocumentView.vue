<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!--<p class="text-h4 ml-2">{{ documents.title }}</p>-->
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      value="1"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in documents.tabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab" value="1">
      <v-tab-item v-for="item in documents.tabs" :key="item.options">
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
import { ref, toRefs, watch } from 'vue'
//import formPersonal from '@/pages/personal/formPersonal'
import { documents } from '@/pages'
// import { warn } from '@vue/composition-api'

console.log(documents)
//import TableDefault from '@/components/Table/default/index.vue'
//import Layout from '@/layouts/default/indedx'
//import Axios from 'axios'

export default {
  name: 'Documents-View',
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

    watch(activeTab, (newVal) => {
      if (documents.bindField) {
        documents.bindField.forEach((bindField) => {
          const form = documents.tabs[newVal].detail.tabs.find(
            (el) => el.id === bindField.targetForm
          )
          // console.log(form)
          const targetField = form.stages[0].fields.find(
            (field) => field.name === bindField.field
          )
          // console.log(targetField)
          targetField.value = newVal
        })
      }
    })

    return {
      documents,
      activeTab,
    }
  },
}
</script>
