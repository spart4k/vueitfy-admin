<template>
  <div class="v-cards-wrapper">
    <div class="v-cards-wrapper-panel">
      <div class="v-cards-wrapper-panel-left">
        <!-- view-grid -->
        <!-- view-list -->
        <v-btn disabled elevation="0" plain color="primary">
          <v-icon left> mdi-view-grid </v-icon>
          Сетка
        </v-btn>
        <v-btn @click="$emit('changeComp')" plain elevation="0" class="ml-3">
          <v-icon left> mdi-view-list </v-icon>
          Список
        </v-btn>
      </div>
      <div class="v-cards-wrapper-panel-right">
        <v-text-field
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          dense
          clearable
          v-model="searchField"
          @input="getItems"
        ></v-text-field>
      </div>
    </div>
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
          v-for="item in items"
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
