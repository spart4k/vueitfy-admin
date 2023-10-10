<template>
  <div class="form-stage">
    <v-tabs
      style="flex: unset; display: none"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
    >
      <v-tab v-for="item in stages" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="item in stages" :key="item.id">
        <component
          :is="item.type"
          :tab="item"
          :options="item.config"
          @nextStage="nextStage"
          @prevStage="prevStage"
        />
        <!--<v-progress-circular
          v-else
          :size="20"
          :width="2"
          color="primary"
          indeterminate
        />-->
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
