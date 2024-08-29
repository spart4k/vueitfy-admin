<template>
  <v-list class="overflow-auto mt-2 mb-2" max-height="400">
    <v-row
      class="text--text detailItem"
      v-for="(item, index) in stage.targets"
      :key="index"
    >
      <v-col cols="12" sm="4">
        <v-list-item-title>
          <span class="mr-6">{{ index + 1 }}.</span>
          {{ list.personal[item.personal_id] }}
        </v-list-item-title>
      </v-col>
      <v-col cols="12" sm="4">
        <v-list-item-title class="d-flex">
          <v-icon class="mr-3" color="text"> mdi-calendar-blank-outline </v-icon
          >{{ convertData(item.date_start) }}
        </v-list-item-title>
      </v-col>
      <v-col cols="12" sm="4">
        <v-list-item-title class="font-weight-bold">
          {{ item.legal_entity }}
        </v-list-item-title>
      </v-col>
    </v-row>
  </v-list>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
