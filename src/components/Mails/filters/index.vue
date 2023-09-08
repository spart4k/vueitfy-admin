<template>
  <div class="v-filters d-flex align-center flex-column">
    <!-- {{ $props.data }} -->
    <h2 class="v-filters-date mt-2">13 ПН</h2>
    <v-btn color="primary" variant="tonal" class="mt-2 mb-7">
      <v-icon small class="mr-2">$IconEdit</v-icon>
      Написать
    </v-btn>
    <div class="v-filters-mail-types-list pl-4 pr-4">
      <div
        class="v-filters-mail-types-list_item d-flex align-center"
        v-for="(item, index) in $props.data"
        :key="index"
      >
        <v-icon :color="!index ? 'primary' : 'text'" small class="mr-4">{{
          item.url
        }}</v-icon>
        <div :class="['flex-grow-1', 'fs-12', !index && 'active']">
          {{ item.label }}
        </div>
        <div :class="['fs-12', !index && 'active']">
          {{ item.number ? item.number : '' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
