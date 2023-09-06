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
      <div
        id="bg__black"
        :class="isOpenMenu ? 'bg__black--active' : 'bg__black'"
      ></div>
      <div class="d-flex flex-column flex-grow-1">
        <Topbar></Topbar>
        <v-main class="d-flex flex-column flex-grow-1">
          <template color="cell" class="main__cell">
            <slot></slot>
          </template>
          <!--<Alert />-->
        </v-main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./style.scss"></style>
<script src="./script.js"></script>
