<template>
  <div class="detail">
    <div class="detail-tabs pa-4">
      <p v-if="detail.name" class="text-h4 mb-4">{{ detail.name }}</p>
      <v-tabs
        style="flex: unset"
        v-model="detail.activeTab"
        background-color="transparent"
        color="basil"
        class="p-5"
        v-show="availableTabs.length > 1"
      >
        <v-tab v-for="item in availableTabs" :key="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="detail.activeTab">
        <v-tab-item
          v-for="item in detail.tabs"
          v-if="
            ($route.meta.mode && $route.meta.mode.includes(item.path)) ||
            (!$route.meta.mode && !item.path)
          "
          :key="item.id"
        >
          <component
            :content="porpsContent"
            :loading="loading"
            :is="item.type"
            :tab="item"
            :options="item.config"
            :detail="detail"
            :syncData="syncForm"
            :stages="item.stages"
            :routeParam="id"
            @closePopup="(e) => $emit('closePopup', e)"
            @getItems="(e) => $emit('getItems', e)"
          />
        </v-tab-item>
      </v-tabs-items>
      <!--<TableDefault :options="detail.tabs[1].config"></TableDefault>-->
      <!--{{ TableDefault }}-->
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
