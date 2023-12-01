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
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
