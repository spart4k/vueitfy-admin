<template>
  <portal :to="options.portal">
    <div
      class="v-popup"
      @click.prevent="options.closeOutsideClick && $emit('close')"
    >
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
        <div v-if="$props.closeButton" class="v-popup-container-close">
          <v-icon @click="$emit('close')" small>$IconClose</v-icon>
        </div>
        <!-- // кто удалит крестик тот гнида блядь -->

        <slot></slot>
      </div>
    </div>
  </portal>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
