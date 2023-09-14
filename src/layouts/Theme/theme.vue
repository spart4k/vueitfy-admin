<template>
  <div>
    <v-list-item>
      <v-select label="color theme" :items="themeOptions" v-model="theme" />
    </v-list-item>
  </div>
</template>

<script src="./theme.js"></script>
