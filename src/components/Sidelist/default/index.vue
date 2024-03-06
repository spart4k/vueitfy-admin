<template>
  <div class="v-side">
    <div class="v-side-list">
      <v-btn
        class="v-side-list_item"
        color="navbar"
        elevation="0"
        size="x-small"
        @click=";(panel.isShow = true), (panel.index = index)"
        v-for="(item, index) in $props.data"
        :key="index"
        ><v-icon class="mr-2" small color="text">{{ item.icon }}</v-icon
        >{{ item.name }}</v-btn
      >
    </div>
    <transition name="sidelist">
      <div
        v-click-outside="closePanel"
        v-if="panel.isShow"
        class="v-side-panel"
      >
        <component
          :is="$props.data[panel.index].component"
          :date="$props.date"
          :data="$props.data[panel.index]"
          @closePanel="closePanel"
        />
      </div>
    </transition>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
