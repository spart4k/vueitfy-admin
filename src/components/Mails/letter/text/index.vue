<template>
  <div :class="['v-text', $route.query.compose === 'answer' && 'v-text__edit']">
    <div class="v-text-files d-flex">
      <div class="v-text-files_item">
        <img src="../../../../../src/assets/image/doc.png" alt="" />
      </div>
      <div class="v-text-files_item">
        <img src="../../../../../src/assets/image/pdf.png" alt="" />
      </div>
      <div class="v-text-files_item">
        <img src="../../../../../src/assets/image/xls.png" alt="" />
      </div>
    </div>
    <div class="v-text-title mb-1">{{ $props?.data?.subject }}</div>
    <div
      class="v-text-text mb-1 flex-grow-1"
      v-html="$props?.data?.message_text"
    ></div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
