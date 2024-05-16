<template>
  <div class="v-wrapper">
    <v-btn @click="$emit('createItem')" class="v-wrapper-btn">
      <div class="v-wrapper-btn-content">
        <div class="v-wrapper-btn-content-icon">
          <v-icon color="textGray">mdi-plus-thick</v-icon>
        </div>
        <span>Добавить карту</span>
      </div>
    </v-btn>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
