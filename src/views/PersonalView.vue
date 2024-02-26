<template>
  <!--<Layout>-->
  <div class="d-flex flex-column flex-grow-1 h-100 view-table">
    <!--<p class="text-h4 ml-2">{{ personal.title }}</p>-->
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in availableTabs" :key="item.options.title">
        {{ item.options.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="item in availableTabs" :key="item.options.title">
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
import { ref, computed } from 'vue'
import { config } from '@/pages/personal/index'
import store from '@/store'
import _ from 'lodash'

//import TableDefault from '@/components/Table/default/index.vue'
//import Layout from '@/layouts/default/index'
//import Axios from 'axios'

export default {
  name: 'Personal-View',
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
    const permission = computed(() => store.state.user.permission_id)
    const directions = computed(() =>
      JSON.parse(store.state.user.direction_json)
    )
    const checkIncludesPermissions = (el) => {
      if (!el.permissions) return true

      return el.permissions.includes(permission.value)
    }
    const checkIncludesDirections = (el) => {
      //return el.direction_id.includes(directions.value)

      if (!el.direction_id) return true
      else {
        return !!_.intersection(el.direction_id, directions.value).length
      }
    }
    const availableTabs = computed(() => {
      return config.tabs.filter((tab) => {
        if (!tab.isShow) return tab
        else {
          return tab.isShow.condition.some((el) => {
            return checkIncludesPermissions(el) === el.type
          })
          // if ()
        }
      })
    })
    return {
      config,
      activeTab,
      availableTabs,
    }
  },
}
</script>
