<template>
  <div class="v-cards-wrapper">
    <div class="v-cards-wrapper_panel"></div>
    <div
      v-if="loading"
      class="text-center d-flex align-center justify-center flex-grow-1"
    >
      <v-progress-circular color="primary" :size="80" indeterminate />
    </div>
    <div v-else class="v-cards-wrapper-container">
      <div class="v-cards-wrapper-container_list">
        <CardsNew @createItem="createItem" />
        <CardsItem
          v-for="item in options.data.rows"
          :data="item"
          :key="item.id"
          :id="item.index ?? item.id"
          class=""
          v-intersect.once="item.intersecting && getPage"
        />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
