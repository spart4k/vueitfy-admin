<template>
  <div class="rates-tab">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      v-model="search"
      label="Поиск"
      clearable
      class="search"
    />
    <!-- <template v-if="loading">
      <div v-for="(position, index) in 10" :key="index" class="rates-position">
        <div class="field-loading gradient"></div>
      </div>
    </template> -->
    <template>
      <div v-for="position in items" :key="position.id" class="rates-position">
        <!--<div class="rates-position__title">{{ position.key }}</div>-->
        <row @openDialog="openDialog" :tab="tab" :row="position" />
      </div>
      <div v-intersect="endIntersect" />
    </template>
    <v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
