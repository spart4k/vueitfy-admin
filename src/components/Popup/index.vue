<template>
  <portal :to="options.portal">
    <div
      class="v-popup"
      @click.prevent="options.closeOutsideClick && $emit('close')"
    >
      <div class="v-popup-wrap">
        <div
          @click.stop
          class="v-popup-container"
          :style="{
            width: options.width,
            height: options.height,
            padding: options.padding,
            background: options.transparent && 'transparent',
          }"
        >
          <!-- <div v-if="false" class="v-popup-container-close">
            <v-icon @click="$emit('close')" small>$IconClose</v-icon>
          </div> -->

          <slot></slot>
        </div>
      </div>
    </div>
  </portal>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
