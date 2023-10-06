<template>
  <div class="docs-required">
    <div class="docs-required__container-layout">
      <a href="" target="_blank" class="docs-required__inner-image">
        <img :src="docs.path_doc" class="docs-required__image" />
      </a>
      <div class="docs-required">
        <span>Паспорт</span>
      </div>
    </div>
    <div class="docs-required__contols-panel">
      <div>
        <v-icon small>$IconAdd</v-icon>
      </div>
      <div>
        <v-icon small>$IconClose</v-icon>
      </div>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
