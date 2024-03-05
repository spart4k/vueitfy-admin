<template>
  <div class="v-side">
    <div class="v-side-list">
      <v-btn
        class="v-side-list_item"
        color="navbar"
        elevation="0"
        size="x-small"
        @click="panel.isShow = true"
        ><v-icon class="mr-2" small color="text">$IconGraphic</v-icon>План
        закрытия</v-btn
      >
    </div>
    <transition name="sidelist">
      <div
        v-click-outside="closePanel"
        v-if="panel.isShow"
        class="v-side-panel"
      >
        <component
          :is="'Checklist'"
          :date="$props.date"
          @closePanel="closePanel"
        />
      </div>
    </transition>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
