<template>
  <div>
    <v-list-item>
      <v-select label="color theme" :items="themeOptions" v-model="theme" />
    </v-list-item>
    <template v-for="item in themeOptions">
      <v-checkbox
        :key="item.value"
        v-model="theme"
        :label="item.text"
        :color="item.value"
        :value="themeOptions"
        hide-details
      ></v-checkbox>
    </template>
  </div>
</template>

<script src="./theme.js"></script>
