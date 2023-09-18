<template>
  <div class="detail">
    <div class="detail-tabs">
      <v-tabs
        style="flex: unset"
        v-model="detail.activeTab"
        background-color="transparent"
        color="basil"
        class="p-5"
      >
        <v-tab v-for="item in detail.tabs" :key="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="detail.activeTab">
        <v-tab-item v-for="item in detail.tabs" :key="item.id">
          <component :is="item.type" :options="item.config"></component>
        </v-tab-item>
      </v-tabs-items>
      <TableDefault :options="detail.tabs[1].config"></TableDefault>
      {{ TableDefault }}
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
