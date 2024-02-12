<template>
  <div class="text-info">
    <v-row v-for="item in formData" :key="item.key" class="mt-1">
      <span class="font-weight-bold">{{ item.key }}: </span> &nbsp;{{
        item.value
      }}
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
