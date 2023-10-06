<template>
  <div class="text-info">
    <v-card-title
      class="d-flex justify-center font-weight-bold text-subtitle-1 pt-0"
      >Назначение №24522 на дату 12.07.2023
    </v-card-title>
    <v-row v-for="item in data" :key="item.key" class="mt-1">
      {{ item.key }}: {{ item.value }}
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
