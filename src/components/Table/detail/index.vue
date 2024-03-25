<template>
  <div class="detail">
    <div class="detail-tabs 1">
      <div
        v-show="$route.meta.label || detail.name || availableTabsAll.length > 1"
        class="pa-4 detail-header"
      >
        <p v-if="$route.meta.label" class="text-h4 mb-4">
          {{ $route.meta.label }}
        </p>
        <p v-else-if="detail.name" class="text-h4 mb-4">
          {{ detail.name }}
        </p>
        <v-tabs
          style="flex: unset"
          v-model="activeTab"
          background-color="transparent"
          color="basil"
          class="p-5"
          v-show="availableTabsAll.length > 1"
          mobile-breakpoint="0"
        >
          <v-tab v-for="item in availableTabsAll" :key="item.id">
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </div>
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="item in availableTabsAll" :key="item.id">
          <component
            :content="propsContent"
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
            @refreshData="$emit('refreshData')"
            :formDataParent="formDataParent"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
