<template>
  <div :class="$props.isShow ? 'sheet--show' : 'sheet--hide'" class="sheet">
    <transition name="sheet-open">
      <div v-if="$props.isShow" class="sheet-body">
        <v-container class="sheet-body-container" fluid>
          <slot></slot>
        </v-container>
      </div>
    </transition>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
