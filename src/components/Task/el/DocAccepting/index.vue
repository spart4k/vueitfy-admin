<template>
  <div
    class="docs-required"
    :class="[
      (!isShowCansel || isShowRemove) && docs.valid === 1 && 'is-unconfirmed',
      (!isShowAdd || docs.valid === 2) && 'is-confirmed',
      true && `docs-required_${docName}`,
    ]"
  >
    <div class="docs-required__container-layout">
      <div
        @click="() => (isImgPopupOpen = true)"
        class="docs-required__inner-image"
      >
        <img
          :src="$root.env.VUE_APP_STORE + docs.path_doc"
          class="docs-required__image"
          width="50"
          height="50"
        />
      </div>
      <div class="docs-required__name-container">
        <a :href="$root.env.VUE_APP_STORE + docName"
          ><span>{{ docName }}</span></a
        >
        <span>{{ docs.personal_id }}</span>
      </div>
    </div>
    <div class="docs-required__contols-panel">
      <div v-if="isShowAdd && !hideActions" @click="clickAdd">
        <v-icon small>$IconGalka</v-icon>
      </div>
      <div v-if="isShowCansel && !hideActions" @click="clickDel">
        <v-icon small>$IconClose</v-icon>
      </div>
      <div
        v-if="(isShowRemove && !hideActions) || isShowRemove"
        @click="clickRemove"
      >
        <v-icon small>$IconDelete</v-icon>
      </div>
    </div>
    <FormPopupPhoto
      v-if="isImgPopupOpen"
      :src="$root.env.VUE_APP_STORE + docs.path_doc"
      @close="isImgPopupOpen = false"
    />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
