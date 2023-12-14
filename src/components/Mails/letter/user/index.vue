<template>
  <div
    :class="[
      'v-upper',
      ($route.query.filter === 'folder' || $route.query.filter === 'box') &&
        !$route.query.mail &&
        'v-upper__wide',
      'justify-space-between',
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
    <div class="v-upper-container" v-if="!$props.expanded">
      <div
        v-if="
          !$props?.data?.is_read &&
          $route.query.filter !== 'sent' &&
          $route.query.filter !== 'trash'
        "
        class="v-upper-container-viewed"
      ></div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
