<template>
  <div class="docs-required">
    <div class="docs-required__container-layout">
      <div
        @click="() => (isImgPopupOpen = true)"
        class="docs-required__inner-image"
      >
        <img :src="docs.path_doc" class="docs-required__image" />
      </div>
      <div class="docs-required__name-container">
        <span>{{ docName }}</span>
        <span>{{ docs.personal_id }}</span>
      </div>
    </div>
    <div class="docs-required__contols-panel">
      <div v-if="isShowAdd" @click="clickAdd">
        <v-icon small>$IconGalka</v-icon>
      </div>
      <div v-if="isShowCansel" @click="clickDel">
        <v-icon small>$IconClose</v-icon>
      </div>
    </div>
    <FormPopupPhoto v-if="isImgPopupOpen" @close="isImgPopupOpen = false" />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
