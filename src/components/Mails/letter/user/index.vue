<template>
  <div
    :class="[
      'v-upper',
      $route.query.filter === 'folder' && !$route.query.mail && 'v-upper__wide',
    ]"
  >
    <div class="v-upper-user d-flex">
      <v-img
        class="v-upper-user_image"
        src="https://cdn.vuetifyjs.com/images/john.png"
      ></v-img>
      <div class="v-upper-user-content">
        <div class="v-upper-user-content_name">Kira Zamorevich</div>
        <div class="v-upper-user-content_email">
          {{ $props?.data?.message_from }}
        </div>
      </div>
    </div>
    <div class="v-upper-container">
      <div class="v-upper-container-viewed"></div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
