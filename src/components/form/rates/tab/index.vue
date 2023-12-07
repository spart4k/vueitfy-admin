<template>
  <div class="rates-tab">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      v-model="search"
      label="Поиск"
      clearable
      class="search"
    />
    <div v-for="position in items" :key="position.id" class="rates-position">
      <!--<div class="rates-position__title">{{ position.key }}</div>-->
      <row @openDialog="openDialog" :row="position" />
    </div>
    <v-progress-circular
      v-if="loading"
      :size="20"
      :width="2"
      color="primary"
      indeterminate
    />
    <div v-intersect="endIntersect" />
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
