<template>
  <div>
    <div class="d-flex flex-grow-1">
      <div v-if="!isMobile">
        <Nav></Nav>
      </div>
      <div class="d-flex flex-column flex-grow-1">
        <Topbar></Topbar>
        <v-main class="d-flex flex-column flex-grow-1">
          <slot></slot>
          <!--<Alert />-->
        </v-main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" module scoped src="./style.scss"></style>
<script src="./script.js"></script>
