<template>
  <div>
    <div class="d-flex flex-grow-1">
      <div v-if="!isMobile">
        <Nav></Nav>
      </div>
      <Topbar></Topbar>
    </div>
    <v-main class="d-flex flex-column flex-grow-1">
      <slot></slot>
      <!--<Alert />-->
    </v-main>
  </div>
</template>
<style lang="scss" module scoped src="./style.scss"></style>
<script src="./script.js"></script>
