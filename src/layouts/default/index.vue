<template>
  <div>
    <div class="d-flex flex-grow-1">
      <div v-if="!isMobile">
        <Nav></Nav>
      </div>
      <div
        v-if="isMobile"
        id="mobileMenu"
        :class="
          isOpenMenu
            ? 'mobile-menu__window--open'
            : 'mobile-menu__window--close'
        "
      >
        <Nav></Nav>
      </div>
      <div id="bg__black" class="bg__black"></div>
      <div class="d-flex flex-column flex-grow-1">
        <Topbar></Topbar>
        {{ isOpenMenu }}
        <v-main class="d-flex flex-column flex-grow-1">
          <slot></slot>
          <!--<Alert />-->
        </v-main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./script.js"></script>
