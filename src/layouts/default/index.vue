<template>
  <div class="layout-default d-flex flex-grow-1">
    <div class="sidebar-container">
      <Sidebar :navData="navData"></Sidebar>
    </div>
    <!-- <div
      id="bg__black"
      :class="isOpenMenu ? 'bg__black--active' : 'bg__black'"
    ></div> -->
    <div class="d-flex flex-column flex-grow-1">
      <Topbar :navData="navData"></Topbar>
      <v-main class="d-flex flex-column flex-grow-1">
        <slot></slot>
      </v-main>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./script.js"></script>
