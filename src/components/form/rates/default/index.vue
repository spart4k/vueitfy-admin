<template>
  <div class="rates">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in tabs" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="item in tabs" :key="item.id">
        <tab />
      </v-tab-item>
    </v-tabs-items>
    <v-row class="mt-5 justify-end">
      <v-btn
        type="submit"
        :color="action.color"
        class="ml-2"
        :loading="loading"
        @click.prevent="clickHandler(action)"
        v-for="action in actions"
        :key="action.id"
      >
        {{ action.text }}
      </v-btn>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
