<template>
  <div class="v-card-container">
    <div class="v-card-container-upper">
      <v-chip color="success">Выдана</v-chip>
      <v-icon color="disabled">$IconEdit</v-icon>
    </div>
    <div class="v-card-container-down">
      <div class="v-card-container-down-left">
        <div class="v-card-container-down-left-info">
          <v-row v-for="(item, key, index) in cardInfo" :key="index">
            <span>{{ item }}</span>
            <span>{{ $props.data[key] }}</span>
          </v-row>
        </div>
        <div class="v-card-container-down-left-comment"></div>
      </div>
      <div class="v-card-container-down-right">
        <Card :data="$props.data" />
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
