<template>
  <portal to="filter">
    <div class="v-popup" @click.prevent="$emit('close')">
      <div @click.stop class="v-popup-container">
        <div class="v-popup-container-close">
          <v-icon @click="$emit('close')" color="disabled" small>
            $IconClose
          </v-icon>
        </div>
        <slot></slot>
      </div>
    </div>
  </portal>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
