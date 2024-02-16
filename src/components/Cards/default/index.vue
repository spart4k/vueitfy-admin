<template>
  <div class="v-cards-wrapper">
    <div class="v-cards-wrapper_panel"></div>
    <div class="v-cards-wrapper_container">
      <CardsItem v-for="item in cards" :data="item" :key="item.id" />
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
