<template>
  <div class="pl-7 pr-7">
    <div class="v-heading">
      <v-btn
        class="v-heading_item v-heading_item__left"
        icon
        x-small
        @click="$emit($props.stage ? 'changeStage' : 'closePanel')"
      >
        <v-icon small color="disabled">$IconArrowLeft</v-icon></v-btn
      >
      <div class="v-heading_relative">
        <v-btn
          v-if="$props.date"
          icon
          x-small
          class="v-heading_item v-heading_item__center"
        >
          <v-icon small color="disabled">$IconLock</v-icon></v-btn
        >
        {{ $props.data.name }}
      </div>
      <div v-if="$props.date" class="v-heading_item v-heading_item__right">
        Январь 2024
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
