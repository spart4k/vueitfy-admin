<template>
  <portal to="filter">
    <div class="v-popup" @click.prevent="$emit('close')">
      <div @click.stop class="v-popup-container">
        <slot></slot>
      </div>
    </div>
  </portal>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
