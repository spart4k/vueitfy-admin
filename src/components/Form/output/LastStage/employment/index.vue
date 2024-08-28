<template>
  <v-list class="overflow-auto mt-2 mb-2" max-height="400">
    <v-row class="mt-0" v-for="(item, index) in stage.targets" :key="index">
      <v-col cols="12" sm="4">
        <v-list-item-title class="textDefault--text">
          {{ list.personal[item.personal_id] }}
        </v-list-item-title>
      </v-col>
      <v-col cols="12" sm="2">
        <v-list-item-title class="textDefault--text">
          {{ convertData(item.date_start) }}
        </v-list-item-title>
      </v-col>
      <v-col cols="12" sm="4">
        <v-list-item-title class="textDefault--text">
          {{ item.legal_entity }}
        </v-list-item-title>
      </v-col>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
