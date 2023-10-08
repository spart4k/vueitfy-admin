<template>
  <div class="v-files">
    <div
      :class="['v-files_item', index > 2 && 'v-files_item__hidden']"
      v-for="(item, index) in files"
      :key="index"
    >
      <template v-if="item.acceptableFormats">
        <img
          :src="require(`../../../../../src/assets/image/${item.format}.png`)"
          alt=""
        />
      </template>
      <div v-else class="v-files_item-unregistered">{{ item.format }}</div>
    </div>
    <template v-if="files.length > 3">
      <div v-if="!$props.expand" class="v-files_additional-item">
        +{{ files.length - 3 }}
      </div>
    </template>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
