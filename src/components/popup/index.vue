<template>
  <portal :to="options.portal">
    <div class="v-popup" @click.prevent="$emit('close')">
      <div
        @click.stop
        :style="{
          width: options.width,
          height: options.height,
          padding: options.padding,
        }"
        class="v-popup-container"
      >
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
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
